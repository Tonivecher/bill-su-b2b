import { createServerFn } from "@tanstack/react-start";
import { leadSchema } from "./lead-schema";
import { handleLead } from "./leads.server";

export const submitLead = createServerFn({ method: "POST" })
  .validator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => handleLead(data));
