import type { Access, FieldAccess, PayloadRequest, Where } from "payload";

export type Role = "owner" | "editor" | "staff";

const role = (req: PayloadRequest): Role | undefined => (req.user as { role?: Role } | null)?.role;

export const isOwner = ({ req }: { req: PayloadRequest }) => role(req) === "owner";
/** Owner and editor manage website content; staff only submit operational entries */
export const isContentTeam = ({ req }: { req: PayloadRequest }) => role(req) === "owner" || role(req) === "editor";
export const isLoggedIn = ({ req }: { req: PayloadRequest }) => Boolean(req.user);

/** Anonymous visitors only ever see published documents */
export const publishedOrTeam: Access = ({ req }) =>
  isContentTeam({ req }) ? true : { _status: { equals: "published" } };

/** Same for collections with trash: visitors never see soft-deleted items, even when asking the API for ?trash=true */
export const publishedLiveOrTeam: Access = ({ req }) =>
  isContentTeam({ req }) ? true : ({ and: [{ _status: { equals: "published" } }, { deletedAt: { exists: false } }] } as Where);

export const ownerField: FieldAccess = ({ req }) => role(req) === "owner";
