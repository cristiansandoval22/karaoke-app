import { defineField, defineType } from "sanity";

export const songType = defineType({
  name: "song",
  title: "Canciones",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "genres",
      title: "Géneros",
      type: "array",
      of: [{ type: "reference", to: [{ type: "genre" }] }],
    }),
    defineField({
      name: "language",
      title: "Idioma",
      type: "reference",
      to: [{ type: "language" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "artists",
      title: "Artistas",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "artist" }],
        },
      ],
      validation: (Rule) =>
        Rule.min(1).error("Debes agregar al menos un artista"),
    }),
  ],
});
