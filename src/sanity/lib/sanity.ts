import { createClient } from "@sanity/client";

export const sanity = createClient({
  projectId: '48wq30y4', // en tu .env
  dataset: 'production',      // en tu .env
  apiVersion: "2025-01-01",                     // usa fecha reciente
  useCdn: true,                                 // true para producción, false si quieres datos frescos siempre
});
