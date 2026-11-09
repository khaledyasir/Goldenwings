import config from "@payload-config";
import { getPayload } from "payload";
import { seed } from "./run";

const payload = await getPayload({ config });
await seed(payload);
process.exit(0);
