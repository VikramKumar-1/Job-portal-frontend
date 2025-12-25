/*import { createClient } from "@sanity/client";
//import imageUrlBuilder from "@sanity/image-url";
import { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: true, // fast + safe for public data
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);*/

import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: true,
});

// ✅ FIX IS HERE
const builder = createImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

