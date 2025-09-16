// ./src/sanity/schemaTypes/language.ts
import { defineField, defineType } from "sanity";

export const languageType = defineType({
  name: "language",
  title: "Idiomas",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
      description: "Ejemplo: Español, Inglés",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "code",
      title: "Código",
      type: "string",
      description: "Código ISO (es o en)",
      options: {
        list: [
          { title: "Español", value: "es" },
          { title: "Inglés", value: "en" },
        ],
        layout: "radio", // Para que sea más rápido elegir
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
