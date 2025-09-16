import { useState, useEffect } from "react";
import "@/assets/OrderSummary.css";

export default function OrderSummary() {
  const [cart, setCart] = useState([]);
  const [tableNumber, setTableNumber] = useState("");
  const [observations, setObservations] = useState("");

  // ✅ Hidratar carrito desde localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("karaokeCart") || "[]");
    setCart(saved);
  }, []);

  // ✅ Quitar canción del carrito
  const handleRemove = (id) => {
    const updated = cart.filter((song) => song._id !== id);
    setCart(updated);
    localStorage.setItem("karaokeCart", JSON.stringify(updated));
  };

  // ✅ Enviar pedido por WhatsApp
  const handleSubmit = () => {
    if (!tableNumber || cart.length === 0) {
      alert("Debes seleccionar una mesa y al menos 1 canción.");
      return;
    }

    const message = ` *PEDIDO DE KARAOKE*

 *MESA:* ${tableNumber}

 *CANCIONES:*
${cart.map((song, i) => `  ${i + 1}. *${song.title}* — ${song.artists.join(", ")}`).join("\n")}

 *OBSERVACIONES:* ${observations || "Ninguna"}
`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/51944584827?text=${encoded}`; // 👈 Reemplaza con tu número
    window.open(whatsappUrl, "_blank");

    // ✅ Limpiar carrito después de enviar
    localStorage.removeItem("karaokeCart");
    setCart([]);
  };

  return (
    <div className="order-summary">
      <header
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <button onClick={() => window.history.back()} className="btn-outline">
          ← Volver
        </button>
        <h1>Resumen del Pedido</h1>
      </header>

      {/* Lista de canciones */}
      <div className="card">
        <h2>Canciones Seleccionadas ({cart.length}/2)</h2>
        <div className="cart-list">
          {cart.length === 0 && <p>No has seleccionado ninguna canción.</p>}
          {cart.map((song, index) => (
            <div key={song._id} className="cart-item">
              <div>
                <p className="song-title">
                  {index + 1}. {song.title}
                </p>
                <p className="song-artist">{song.artists.join(", ")}</p>
              </div>
              <button
                onClick={() => handleRemove(song._id)}
                className="btn-danger"
              >
                Quitar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Información de pedido */}
      <div className="card">
        <h2>Información del Pedido</h2>

        <label>Mesa *</label>
        <select
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
        >
          <option value="">Selecciona tu mesa</option>
          {Array.from({ length: 8 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>{`Mesa ${num}`}</option>
          ))}
        </select>

        <label>Observaciones (opcional)</label>
        <textarea
          placeholder="Ej: Dedicada a María, Para celebrar cumpleaños..."
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={!tableNumber || cart.length === 0}
          className="btn-primary"
        >
          Enviar Pedido por WhatsApp
        </button>
      </div>
    </div>
  );
}
