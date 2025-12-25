import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "k0tqndnf",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});
