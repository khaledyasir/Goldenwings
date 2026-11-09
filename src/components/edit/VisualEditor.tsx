"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * Click-to-edit layer for the real site. Mounted by the site layout only while an owner/editor is in edit mode.
 * Server components mark elements with data-cms="<global>|<path>|<text|image>" and data-cms-doc="<collection>/<id>".
 */

type Lang = "ar" | "en";
type Kind = "text" | "image";
type Edit = { slug: string; path: string; kind: Kind; value: unknown };
type Media = { id: number | string; url: string; alt?: string; filename?: string; thumbnailURL?: string };
type Sel = { id: number; el: HTMLElement } & (
  | { type: "field"; slug: string; path: string; kind: Kind }
  | { type: "doc"; doc: string }
);
type Doc = Record<string, unknown>;

const ROOT = "data-gw-editor";
const MARKERS = "[data-cms],[data-cms-doc]";
const READ_ONLY = ["id", "createdAt", "updatedAt", "globalType", "_status"];
const MIME = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];
const PAGES: [string, string, string][] = [
  ["/", "الرئيسية", "Home"],
  ["/employee-transport", "نقل الموظفين", "Employee transport"],
  ["/tourism-transport", "النقل السياحي", "Tourism transport"],
  ["/international-transport", "النقل الدولي", "International transport"],
  ["/airport-transport", "نقل المطار", "Airport transport"],
  ["/fleet", "الأسطول", "Fleet"],
  ["/trips", "الرحلات", "Trips"],
  ["/partners", "الشركاء", "Partners"],
  ["/testimonials", "آراء العملاء", "Testimonials"],
  ["/booking", "الحجز", "Booking"],
];

const S = {
  ar: {
    changes: "تغييرات غير محفوظة", save: "حفظ كمسودة", publish: "نشر", discard: "تجاهل غير المحفوظ",
    revert: "إرجاع المسودات للمنشور", preview: "معاينة", edit: "تحرير", admin: "لوحة التحكم", exit: "خروج",
    page: "الصفحة", apply: "تطبيق", close: "إغلاق", text: "تعديل النص", image: "تغيير الصورة", doc: "عنصر من القائمة",
    brackets: "النص بين [أقواس] يظهر بلون مميز.", loading: "جارٍ التحميل...", search: "بحث في الوسائط بالوصف",
    none: "لا توجد صور", upload: "رفع صورة جديدة", alt: "الوصف البديل للصورة (مطلوب)", uploadBtn: "رفع واختيار",
    badFile: "الملف يجب أن يكون صورة (jpeg, png, webp, avif, gif) وأقل من 10MB", needAlt: "الوصف البديل مطلوب",
    editAdmin: "تعديل في لوحة التحكم", docHint: "هذا العنصر يُحرَّر من لوحة التحكم (يفتح في تبويب جديد).",
    confirmPublish: "نشر كل تغييرات الصفحة للزوار؟", confirmRevert: "إرجاع كل مسودات هذه الصفحة إلى النسخة المنشورة؟",
    confirmLeave: "لديك تغييرات غير محفوظة. هل تريد المتابعة وفقدانها؟", saved: "تم الحفظ", published: "تم النشر",
    reverted: "تم الإرجاع", pending: "بانتظار الحفظ", current: "الحالية",
  },
  en: {
    changes: "unsaved changes", save: "Save draft", publish: "Publish", discard: "Discard unsaved",
    revert: "Revert drafts to published", preview: "Preview", edit: "Edit", admin: "Admin", exit: "Exit",
    page: "Page", apply: "Apply", close: "Close", text: "Edit text", image: "Change image", doc: "List item",
    brackets: "Text in [brackets] is highlighted.", loading: "Loading...", search: "Search media by alt text",
    none: "No images", upload: "Upload a new image", alt: "Alt text (required)", uploadBtn: "Upload and use",
    badFile: "File must be an image (jpeg, png, webp, avif, gif) under 10MB", needAlt: "Alt text is required",
    editAdmin: "Edit in admin", docHint: "This item is edited in the admin (opens in a new tab).",
    confirmPublish: "Publish all changes on this page to visitors?", confirmRevert: "Revert all drafts on this page to the published version?",
    confirmLeave: "You have unsaved changes. Leave and lose them?", saved: "Saved", published: "Published",
    reverted: "Reverted", pending: "Pending save", current: "Current",
  },
};

const btn = "rounded-md px-3 py-2 text-sm font-semibold disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-gold";
const btnGold = `${btn} bg-gold text-navy hover:bg-gold-light`;
const btnGhost = `${btn} bg-white/10 text-white hover:bg-white/20`;
const field = "w-full rounded-md border border-navy/30 bg-white p-2 text-sm text-navy";

// ---------------------------------------------------------------- helpers

async function api<T = Doc>(url: string, init?: RequestInit): Promise<T> {
  const headers = typeof init?.body === "string" ? { "Content-Type": "application/json" } : undefined;
  const res = await fetch(url, { credentials: "include", ...init, headers });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const e = data?.errors?.[0];
    const inner = e?.data?.errors?.[0];
    throw new Error(inner ? `${e.message}: ${inner.path} ${inner.message}` : (e?.message ?? `${res.status} ${res.statusText}`));
  }
  return data as T;
}

const getIn = (o: unknown, parts: string[]): unknown =>
  parts.reduce<unknown>((acc, k) => (acc == null ? undefined : (acc as Record<string, unknown>)[k]), o);

/** Immutable set that understands numeric array indexes */
function setIn(o: unknown, [k, ...rest]: string[], v: unknown): unknown {
  const isArr = Array.isArray(o) || (o == null && /^\d+$/.test(k));
  const base = (isArr ? [...((o as unknown[]) ?? [])] : { ...((o as Doc) ?? {}) }) as Record<string, unknown>;
  base[k] = rest.length ? setIn(base[k], rest, v) : v;
  return base;
}

function withEdits(doc: Doc, edits: Edit[]): Doc {
  const next = edits.reduce<unknown>((d, e) => setIn(d, e.path.split("."), e.value), doc) as Doc;
  return Object.fromEntries(Object.entries(next).filter(([k]) => !READ_ONLY.includes(k)));
}

/** Shows new text without touching React-owned nodes: children are hidden, a ghost span is added, `undo` reverts it all */
function previewText(el: HTMLElement, text: string): () => void {
  const saved: [Node, string | null][] = [];
  el.childNodes.forEach((n) => {
    if (n.nodeType === 3) {
      saved.push([n, n.nodeValue]);
      n.nodeValue = "";
    } else if (n instanceof HTMLElement) {
      saved.push([n, n.style.display]);
      n.style.display = "none";
    }
  });
  const ghost = document.createElement("span");
  ghost.textContent = text.replace(/[[\]]/g, "");
  el.prepend(ghost);
  return () => {
    ghost.remove();
    saved.forEach(([n, v]) => (n instanceof HTMLElement ? (n.style.display = v ?? "") : (n.nodeValue = v)));
  };
}

function previewImage(el: HTMLElement, url: string): () => void {
  const img = el instanceof HTMLImageElement ? el : el.querySelector("img");
  if (!img) return () => {};
  const [src, srcset] = [img.getAttribute("src"), img.getAttribute("srcset")];
  img.removeAttribute("srcset");
  img.src = url;
  return () => {
    if (src != null) img.setAttribute("src", src);
    if (srcset != null) img.setAttribute("srcset", srcset);
  };
}

// ---------------------------------------------------------------- panels

type PanelProps = { lang: Lang; t: (typeof S)["ar"]; fail: (e: unknown) => void; onClose: () => void };

function PanelShell({ title, t, lang, onClose, children }: { title: string; children: React.ReactNode } & Omit<PanelProps, "fail">) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    ref.current?.querySelector<HTMLElement>("textarea,input,button[data-first]")?.focus();
  }, []);
  return (
    <aside
      ref={ref}
      role="dialog"
      aria-label={title}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="fixed inset-y-0 end-0 z-[2147483000] w-full overflow-y-auto bg-white p-4 pb-44 text-navy shadow-2xl sm:w-96"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-lg font-bold">{title}</h2>
        <button type="button" onClick={onClose} aria-label={t.close} className={`${btn} bg-navy text-white`}>
          ✕
        </button>
      </div>
      {children}
    </aside>
  );
}

function TextPanel({ sel, pendingValue, onApply, ...p }: PanelProps & { sel: Sel & { type: "field" }; pendingValue?: unknown; onApply: (v: string) => void }) {
  const [val, setVal] = useState(typeof pendingValue === "string" ? pendingValue : "");
  const [loading, setLoading] = useState(pendingValue === undefined);
  useEffect(() => {
    if (pendingValue !== undefined) return;
    // Ignore a response that lands after this effect was cleaned up, or it would overwrite what the user typed
    let live = true;
    api(`/api/globals/${sel.slug}?draft=true&locale=${p.lang}&depth=0`)
      .then((d) => live && setVal(String(getIn(d, sel.path.split(".")) ?? "")))
      .catch((e) => live && p.fail(e))
      .finally(() => live && setLoading(false));
    return () => {
      live = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <PanelShell title={p.t.text} {...p}>
      <textarea
        value={val}
        onChange={(e) => setVal(e.target.value)}
        disabled={loading}
        rows={6}
        aria-label={p.t.text}
        className={field}
      />
      {/\[.*\]/.test(val) && <p className="mt-2 text-xs text-navy/70">{p.t.brackets}</p>}
      {loading && <p className="mt-2 text-xs">{p.t.loading}</p>}
      <button type="button" disabled={loading} onClick={() => onApply(val)} className={`${btnGold} mt-3`}>
        {p.t.apply}
      </button>
    </PanelShell>
  );
}

function ImagePanel({ sel, onChoose, ...p }: PanelProps & { sel: Sel & { type: "field" }; onChoose: (m: Media) => void }) {
  const [q, setQ] = useState("");
  const [items, setItems] = useState<Media[] | null>(null);
  const [current, setCurrent] = useState<unknown>(null);
  const [alt, setAlt] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api(`/api/globals/${sel.slug}?draft=true&locale=${p.lang}&depth=0`)
      .then((d) => setCurrent(getIn(d, sel.path.split("."))))
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const t = setTimeout(() => {
      const where = q.trim() ? `&where[alt][like]=${encodeURIComponent(q.trim())}` : "";
      api<{ docs: Media[] }>(`/api/media?limit=48&sort=-createdAt&depth=0${where}`)
        .then((r) => setItems(r.docs))
        .catch(p.fail);
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  async function upload() {
    if (!file || !MIME.includes(file.type) || file.size > 10 * 1024 * 1024) return p.fail(new Error(p.t.badFile));
    if (!alt.trim()) return p.fail(new Error(p.t.needAlt));
    const body = new FormData();
    body.append("file", file);
    body.append("_payload", JSON.stringify({ alt: alt.trim() }));
    setBusy(true);
    try {
      onChoose((await api<{ doc: Media }>("/api/media", { method: "POST", body })).doc);
    } catch (e) {
      p.fail(e);
    } finally {
      setBusy(false);
    }
  }

  return (
    <PanelShell title={p.t.image} {...p}>
      <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={p.t.search} aria-label={p.t.search} className={field} />
      <ul className="mt-3 grid grid-cols-3 gap-2">
        {items?.map((m) => (
          <li key={m.id}>
            <button
              type="button"
              data-first
              onClick={() => onChoose(m)}
              title={m.alt || m.filename}
              className={`block aspect-square w-full overflow-hidden rounded-md border-2 ${m.id === current ? "border-gold" : "border-transparent"} hover:border-gold-dark`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.thumbnailURL || m.url} alt={m.alt ?? ""} className="h-full w-full object-cover" />
            </button>
            {m.id === current && <span className="text-[10px] font-semibold">{p.t.current}</span>}
          </li>
        ))}
      </ul>
      {items?.length === 0 && <p className="mt-2 text-sm">{p.t.none}</p>}
      {!items && <p className="mt-2 text-sm">{p.t.loading}</p>}
      <fieldset className="mt-5 space-y-2 border-t border-navy/20 pt-3">
        <legend className="text-sm font-bold">{p.t.upload}</legend>
        <input type="file" accept={MIME.join(",")} onChange={(e) => setFile(e.target.files?.[0] ?? null)} aria-label={p.t.upload} className="block w-full text-sm" />
        <input value={alt} onChange={(e) => setAlt(e.target.value)} placeholder={p.t.alt} aria-label={p.t.alt} required className={field} />
        <button type="button" disabled={busy || !file} onClick={upload} className={btnGold}>
          {p.t.uploadBtn}
        </button>
      </fieldset>
    </PanelShell>
  );
}

function DocPanel({ sel, ...p }: PanelProps & { sel: Sel & { type: "doc" } }) {
  return (
    <PanelShell title={p.t.doc} {...p}>
      <p className="mb-3 text-sm">{p.t.docHint}</p>
      <button type="button" data-first onClick={() => window.open(`/admin/collections/${sel.doc}`, "_blank", "noopener")} className={btnGold}>
        {p.t.editAdmin}
      </button>
    </PanelShell>
  );
}

// ---------------------------------------------------------------- editor

export default function VisualEditor({ lang }: { lang: Lang }) {
  const t = S[lang];
  const router = useRouter();
  const here = usePathname();
  const [pending, setPending] = useState<Record<string, Edit>>({});
  const [sel, setSel] = useState<Sel | null>(null);
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState(false);
  const [toast, setToast] = useState<{ msg: string; err: boolean } | null>(null);
  const undo = useRef(new Map<string, () => void>());
  const skipUnload = useRef(false);
  const count = Object.keys(pending).length;

  const fail = useCallback((e: unknown) => setToast({ msg: e instanceof Error ? e.message : String(e), err: true }), []);
  const done = (msg: string) => setToast({ msg, err: false });

  useEffect(() => {
    if (!toast || toast.err) return;
    const id = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(id);
  }, [toast]);

  // Click-to-edit: capture phase so links and buttons inside a marked element do nothing
  useEffect(() => {
    if (preview) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target || target.closest(`[${ROOT}]`)) return;
      // Layered layouts (hero text over a photo) put an unmarked layer on top: fall back to whatever marked
      // element sits under the pointer, so the photo stays selectable
      const el =
        target.closest<HTMLElement>(MARKERS) ??
        document.elementsFromPoint(e.clientX, e.clientY).find((n): n is HTMLElement => n instanceof HTMLElement && n.matches(MARKERS)) ??
        null;
      if (!el) return;
      e.preventDefault();
      e.stopPropagation();
      const id = Date.now();
      if (el.dataset.cmsDoc) return setSel({ id, el, type: "doc", doc: el.dataset.cmsDoc });
      const [slug, path, kind] = (el.dataset.cms ?? "").split("|");
      setSel({ id, el, type: "field", slug, path, kind: kind === "image" ? "image" : "text" });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [preview]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSel(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!sel) return;
    sel.el.setAttribute("data-cms-sel", "");
    return () => sel.el.removeAttribute("data-cms-sel");
  }, [sel]);

  useEffect(() => {
    if (!count) return;
    const onUnload = (e: BeforeUnloadEvent) => {
      if (!skipUnload.current) e.preventDefault();
    };
    window.addEventListener("beforeunload", onUnload);
    return () => window.removeEventListener("beforeunload", onUnload);
  }, [count]);

  function addEdit(edit: Edit, preview: () => () => void) {
    if (sel?.type !== "field") return;
    const key = `${edit.slug}|${edit.path}`;
    undo.current.get(key)?.();
    const revert = preview();
    sel.el.setAttribute("data-cms-pending", "");
    undo.current.set(key, () => {
      revert();
      sel.el.removeAttribute("data-cms-pending");
    });
    setPending((p) => ({ ...p, [key]: edit }));
    setSel(null);
  }

  function clearVisual() {
    undo.current.forEach((f) => f());
    undo.current.clear();
    setPending({});
  }

  /** Runs a request flow with buttons disabled and API errors shown in the toast */
  async function run(flow: () => Promise<string | void>) {
    setBusy(true);
    try {
      const msg = await flow();
      if (msg) done(msg);
    } catch (e) {
      fail(e);
    } finally {
      setBusy(false);
    }
  }

  const q = (draft: boolean) => `depth=0&locale=${lang}&fallback-locale=none${draft ? "&draft=true" : ""}`;
  const postDoc = (slug: string, doc: Doc, status: "draft" | "published") =>
    api(`/api/globals/${slug}?depth=0&locale=${lang}${status === "draft" ? "&draft=true" : ""}`, {
      method: "POST",
      body: JSON.stringify({ ...doc, _status: status }),
    });
  const pageSlugs = () =>
    Array.from(new Set(Array.from(document.querySelectorAll<HTMLElement>("[data-cms]")).map((e) => e.dataset.cms!.split("|")[0])));

  /** Applies pending edits on top of each draft; `publish` also publishes drafts of every global on the page */
  async function persist(status: "draft" | "published") {
    const edits = Object.values(pending);
    const slugs = status === "published" ? Array.from(new Set([...edits.map((e) => e.slug), ...pageSlugs()])) : Array.from(new Set(edits.map((e) => e.slug)));
    for (const slug of slugs) {
      const doc = await api(`/api/globals/${slug}?${q(true)}`);
      await postDoc(slug, withEdits(doc, edits.filter((e) => e.slug === slug)), status);
    }
    clearVisual();
    setSel(null);
    router.refresh();
  }

  const saveDraft = () => run(async () => (await persist("draft"), t.saved));
  const publish = () => confirm(t.confirmPublish) && run(async () => (await persist("published"), t.published));
  const revert = () =>
    confirm(t.confirmRevert) &&
    run(async () => {
      for (const slug of pageSlugs()) await postDoc(slug, withEdits(await api(`/api/globals/${slug}?${q(false)}`), []), "published");
      clearVisual();
      setSel(null);
      router.refresh();
      return t.reverted;
    });

  function leave(url: string) {
    if (count && !confirm(t.confirmLeave)) return false;
    skipUnload.current = true;
    window.location.assign(url);
    return true;
  }
  const panel: PanelProps = { lang, t, fail, onClose: () => setSel(null) };
  const hasPending = (s: Sel & { type: "field" }) => pending[`${s.slug}|${s.path}`]?.value;

  return (
    <div {...{ [ROOT]: "" }} dir={lang === "ar" ? "rtl" : "ltr"}>
      {!preview && (
        <style>{`
          [data-cms],[data-cms-doc]{cursor:pointer}
          [data-cms]:hover,[data-cms-doc]:hover{outline:2px dashed rgba(197,160,89,.9);outline-offset:3px}
          [data-cms-pending]{outline:2px solid #16a34a !important;outline-offset:3px}
          [data-cms-sel]{outline:3px solid #c5a059 !important;outline-offset:3px}
        `}</style>
      )}

      {toast && (
        <div
          role={toast.err ? "alert" : "status"}
          className={`fixed top-4 left-1/2 z-[2147483001] flex max-w-[90vw] -translate-x-1/2 items-center gap-3 rounded-md px-4 py-2 text-sm font-semibold text-white shadow-lg ${toast.err ? "bg-red-700" : "bg-green-700"}`}
        >
          <span>{toast.msg}</span>
          <button type="button" onClick={() => setToast(null)} aria-label={t.close}>
            ✕
          </button>
        </div>
      )}

      {sel?.type === "field" && sel.kind === "text" && (
        <TextPanel key={sel.id} sel={sel} pendingValue={hasPending(sel)} {...panel} onApply={(value) => addEdit({ slug: sel.slug, path: sel.path, kind: "text", value }, () => previewText(sel.el, value))} />
      )}
      {sel?.type === "field" && sel.kind === "image" && (
        <ImagePanel key={sel.id} sel={sel} {...panel} onChoose={(m) => addEdit({ slug: sel.slug, path: sel.path, kind: "image", value: m.id }, () => previewImage(sel.el, m.url))} />
      )}
      {sel?.type === "doc" && <DocPanel key={sel.id} sel={sel} {...panel} />}

      <div
        role="toolbar"
        aria-label="Visual editor"
        className="fixed bottom-16 left-1/2 z-[2147483001] flex w-[calc(100%-1rem)] max-w-5xl -translate-x-1/2 flex-wrap items-center gap-2 rounded-xl bg-navy p-2 text-white shadow-2xl ring-1 ring-gold/50 md:bottom-4"
      >
        <span aria-live="polite" className="px-2 text-sm font-bold text-gold">
          {count} {t.changes}
        </span>
        <button type="button" disabled={busy || !count} onClick={saveDraft} className={btnGold}>
          {t.save}
        </button>
        <button type="button" disabled={busy} onClick={publish} className={btnGold}>
          {t.publish}
        </button>
        <button type="button" disabled={busy || !count} onClick={() => confirm(t.confirmLeave) && location.reload()} className={btnGhost}>
          {t.discard}
        </button>
        <button type="button" disabled={busy} onClick={revert} className={btnGhost}>
          {t.revert}
        </button>
        <button type="button" aria-pressed={preview} onClick={() => (setPreview((v) => !v), setSel(null))} className={btnGhost}>
          {preview ? t.edit : t.preview}
        </button>
        <select
          aria-label={t.page}
          value={PAGES.some(([p]) => p === here) ? here : ""}
          disabled={busy}
          onChange={(e) => !leave(e.target.value) && (e.target.value = here)}
          className={`${btn} bg-white text-navy`}
        >
          {!PAGES.some(([p]) => p === here) && <option value="">{here}</option>}
          {PAGES.map(([p, ar, en]) => (
            <option key={p} value={p}>
              {lang === "ar" ? ar : en}
            </option>
          ))}
        </select>
        <a href="/admin" target="_blank" rel="noopener" className={`${btnGhost} ms-auto`}>
          {t.admin}
        </a>
        <button type="button" onClick={() => leave(`/api/edit-mode?off=1&path=${encodeURIComponent(here + location.search)}`)} className={btnGhost}>
          {t.exit}
        </button>
      </div>
    </div>
  );
}
