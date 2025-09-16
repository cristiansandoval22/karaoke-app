// ./src/sanity/schemaTypes/index.ts
import type { SchemaTypeDefinition } from "sanity";
import { artistType } from "./artist";
import { genreType } from "./genre";
import { languageType } from "./language";
import { songType } from "./song";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [artistType, genreType, languageType, songType],
};