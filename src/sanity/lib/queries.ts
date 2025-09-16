import { sanity } from "./sanity";

// 🟢 Obtener todas las canciones
export async function getSongs() {
  return await sanity.fetch(`
    *[_type == "song"]{
      _id,
      title,
      language->{
    name, // 👈 aquí traes el nombre del idioma (por ejemplo Español, Inglés)
  },
      artists[]->{
        _id,
        name,
        image
      },
      "genres": genres[]-> { name }, // ✅ importante
    }
  `);
}

// 🟢 Obtener todos los artistas
export async function getArtists() {
  return await sanity.fetch(`
    *[_type == "artist"]{
      _id,
      name,
      slug,
      image,
      bio
    }
  `);
}

// 🟢 Obtener todos los géneros
export async function getGenres() {
  return await sanity.fetch(`
    *[_type == "genre"]{
      _id,
      name,
      description
    }
  `);
}

// 🟢 Obtener todos los idiomas
export async function getLanguages() {
  return await sanity.fetch(`
    *[_type == "language"]{
      _id,
      name,
      code
    }
  `);
}
