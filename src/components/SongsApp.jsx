import { useState, useEffect, useMemo } from "react";
import SearchBar from "./SearchBar.jsx";
import "@/assets/SearchBar.css";

export default function SongsApp({
  initialSongs = [],
  genres = [],
  languages = [],
  artists = [],
}) {
  const [filters, setFilters] = useState({
    query: "",
    genre: "",
    language: "",
    artist: "",
  });
  const [selectedSongs, setSelectedSongs] = useState([]);

  // ✅ Hidratar el carrito desde localStorage al cargar la página
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("karaokeCart") || "[]");
    setSelectedSongs(saved);
  }, []);

  // ✅ Función para agregar canciones con límite de 2
  const handleAddSong = (song) => {
    const saved = JSON.parse(localStorage.getItem("karaokeCart") || "[]");

    if (saved.length >= 2) {
      alert("Solo puedes agregar 2 canciones por pedido 🎤");
      return;
    }

    if (saved.find((s) => s._id === song._id)) {
      alert("Ya agregaste esta canción 🎶");
      return;
    }

    const songData = {
      _id: song._id,
      title: song.title,
      artists: song.artists.map((a) => a.name),
      genres: (song.genres ?? []).map((g) => g.name), // ✅ Array de géneros
    };

    const updated = [...saved, songData];
    localStorage.setItem("karaokeCart", JSON.stringify(updated));
    setSelectedSongs(updated);
  };

  // ✅ Filtro de canciones
  const filtered = useMemo(() => {
    const q = (filters.query || "").toLowerCase().trim();
    return initialSongs.filter((song) => {
      const title =
        typeof song.title === "string"
          ? song.title
          : (song.title?.es ?? song.title?.en ?? "");
      const matchTitle = !q || title.toLowerCase().includes(q);

      const songLang = (song.language?.name ?? "").toString();
      const songArtists = (song.artists ?? [])
        .map((a) => a.name.toLowerCase())
        .join(" ");

      const matchGenre =
        !filters.genre ||
        (Array.isArray(song.genres) &&
          song.genres.some((g) => g.name === filters.genre));

      const matchLang = !filters.language || songLang === filters.language;
      const matchArtist =
        !filters.artist || songArtists.includes(filters.artist.toLowerCase());

      return matchTitle && matchGenre && matchLang && matchArtist;
    });
  }, [initialSongs, filters]);

  return (
    <div className="songs-app">
      <header style={{ maxWidth: 900, margin: "0 auto 1rem" }}>
        <img
          src="http://www.vox-records.com/ZKARAOKE/ZETGLDESPA_archivos/image002.png"
          alt="logo"
        />
        {/* 🔥 Botón del carrito con contador persistente */}
        <a className="btn-add" href="/resumen-pedido">
          Canciones seleccionadas ({selectedSongs.length})
        </a>
      </header>

      <SearchBar
        genres={genres}
        languages={languages}
        onFilterChange={(next) => setFilters((s) => ({ ...s, ...next }))}
      />

      <div className="songs-list">
        {filtered.map((song) => {
          const title =
            typeof song.title === "string"
              ? song.title
              : (song.title?.es ?? song.title?.en ?? "");
          return (
            <article className="song-card">
              <div className="song-card-header">
                <h3 className="song-title">{song.title}</h3>
                <p className="song-artists">
                  <span>🎤</span> {song.artists.map((a) => a.name).join(", ")}
                </p>
              </div>

              <div className="song-card-body">
                <p className="song-genres">
                  <span>🎶</span>{" "}
                  {(song.genres ?? []).length > 0
                    ? song.genres.map((g) => g.name).join(", ")
                    : "Sin géneros"}
                </p>
              </div>

              <div className="song-card-footer">
                <button className="btn-add" onClick={() => handleAddSong(song)}>
                <span className="ci--list-add" />
                Agregar
                </button>
              </div>
            </article>
          );
        })}
        {filtered.length === 0 && (
          <p style={{ textAlign: "center", width: "100%" }}>
            No hay resultados
          </p>
        )}
      </div>
    </div>
  );
}
