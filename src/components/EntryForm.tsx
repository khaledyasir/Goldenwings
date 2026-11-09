"use client";

import { startTransition, useActionState, useEffect, useRef, type ReactNode } from "react";
import { submitEntry, type EntryState } from "@/app/(site)/entries/actions";
import type { EntriesPage } from "@/payload-types";

const FIELD =
  "w-full rounded-md bg-gray-200/70 px-4 py-3.5 text-navy outline-none ring-gold transition placeholder:text-navy/50 focus:bg-white focus:ring-2 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-500";

function Field({ label, children, wide }: { label?: string | null; children: ReactNode; wide?: boolean }) {
  return (
    <label className={`block ${wide ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-sm font-semibold text-navy/70">{label}</span>
      {children}
    </label>
  );
}

type Lists = "movement" | "type" | "client" | "trip" | "bus" | "driver" | "authorization";
type Props = {
  options: Record<Lists, { id: number; label: string }[]>;
  copy: Pick<EntriesPage, "labels" | "success" | "error">;
};

export default function EntryForm({ options, copy }: Props) {
  const [state, action, pending] = useActionState<EntryState, FormData>(submitEntry, { status: "idle" });
  const form = useRef<HTMLFormElement>(null);
  const L = copy.labels ?? {};
  const bad = (k: string) => state.status === "error" && state.fields.includes(k as never);
  // A saved entry clears the form for the next one
  useEffect(() => {
    if (state.status === "ok") form.current?.reset();
  }, [state]);

  const select = (key: Lists) => (
    <Field key={key} label={L[key]}>
      <select name={key} required defaultValue="" aria-invalid={bad(key)} className={FIELD}>
        <option value="" disabled>
          {L.select}
        </option>
        {options[key].map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  );

  return (
    <form
      ref={form}
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        startTransition(() => action(data));
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {(["movement", "type", "client", "trip"] as const).map(select)}
        <Field label={L.date}>
          <input name="date" required type="date" aria-invalid={bad("date")} className={FIELD} />
        </Field>
        {(["bus", "driver", "authorization"] as const).map(select)}
        <Field label={L.statement} wide>
          <textarea name="statement" rows={4} maxLength={2000} className={FIELD} />
        </Field>
      </div>

      {state.status !== "idle" && (
        <p role={state.status === "ok" ? "status" : "alert"} className={`mt-4 text-sm font-semibold ${state.status === "ok" ? "text-green-700" : "text-red-600"}`}>
          {state.status === "ok" ? copy.success : copy.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 w-full rounded-md bg-gold-dark px-10 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-gold disabled:opacity-60 sm:w-56"
      >
        {L.submit}
      </button>
    </form>
  );
}
