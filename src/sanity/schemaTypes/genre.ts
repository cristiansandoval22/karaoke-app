// ./src/sanity/schemaTypes/genre.ts
import { defineField, defineType } from "sanity";

export const genreType = defineType({
  name: "genre",
  title: "Géneros",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      description: "Descripción del género",
    }),
  ],
});
