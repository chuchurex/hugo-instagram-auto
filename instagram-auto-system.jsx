import { useState, useEffect, useCallback, useRef } from "react";

const FONTS_LINK = "https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap";

// ─── Mock Data ───
const MOCK_PRODUCTS = [
  { id: 1, name: "Camiseta Oversize Premium", sku: "CAM-001", price: 29990, stock: 145, category: "Camisetas", image: null, color: "#2d2d2d" },
  { id: 2, name: "Hoodie Essential Black", sku: "HOO-002", price: 49990, stock: 89, category: "Hoodies", image: null, color: "#1a1a2e" },
  { id: 3, name: "Jogger Slim Fit", sku: "JOG-003", price: 39990, stock: 210, category: "Pantalones", image: null, color: "#16213e" },
  { id: 4, name: "Gorra Snapback Logo", sku: "GOR-004", price: 19990, stock: 320, category: "Accesorios", image: null, color: "#0f3460" },
  { id: 5, name: "Polera Manga Larga", sku: "POL-005", price: 34990, stock: 67, category: "Camisetas", image: null, color: "#533483" },
  { id: 6, name: "Short Deportivo", sku: "SHO-006", price: 24990, stock: 178, category: "Pantalones", image: null, color: "#e94560" },
  { id: 7, name: "Calcetines Pack x3", sku: "CAL-007", price: 12990, stock: 450, category: "Accesorios", image: null, color: "#0a1128" },
  { id: 8, name: "Chaleco Puffer", sku: "CHA-008", price: 69990, stock: 34, category: "Outerwear", image: null, color: "#1a1a2e" },
];

const ECOMMERCE_PLATFORMS = [
  { id: "shopify", name: "Shopify", icon: "🛍️" },
  { id: "woocommerce", name: "WooCommerce", icon: "🔌" },
  { id: "tiendanube", name: "Tienda Nube", icon: "☁️" },
  { id: "magento", name: "Magento", icon: "🧲" },
  { id: "vtex", name: "VTEX", icon: "⚡" },
  { id: "custom", name: "API Custom", icon: "🔧" },
];

const POST_TEMPLATES = [
  { id: "product-hero", name: "Producto Hero", layout: "centered" },
  { id: "product-minimal", name: "Minimal Clean", layout: "minimal" },
  { id: "product-bold", name: "Bold Statement", layout: "bold" },
  { id: "product-duo", name: "Duo Showcase", layout: "duo" },
  { id: "product-story", name: "Story Format", layout: "story" },
  { id: "product-sale", name: "Flash Sale", layout: "sale" },
];

// ─── Utility ───
const formatPrice = (p) => `$${(p / 1000).toFixed(1)}k`;
const formatStock = (s) => s > 999 ? `${(s / 1000).toFixed(1)}k` : s;

// ─── Components ───

function Sidebar({ activeSection, onNavigate, brandConfig }) {
  const sections = [
    { id: "brand", label: "Branding", icon: "◉" },
    { id: "ecommerce", label: "E-commerce", icon: "⬡" },
    { id: "products", label: "Productos", icon: "▤" },
    { id: "templates", label: "Templates", icon: "◫" },
    { id: "generator", label: "Generador", icon: "⟐" },
    { id: "calendar", label: "Calendario", icon: "▦" },
  ];

  return (
    <div style={{
      width: 72,
      minHeight: "100vh",
      background: "#0a0a0f",
      borderRight: "1px solid rgba(255,255,255,0.06)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: 24,
      gap: 4,
      position: "fixed",
      left: 0,
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 12,
        background: brandConfig.primaryColor || "#6c5ce7",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18, fontWeight: 800, color: "#fff",
        marginBottom: 24, fontFamily: "Sora",
        boxShadow: `0 4px 20px ${brandConfig.primaryColor || "#6c5ce7"}44`,
      }}>
        {brandConfig.brandName?.[0] || "◈"}
      </div>
      {sections.map((s) => (
        <button
          key={s.id}
          onClick={() => onNavigate(s.id)}
          style={{
            width: 48, height: 48, border: "none", borderRadius: 14,
            background: activeSection === s.id ? "rgba(255,255,255,0.08)" : "transparent",
            color: activeSection === s.id ? "#fff" : "rgba(255,255,255,0.35)",
            cursor: "pointer", display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 2,
            transition: "all 0.2s", fontSize: 18,
            position: "relative",
          }}
          title={s.label}
        >
          {activeSection === s.id && (
            <div style={{
              position: "absolute", left: -12, top: "50%", transform: "translateY(-50%)",
              width: 3, height: 20, borderRadius: 2,
              background: brandConfig.primaryColor || "#6c5ce7",
            }} />
          )}
          <span>{s.icon}</span>
          <span style={{ fontSize: 8, fontFamily: "DM Sans", letterSpacing: 0.5 }}>{s.label}</span>
        </button>
      ))}
    </div>
  );
}

function BrandSection({ brandConfig, setBrandConfig }) {
  const fileRef = useRef(null);
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleColorChange = (key, value) => {
    setBrandConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUploadedImages((prev) => [...prev, { name: file.name, src: ev.target.result, type: file.type }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const fonts = ["Sora", "DM Sans", "Space Mono", "Montserrat", "Playfair Display", "Bebas Neue", "Poppins", "Raleway"];
  const tones = ["Profesional", "Casual", "Elegante", "Juvenil", "Minimalista", "Audaz", "Sofisticado"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#fff", margin: 0, fontFamily: "Sora" }}>
          Identidad de Marca
        </h2>
        <p style={{ color: "rgba(255,255,255,0.4)", margin: "8px 0 0", fontFamily: "DM Sans", fontSize: 14 }}>
          Configura el ADN visual de tu cliente para generar posts coherentes
        </p>
      </div>

      {/* Brand Name & Tagline */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <label style={labelStyle}>Nombre de Marca</label>
          <input
            style={inputStyle}
            value={brandConfig.brandName}
            onChange={(e) => handleColorChange("brandName", e.target.value)}
            placeholder="Ej: NOVA Streetwear"
          />
        </div>
        <div>
          <label style={labelStyle}>Tagline / Slogan</label>
          <input
            style={inputStyle}
            value={brandConfig.tagline}
            onChange={(e) => handleColorChange("tagline", e.target.value)}
            placeholder="Ej: Define tu estilo"
          />
        </div>
      </div>

      {/* Colors */}
      <div>
        <label style={labelStyle}>Paleta de Colores</label>
        <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
          {["primaryColor", "secondaryColor", "accentColor", "bgColor"].map((key, i) => (
            <div key={key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 56, height: 56, borderRadius: 16, cursor: "pointer",
                  background: brandConfig[key],
                  border: "2px solid rgba(255,255,255,0.1)",
                  position: "relative", overflow: "hidden",
                  boxShadow: `0 4px 16px ${brandConfig[key]}33`,
                }}
                onClick={() => document.getElementById(`color-${key}`).click()}
              >
                <input
                  id={`color-${key}`}
                  type="color"
                  value={brandConfig[key]}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  style={{ opacity: 0, position: "absolute", inset: 0, cursor: "pointer" }}
                />
              </div>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "Space Mono" }}>
                {["Primario", "Secundario", "Acento", "Fondo"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <label style={labelStyle}>Fuente Principal</label>
          <select
            style={inputStyle}
            value={brandConfig.fontPrimary}
            onChange={(e) => handleColorChange("fontPrimary", e.target.value)}
          >
            {fonts.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Fuente Secundaria</label>
          <select
            style={inputStyle}
            value={brandConfig.fontSecondary}
            onChange={(e) => handleColorChange("fontSecondary", e.target.value)}
          >
            {fonts.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
      </div>

      {/* Tone */}
      <div>
        <label style={labelStyle}>Tono de Comunicación</label>
        <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
          {tones.map((t) => (
            <button
              key={t}
              onClick={() => handleColorChange("tone", t)}
              style={{
                padding: "8px 16px", borderRadius: 20, border: "1px solid",
                borderColor: brandConfig.tone === t ? brandConfig.primaryColor : "rgba(255,255,255,0.1)",
                background: brandConfig.tone === t ? `${brandConfig.primaryColor}22` : "transparent",
                color: brandConfig.tone === t ? brandConfig.primaryColor : "rgba(255,255,255,0.5)",
                fontSize: 13, fontFamily: "DM Sans", cursor: "pointer", transition: "all 0.2s",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label style={labelStyle}>Piezas Gráficas de Referencia</label>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, margin: "4px 0 12px", fontFamily: "DM Sans" }}>
          Sube logos, posts anteriores, moodboards o cualquier referencia visual
        </p>
        <div
          onClick={() => fileRef.current?.click()}
          style={{
            border: "2px dashed rgba(255,255,255,0.12)", borderRadius: 16,
            padding: 32, textAlign: "center", cursor: "pointer",
            background: "rgba(255,255,255,0.02)", transition: "all 0.2s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = brandConfig.primaryColor}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"}
        >
          <div style={{ fontSize: 32, marginBottom: 8 }}>⊕</div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, fontFamily: "DM Sans" }}>
            Arrastra archivos o haz click para subir
          </div>
          <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 11, marginTop: 4 }}>
            PNG, JPG, SVG · Máx 10MB
          </div>
          <input ref={fileRef} type="file" multiple accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />
        </div>

        {uploadedImages.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 16 }}>
            {uploadedImages.map((img, i) => (
              <div key={i} style={{
                borderRadius: 12, overflow: "hidden", aspectRatio: "1",
                border: "1px solid rgba(255,255,255,0.08)", position: "relative",
              }}>
                <img src={img.src} alt={img.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <button
                  onClick={() => setUploadedImages((prev) => prev.filter((_, j) => j !== i))}
                  style={{
                    position: "absolute", top: 4, right: 4, width: 22, height: 22,
                    borderRadius: 6, border: "none", background: "rgba(0,0,0,0.7)",
                    color: "#fff", fontSize: 11, cursor: "pointer",
                  }}
                >✕</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Preview Card */}
      <div style={{
        background: `linear-gradient(135deg, ${brandConfig.primaryColor}15, ${brandConfig.secondaryColor}15)`,
        borderRadius: 20, padding: 24, border: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "Space Mono", marginBottom: 12, letterSpacing: 2 }}>
          PREVIEW DE MARCA
        </div>
        <div style={{
          fontSize: 32, fontWeight: 800, color: brandConfig.primaryColor,
          fontFamily: brandConfig.fontPrimary, marginBottom: 4,
        }}>
          {brandConfig.brandName || "Tu Marca"}
        </div>
        <div style={{
          fontSize: 14, color: brandConfig.secondaryColor,
          fontFamily: brandConfig.fontSecondary,
        }}>
          {brandConfig.tagline || "Tu tagline aquí"}
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <div style={{ padding: "6px 16px", borderRadius: 20, background: brandConfig.primaryColor, color: "#fff", fontSize: 12, fontFamily: "DM Sans", fontWeight: 600 }}>
            Comprar Ahora
          </div>
          <div style={{ padding: "6px 16px", borderRadius: 20, border: `1px solid ${brandConfig.accentColor}`, color: brandConfig.accentColor, fontSize: 12, fontFamily: "DM Sans" }}>
            Ver Más
          </div>
        </div>
      </div>
    </div>
  );
}

function EcommerceSection({ ecommerceConfig, setEcommerceConfig }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#fff", margin: 0, fontFamily: "Sora" }}>
          Conexión E-commerce
        </h2>
        <p style={{ color: "rgba(255,255,255,0.4)", margin: "8px 0 0", fontFamily: "DM Sans", fontSize: 14 }}>
          Conecta tu tienda para obtener productos y stock en tiempo real
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        {ECOMMERCE_PLATFORMS.map((p) => (
          <button
            key={p.id}
            onClick={() => setEcommerceConfig((prev) => ({ ...prev, platform: p.id }))}
            style={{
              padding: 20, borderRadius: 16, border: "1px solid",
              borderColor: ecommerceConfig.platform === p.id ? "#6c5ce7" : "rgba(255,255,255,0.08)",
              background: ecommerceConfig.platform === p.id ? "rgba(108,92,231,0.08)" : "rgba(255,255,255,0.02)",
              cursor: "pointer", display: "flex", flexDirection: "column",
              alignItems: "center", gap: 8, transition: "all 0.2s",
            }}
          >
            <span style={{ fontSize: 28 }}>{p.icon}</span>
            <span style={{
              fontSize: 13, fontFamily: "DM Sans", fontWeight: 500,
              color: ecommerceConfig.platform === p.id ? "#fff" : "rgba(255,255,255,0.5)",
            }}>{p.name}</span>
          </button>
        ))}
      </div>

      {ecommerceConfig.platform && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={labelStyle}>URL de la Tienda</label>
            <input
              style={inputStyle}
              value={ecommerceConfig.storeUrl}
              onChange={(e) => setEcommerceConfig((prev) => ({ ...prev, storeUrl: e.target.value }))}
              placeholder="https://tu-tienda.myshopify.com"
            />
          </div>
          <div>
            <label style={labelStyle}>API Key</label>
            <input
              style={{ ...inputStyle, fontFamily: "Space Mono" }}
              value={ecommerceConfig.apiKey}
              onChange={(e) => setEcommerceConfig((prev) => ({ ...prev, apiKey: e.target.value }))}
              placeholder="shpat_xxxxxxxxxxxxxxxxxxxxx"
              type="password"
            />
          </div>
          <button
            onClick={() => setEcommerceConfig((prev) => ({ ...prev, connected: true }))}
            style={{
              padding: "14px 24px", borderRadius: 12, border: "none",
              background: ecommerceConfig.connected ? "#00b894" : "#6c5ce7",
              color: "#fff", fontSize: 14, fontFamily: "DM Sans", fontWeight: 600,
              cursor: "pointer", transition: "all 0.2s",
            }}
          >
            {ecommerceConfig.connected ? "✓ Conectado" : "Conectar Tienda"}
          </button>

          {ecommerceConfig.connected && (
            <div style={{
              background: "rgba(0,184,148,0.08)", border: "1px solid rgba(0,184,148,0.2)",
              borderRadius: 12, padding: 16, display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00b894", boxShadow: "0 0 8px #00b894" }} />
              <div>
                <div style={{ color: "#00b894", fontSize: 13, fontFamily: "DM Sans", fontWeight: 600 }}>Sincronización activa</div>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontFamily: "DM Sans" }}>
                  8 productos · 1,493 unidades en stock · Última sync: hace 2min
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Stock Strategy */}
      <div>
        <label style={labelStyle}>Estrategia de Publicación por Stock</label>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, margin: "4px 0 12px", fontFamily: "DM Sans" }}>
          Define qué productos priorizar en las publicaciones automáticas
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { id: "high-stock", label: "Mayor Stock Primero", desc: "Prioriza productos con más inventario para mover volumen" },
            { id: "new-arrivals", label: "Recién Llegados", desc: "Publica primero productos nuevos o recién reabastecidos" },
            { id: "margin-first", label: "Mayor Margen", desc: "Prioriza productos con mejor margen de ganancia" },
            { id: "mixed", label: "Estrategia Mixta", desc: "Combina stock, novedad y margen de forma equilibrada" },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setEcommerceConfig((prev) => ({ ...prev, strategy: s.id }))}
              style={{
                padding: "14px 18px", borderRadius: 12, border: "1px solid",
                borderColor: ecommerceConfig.strategy === s.id ? "#6c5ce7" : "rgba(255,255,255,0.06)",
                background: ecommerceConfig.strategy === s.id ? "rgba(108,92,231,0.06)" : "transparent",
                cursor: "pointer", textAlign: "left", transition: "all 0.2s",
              }}
            >
              <div style={{ color: ecommerceConfig.strategy === s.id ? "#fff" : "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 600, fontFamily: "DM Sans" }}>{s.label}</div>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontFamily: "DM Sans", marginTop: 2 }}>{s.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductsSection({ products, brandConfig }) {
  const sorted = [...products].sort((a, b) => b.stock - a.stock);
  const maxStock = Math.max(...products.map((p) => p.stock));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: "#fff", margin: 0, fontFamily: "Sora" }}>
            Catálogo de Productos
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", margin: "8px 0 0", fontFamily: "DM Sans", fontSize: 14 }}>
            {products.length} productos sincronizados · {products.reduce((a, b) => a + b.stock, 0).toLocaleString()} unidades totales
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ padding: "8px 14px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", fontSize: 12, fontFamily: "DM Sans" }}>
            Filtrar ▾
          </div>
          <div style={{ padding: "8px 14px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", fontSize: 12, fontFamily: "DM Sans" }}>
            Ordenar: Stock ▾
          </div>
        </div>
      </div>

      {/* Stock Overview Bar */}
      <div style={{
        background: "rgba(255,255,255,0.02)", borderRadius: 16, padding: 20,
        border: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "Space Mono", letterSpacing: 2, marginBottom: 12 }}>
          DISTRIBUCIÓN DE STOCK
        </div>
        <div style={{ display: "flex", gap: 4, height: 48, alignItems: "flex-end" }}>
          {sorted.map((p) => (
            <div
              key={p.id}
              style={{
                flex: 1, borderRadius: "6px 6px 0 0",
                height: `${(p.stock / maxStock) * 100}%`,
                background: `linear-gradient(to top, ${brandConfig.primaryColor}88, ${brandConfig.primaryColor})`,
                transition: "height 0.5s ease",
                position: "relative",
              }}
              title={`${p.name}: ${p.stock} uds`}
            />
          ))}
        </div>
        <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
          {sorted.map((p) => (
            <div key={p.id} style={{ flex: 1, fontSize: 8, color: "rgba(255,255,255,0.25)", textAlign: "center", fontFamily: "Space Mono", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {p.name.split(" ")[0]}
            </div>
          ))}
        </div>
      </div>

      {/* Product List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {sorted.map((p, i) => (
          <div
            key={p.id}
            style={{
              display: "grid", gridTemplateColumns: "40px 56px 1fr 100px 100px 80px",
              alignItems: "center", gap: 16, padding: "14px 16px",
              borderRadius: 14, background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.04)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.02)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)";
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 11, fontFamily: "Space Mono" }}>#{i + 1}</span>
            <div style={{
              width: 44, height: 44, borderRadius: 10,
              background: `linear-gradient(135deg, ${p.color}, ${p.color}88)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16,
            }}>
              📦
            </div>
            <div>
              <div style={{ color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: "DM Sans" }}>{p.name}</div>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontFamily: "Space Mono" }}>{p.sku} · {p.category}</div>
            </div>
            <div style={{ color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: "Space Mono" }}>{formatPrice(p.price)}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                flex: 1, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)",
                overflow: "hidden",
              }}>
                <div style={{
                  width: `${(p.stock / maxStock) * 100}%`, height: "100%", borderRadius: 2,
                  background: p.stock > 200 ? "#00b894" : p.stock > 50 ? "#fdcb6e" : "#e17055",
                }} />
              </div>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontFamily: "Space Mono", minWidth: 30 }}>
                {p.stock}
              </span>
            </div>
            <div style={{
              padding: "5px 10px", borderRadius: 8, fontSize: 10, fontFamily: "DM Sans", fontWeight: 600,
              background: p.stock > 200 ? "rgba(0,184,148,0.12)" : p.stock > 50 ? "rgba(253,203,110,0.12)" : "rgba(225,112,85,0.12)",
              color: p.stock > 200 ? "#00b894" : p.stock > 50 ? "#fdcb6e" : "#e17055",
              textAlign: "center",
            }}>
              {p.stock > 200 ? "ALTO" : p.stock > 50 ? "MEDIO" : "BAJO"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TemplatesSection({ selectedTemplate, setSelectedTemplate, brandConfig }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#fff", margin: 0, fontFamily: "Sora" }}>
          Templates de Post
        </h2>
        <p style={{ color: "rgba(255,255,255,0.4)", margin: "8px 0 0", fontFamily: "DM Sans", fontSize: 14 }}>
          Selecciona y personaliza el diseño base para las publicaciones
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {POST_TEMPLATES.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedTemplate(t.id)}
            style={{
              aspectRatio: "1", borderRadius: 20, border: "2px solid",
              borderColor: selectedTemplate === t.id ? brandConfig.primaryColor : "rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)", cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", gap: 12, transition: "all 0.3s",
              position: "relative", overflow: "hidden", padding: 20,
            }}
          >
            {selectedTemplate === t.id && (
              <div style={{
                position: "absolute", top: 10, right: 10, width: 24, height: 24,
                borderRadius: 8, background: brandConfig.primaryColor,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: 12, fontWeight: 700,
              }}>✓</div>
            )}
            <TemplatePreview layout={t.layout} brandConfig={brandConfig} />
            <span style={{
              fontSize: 12, fontFamily: "DM Sans", fontWeight: 600,
              color: selectedTemplate === t.id ? "#fff" : "rgba(255,255,255,0.5)",
            }}>{t.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function TemplatePreview({ layout, brandConfig, product, large }) {
  const s = large ? 1 : 0.55;
  const w = large ? 320 : 176;
  const h = large ? 320 : 176;

  const bg = brandConfig.bgColor || "#0d0d0d";
  const primary = brandConfig.primaryColor || "#6c5ce7";
  const secondary = brandConfig.secondaryColor || "#a29bfe";
  const accent = brandConfig.accentColor || "#fd79a8";
  const fontP = brandConfig.fontPrimary || "Sora";
  const fontS = brandConfig.fontSecondary || "DM Sans";
  const name = product?.name || "Producto";
  const price = product ? formatPrice(product.price) : "$29.9k";

  const layouts = {
    centered: (
      <div style={{ width: w, height: h, background: bg, borderRadius: large ? 16 : 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 * s, overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", top: -20, right: -20, width: 100 * s, height: 100 * s, borderRadius: "50%", background: `${primary}22` }} />
        <div style={{ width: 80 * s, height: 80 * s, borderRadius: 16 * s, background: `linear-gradient(135deg, ${primary}44, ${secondary}44)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 * s }}>📦</div>
        <div style={{ color: "#fff", fontSize: 14 * s, fontWeight: 700, fontFamily: fontP, textAlign: "center", padding: `0 ${12 * s}px` }}>{name}</div>
        <div style={{ color: accent, fontSize: 16 * s, fontWeight: 800, fontFamily: "Space Mono" }}>{price}</div>
        <div style={{ padding: `${4 * s}px ${12 * s}px`, borderRadius: 20, background: primary, color: "#fff", fontSize: 9 * s, fontFamily: fontS, fontWeight: 600 }}>SHOP NOW</div>
      </div>
    ),
    minimal: (
      <div style={{ width: w, height: h, background: "#fafafa", borderRadius: large ? 16 : 10, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 16 * s, overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)", width: 70 * s, height: 70 * s, borderRadius: 12 * s, background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 * s }}>📦</div>
        <div style={{ color: "#222", fontSize: 12 * s, fontWeight: 700, fontFamily: fontP }}>{name}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 * s }}>
          <span style={{ color: "#666", fontSize: 10 * s, fontFamily: fontS }}>New Arrival</span>
          <span style={{ color: "#222", fontSize: 13 * s, fontWeight: 800, fontFamily: "Space Mono" }}>{price}</span>
        </div>
      </div>
    ),
    bold: (
      <div style={{ width: w, height: h, background: primary, borderRadius: large ? 16 : 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 * s, overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.03) 10px, rgba(0,0,0,0.03) 20px)` }} />
        <div style={{ fontSize: 32 * s, fontWeight: 900, color: "#fff", fontFamily: fontP, textTransform: "uppercase", textAlign: "center", lineHeight: 1, padding: `0 ${12 * s}px`, position: "relative" }}>{name}</div>
        <div style={{ padding: `${6 * s}px ${14 * s}px`, borderRadius: 4, background: "#fff", color: primary, fontSize: 14 * s, fontWeight: 800, fontFamily: "Space Mono", position: "relative" }}>{price}</div>
      </div>
    ),
    duo: (
      <div style={{ width: w, height: h, background: bg, borderRadius: large ? 16 : 10, display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }}>
        <div style={{ background: `${primary}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 * s }}>📦</div>
        <div style={{ padding: 12 * s, display: "flex", flexDirection: "column", justifyContent: "center", gap: 6 * s }}>
          <div style={{ fontSize: 8 * s, color: accent, fontFamily: fontS, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>NUEVO</div>
          <div style={{ color: "#fff", fontSize: 11 * s, fontWeight: 700, fontFamily: fontP, lineHeight: 1.2 }}>{name}</div>
          <div style={{ color: secondary, fontSize: 13 * s, fontWeight: 800, fontFamily: "Space Mono" }}>{price}</div>
        </div>
      </div>
    ),
    story: (
      <div style={{ width: w, height: h, background: `linear-gradient(180deg, ${primary}, ${bg})`, borderRadius: large ? 16 : 10, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 14 * s, overflow: "hidden" }}>
        <div style={{ fontSize: 8 * s, color: "rgba(255,255,255,0.6)", fontFamily: fontS, fontWeight: 600, letterSpacing: 2 }}>{brandConfig.brandName || "BRAND"}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 * s }}>
          <div style={{ fontSize: 28 * s }}>📦</div>
          <div style={{ color: "#fff", fontSize: 14 * s, fontWeight: 700, fontFamily: fontP }}>{name}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 * s }}>
            <span style={{ color: "#fff", fontSize: 14 * s, fontWeight: 800, fontFamily: "Space Mono" }}>{price}</span>
            <span style={{ width: 16 * s, height: 1, background: "rgba(255,255,255,0.3)" }} />
            <span style={{ fontSize: 8 * s, color: "rgba(255,255,255,0.5)", fontFamily: fontS }}>⬆ Swipe</span>
          </div>
        </div>
      </div>
    ),
    sale: (
      <div style={{ width: w, height: h, background: accent, borderRadius: large ? 16 : 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 * s, overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", top: 8 * s, left: 8 * s, padding: `${3 * s}px ${8 * s}px`, background: "#fff", borderRadius: 4, color: accent, fontSize: 8 * s, fontWeight: 800, fontFamily: "Space Mono" }}>-30%</div>
        <div style={{ fontSize: 24 * s }}>📦</div>
        <div style={{ fontSize: 10 * s, color: "rgba(255,255,255,0.7)", fontFamily: fontS, textDecoration: "line-through" }}>$42.9k</div>
        <div style={{ fontSize: 18 * s, fontWeight: 900, color: "#fff", fontFamily: fontP }}>{price}</div>
        <div style={{ padding: `${4 * s}px ${12 * s}px`, borderRadius: 20, background: "#fff", color: accent, fontSize: 8 * s, fontWeight: 700, fontFamily: fontS }}>COMPRAR</div>
      </div>
    ),
  };

  return layouts[layout] || layouts.centered;
}

function GeneratorSection({ products, brandConfig, selectedTemplate }) {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState([]);
  const [postCount, setPostCount] = useState(4);
  const [captionStyle, setCaptionStyle] = useState("engaging");

  const topProducts = [...products].sort((a, b) => b.stock - a.stock).slice(0, postCount);
  const templateObj = POST_TEMPLATES.find((t) => t.id === selectedTemplate) || POST_TEMPLATES[0];

  const captionStyles = {
    engaging: (p) => `🔥 ${p.name} ya disponible!\n\n${brandConfig.tone === "Casual" ? "No te quedes sin el tuyo" : "Descubre la nueva colección"} ✨\n\n💰 ${formatPrice(p.price)}\n📦 Stock limitado — ${p.stock} unidades\n\n🛒 Link en bio\n\n#${brandConfig.brandName?.replace(/\s/g, "") || "moda"} #${p.category?.toLowerCase()} #newdrop #streetwear`,
    minimal: (p) => `${p.name}\n${formatPrice(p.price)}\n\nDisponible ahora → link en bio`,
    storytelling: (p) => `Hay prendas que hablan por sí solas. ${p.name} es una de ellas.\n\nDiseñada para quienes buscan algo más que moda — buscan identidad.\n\n${formatPrice(p.price)} · ${p.stock} unidades\n\n#${brandConfig.brandName?.replace(/\s/g, "") || "estilo"}`,
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      const posts = topProducts.map((p, i) => ({
        product: p,
        template: templateObj,
        caption: (captionStyles[captionStyle] || captionStyles.engaging)(p),
        scheduledDate: new Date(Date.now() + (i * 2 + 1) * 86400000).toLocaleDateString("es-CL"),
        scheduledTime: ["10:00", "13:00", "18:00", "20:00"][i % 4],
      }));
      setGenerated(posts);
      setGenerating(false);
    }, 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#fff", margin: 0, fontFamily: "Sora" }}>
          Generador de Posts
        </h2>
        <p style={{ color: "rgba(255,255,255,0.4)", margin: "8px 0 0", fontFamily: "DM Sans", fontSize: 14 }}>
          Genera publicaciones automáticas basadas en tu stock y branding
        </p>
      </div>

      {/* Config */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <label style={labelStyle}>Cantidad de Posts</label>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            {[2, 4, 6, 8].map((n) => (
              <button
                key={n}
                onClick={() => setPostCount(n)}
                style={{
                  flex: 1, padding: "10px 0", borderRadius: 10, border: "1px solid",
                  borderColor: postCount === n ? brandConfig.primaryColor : "rgba(255,255,255,0.08)",
                  background: postCount === n ? `${brandConfig.primaryColor}15` : "transparent",
                  color: postCount === n ? "#fff" : "rgba(255,255,255,0.4)",
                  fontSize: 14, fontFamily: "Space Mono", fontWeight: 700, cursor: "pointer",
                }}
              >{n}</button>
            ))}
          </div>
        </div>
        <div>
          <label style={labelStyle}>Estilo de Caption</label>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            {[
              { id: "engaging", label: "Engaging" },
              { id: "minimal", label: "Minimal" },
              { id: "storytelling", label: "Story" },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setCaptionStyle(s.id)}
                style={{
                  flex: 1, padding: "10px 0", borderRadius: 10, border: "1px solid",
                  borderColor: captionStyle === s.id ? brandConfig.primaryColor : "rgba(255,255,255,0.08)",
                  background: captionStyle === s.id ? `${brandConfig.primaryColor}15` : "transparent",
                  color: captionStyle === s.id ? "#fff" : "rgba(255,255,255,0.4)",
                  fontSize: 12, fontFamily: "DM Sans", fontWeight: 600, cursor: "pointer",
                }}
              >{s.label}</button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={generating}
        style={{
          padding: "16px 32px", borderRadius: 14, border: "none",
          background: generating
            ? "rgba(255,255,255,0.06)"
            : `linear-gradient(135deg, ${brandConfig.primaryColor}, ${brandConfig.accentColor})`,
          color: "#fff", fontSize: 15, fontFamily: "Sora", fontWeight: 700,
          cursor: generating ? "wait" : "pointer", transition: "all 0.3s",
          boxShadow: generating ? "none" : `0 8px 32px ${brandConfig.primaryColor}33`,
        }}
      >
        {generating ? (
          <span>⟳ Generando posts...</span>
        ) : (
          <span>⟐ Generar {postCount} Posts Automáticos</span>
        )}
      </button>

      {/* Generated Posts */}
      {generated.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "Space Mono", letterSpacing: 2 }}>
            POSTS GENERADOS · {generated.length} PUBLICACIONES
          </div>
          {generated.map((post, i) => (
            <div
              key={i}
              style={{
                display: "grid", gridTemplateColumns: "auto 1fr",
                gap: 20, padding: 20, borderRadius: 20,
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ position: "relative" }}>
                <TemplatePreview
                  layout={templateObj.layout}
                  brandConfig={brandConfig}
                  product={post.product}
                  large
                />
                <div style={{
                  position: "absolute", top: 8, left: 8,
                  padding: "4px 8px", borderRadius: 6,
                  background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
                  color: "#fff", fontSize: 10, fontFamily: "Space Mono",
                }}>
                  POST #{i + 1}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{
                    padding: "5px 10px", borderRadius: 6,
                    background: `${brandConfig.primaryColor}15`,
                    color: brandConfig.primaryColor,
                    fontSize: 11, fontFamily: "Space Mono", fontWeight: 700,
                  }}>
                    📅 {post.scheduledDate}
                  </div>
                  <div style={{
                    padding: "5px 10px", borderRadius: 6,
                    background: "rgba(255,255,255,0.04)",
                    color: "rgba(255,255,255,0.5)",
                    fontSize: 11, fontFamily: "Space Mono",
                  }}>
                    🕐 {post.scheduledTime}
                  </div>
                  <div style={{
                    padding: "5px 10px", borderRadius: 6,
                    background: "rgba(0,184,148,0.1)",
                    color: "#00b894",
                    fontSize: 11, fontFamily: "DM Sans", fontWeight: 600,
                  }}>
                    Stock: {post.product.stock} uds
                  </div>
                </div>

                <div style={{
                  flex: 1, padding: 16, borderRadius: 12,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.04)",
                }}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "Space Mono", letterSpacing: 1, marginBottom: 8 }}>
                    CAPTION
                  </div>
                  <div style={{
                    color: "rgba(255,255,255,0.7)", fontSize: 13,
                    fontFamily: "DM Sans", lineHeight: 1.6,
                    whiteSpace: "pre-wrap",
                  }}>
                    {post.caption}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button style={{
                    flex: 1, padding: "10px 0", borderRadius: 10, border: "none",
                    background: brandConfig.primaryColor, color: "#fff",
                    fontSize: 12, fontFamily: "DM Sans", fontWeight: 600, cursor: "pointer",
                  }}>
                    📤 Programar
                  </button>
                  <button style={{
                    padding: "10px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)",
                    background: "transparent", color: "rgba(255,255,255,0.5)",
                    fontSize: 12, fontFamily: "DM Sans", cursor: "pointer",
                  }}>
                    ✏️ Editar
                  </button>
                  <button style={{
                    padding: "10px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)",
                    background: "transparent", color: "rgba(255,255,255,0.5)",
                    fontSize: 12, fontFamily: "DM Sans", cursor: "pointer",
                  }}>
                    🔄
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CalendarSection({ brandConfig }) {
  const days = Array.from({ length: 28 }, (_, i) => i + 1);
  const scheduled = [3, 5, 8, 10, 13, 15, 18, 20, 23, 25, 27];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#fff", margin: 0, fontFamily: "Sora" }}>
          Calendario de Publicación
        </h2>
        <p style={{ color: "rgba(255,255,255,0.4)", margin: "8px 0 0", fontFamily: "DM Sans", fontSize: 14 }}>
          Vista mensual de publicaciones programadas
        </p>
      </div>

      <div style={{ display: "flex", gap: 16, marginBottom: 8 }}>
        {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((d) => (
          <div key={d} style={{ flex: 1, textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "Space Mono", letterSpacing: 1 }}>{d}</div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
        {days.map((d) => {
          const isScheduled = scheduled.includes(d);
          const isToday = d === 4;
          return (
            <div
              key={d}
              style={{
                aspectRatio: "1", borderRadius: 14, display: "flex",
                flexDirection: "column", alignItems: "center", justifyContent: "center",
                gap: 4, cursor: "pointer", transition: "all 0.2s",
                background: isToday ? `${brandConfig.primaryColor}15` : isScheduled ? "rgba(255,255,255,0.03)" : "transparent",
                border: `1px solid ${isToday ? brandConfig.primaryColor : isScheduled ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)"}`,
              }}
            >
              <span style={{
                fontSize: 14, fontFamily: "Space Mono", fontWeight: isToday ? 700 : 400,
                color: isToday ? brandConfig.primaryColor : "rgba(255,255,255,0.5)",
              }}>{d}</span>
              {isScheduled && (
                <div style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: brandConfig.primaryColor,
                  boxShadow: `0 0 8px ${brandConfig.primaryColor}66`,
                }} />
              )}
            </div>
          );
        })}
      </div>

      <div style={{
        background: "rgba(255,255,255,0.02)", borderRadius: 16, padding: 20,
        border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: 12,
      }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "Space Mono", letterSpacing: 2 }}>
          PRÓXIMAS PUBLICACIONES
        </div>
        {[
          { day: 5, time: "10:00", product: "Calcetines Pack x3", type: "Producto Hero" },
          { day: 8, time: "13:00", product: "Gorra Snapback Logo", type: "Bold Statement" },
          { day: 10, time: "18:00", product: "Jogger Slim Fit", type: "Minimal Clean" },
        ].map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
            borderRadius: 10, background: "rgba(255,255,255,0.02)",
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: `${brandConfig.primaryColor}15`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: brandConfig.primaryColor, fontSize: 11, fontWeight: 700, fontFamily: "Space Mono",
            }}>
              {item.day}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "#fff", fontSize: 13, fontFamily: "DM Sans", fontWeight: 500 }}>{item.product}</div>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontFamily: "DM Sans" }}>{item.type} · {item.time}</div>
            </div>
            <div style={{
              padding: "4px 10px", borderRadius: 6,
              background: "rgba(253,203,110,0.12)", color: "#fdcb6e",
              fontSize: 10, fontFamily: "DM Sans", fontWeight: 600,
            }}>
              Pendiente
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Styles ───
const labelStyle = {
  fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)",
  fontFamily: "DM Sans", letterSpacing: 0.5, display: "block", marginBottom: 6,
};

const inputStyle = {
  width: "100%", padding: "12px 16px", borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)",
  color: "#fff", fontSize: 14, fontFamily: "DM Sans",
  outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
};

// ─── Main App ───
export default function App() {
  const [activeSection, setActiveSection] = useState("brand");
  const [brandConfig, setBrandConfig] = useState({
    brandName: "NOVA",
    tagline: "Define tu estilo",
    primaryColor: "#6c5ce7",
    secondaryColor: "#a29bfe",
    accentColor: "#fd79a8",
    bgColor: "#0d0d0d",
    fontPrimary: "Sora",
    fontSecondary: "DM Sans",
    tone: "Audaz",
  });
  const [ecommerceConfig, setEcommerceConfig] = useState({
    platform: "",
    storeUrl: "",
    apiKey: "",
    connected: false,
    strategy: "high-stock",
  });
  const [selectedTemplate, setSelectedTemplate] = useState("product-hero");

  useEffect(() => {
    const link = document.createElement("link");
    link.href = FONTS_LINK;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const sections = {
    brand: <BrandSection brandConfig={brandConfig} setBrandConfig={setBrandConfig} />,
    ecommerce: <EcommerceSection ecommerceConfig={ecommerceConfig} setEcommerceConfig={setEcommerceConfig} />,
    products: <ProductsSection products={MOCK_PRODUCTS} brandConfig={brandConfig} />,
    templates: <TemplatesSection selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} brandConfig={brandConfig} />,
    generator: <GeneratorSection products={MOCK_PRODUCTS} brandConfig={brandConfig} selectedTemplate={selectedTemplate} />,
    calendar: <CalendarSection brandConfig={brandConfig} />,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#08080d", fontFamily: "DM Sans" }}>
      <Sidebar activeSection={activeSection} onNavigate={setActiveSection} brandConfig={brandConfig} />

      <div style={{ marginLeft: 72, flex: 1, display: "flex" }}>
        {/* Main Content */}
        <div style={{ flex: 1, padding: "32px 40px", maxWidth: 900, overflowY: "auto" }}>
          {/* Top Bar */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: 32, paddingBottom: 20,
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}>
            <div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", fontFamily: "Space Mono", letterSpacing: 3 }}>
                INSTAGRAM AUTO-POST SYSTEM
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{
                width: 8, height: 8, borderRadius: "50%",
                background: ecommerceConfig.connected ? "#00b894" : "#e17055",
                boxShadow: ecommerceConfig.connected ? "0 0 8px #00b894" : "none",
              }} />
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: "DM Sans" }}>
                {ecommerceConfig.connected ? "E-commerce conectado" : "Sin conexión"}
              </span>
            </div>
          </div>

          {sections[activeSection]}
        </div>

        {/* Right Panel - Live Preview */}
        <div style={{
          width: 320, borderLeft: "1px solid rgba(255,255,255,0.04)",
          padding: "32px 24px", display: "flex", flexDirection: "column", gap: 20,
          background: "rgba(255,255,255,0.01)", overflowY: "auto",
        }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "Space Mono", letterSpacing: 2 }}>
            LIVE PREVIEW
          </div>

          {/* Phone Frame */}
          <div style={{
            width: "100%", aspectRatio: "9/16", borderRadius: 28,
            border: "2px solid rgba(255,255,255,0.08)",
            background: "#000", overflow: "hidden",
            display: "flex", flexDirection: "column",
          }}>
            {/* Status Bar */}
            <div style={{
              padding: "8px 16px", display: "flex", justifyContent: "space-between",
              fontSize: 10, color: "rgba(255,255,255,0.5)", fontFamily: "DM Sans",
            }}>
              <span>9:41</span>
              <div style={{ display: "flex", gap: 4 }}>
                <span>📶</span><span>🔋</span>
              </div>
            </div>

            {/* IG Header */}
            <div style={{
              padding: "8px 12px", display: "flex", alignItems: "center", gap: 8,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: `linear-gradient(135deg, ${brandConfig.primaryColor}, ${brandConfig.accentColor})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 800, color: "#fff", fontFamily: "Sora",
              }}>
                {brandConfig.brandName?.[0] || "N"}
              </div>
              <div>
                <div style={{ color: "#fff", fontSize: 11, fontWeight: 700, fontFamily: "DM Sans" }}>
                  {brandConfig.brandName?.toLowerCase().replace(/\s/g, "") || "brand"}
                </div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 8, fontFamily: "DM Sans" }}>Patrocinado</div>
              </div>
            </div>

            {/* Post Preview */}
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 4 }}>
              <TemplatePreview
                layout={(POST_TEMPLATES.find((t) => t.id === selectedTemplate) || POST_TEMPLATES[0]).layout}
                brandConfig={brandConfig}
                product={MOCK_PRODUCTS.sort((a, b) => b.stock - a.stock)[0]}
                large
              />
            </div>

            {/* IG Actions */}
            <div style={{ padding: "8px 12px", display: "flex", gap: 14 }}>
              {["♡", "💬", "➤"].map((icon) => (
                <span key={icon} style={{ fontSize: 16 }}>{icon}</span>
              ))}
              <span style={{ marginLeft: "auto", fontSize: 16 }}>⊡</span>
            </div>

            {/* Caption Preview */}
            <div style={{ padding: "4px 12px 12px", maxHeight: 60, overflow: "hidden" }}>
              <span style={{ color: "#fff", fontSize: 10, fontWeight: 700, fontFamily: "DM Sans" }}>
                {brandConfig.brandName?.toLowerCase().replace(/\s/g, "") || "brand"}{" "}
              </span>
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 10, fontFamily: "DM Sans" }}>
                🔥 {MOCK_PRODUCTS[6]?.name || "Producto"} ya disponible!
              </span>
            </div>
          </div>

          {/* Stats */}
          <div style={{
            background: "rgba(255,255,255,0.02)", borderRadius: 14, padding: 16,
            border: "1px solid rgba(255,255,255,0.04)",
          }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "Space Mono", letterSpacing: 1, marginBottom: 12 }}>
              ESTIMACIONES
            </div>
            {[
              { label: "Alcance estimado", value: "2.4k — 5.8k" },
              { label: "Engagement rate", value: "4.2% — 6.1%" },
              { label: "Mejor hora", value: "18:00 — 20:00" },
              { label: "Posts esta semana", value: "3 de 4" },
            ].map((stat) => (
              <div key={stat.label} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.03)",
              }}>
                <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontFamily: "DM Sans" }}>{stat.label}</span>
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontFamily: "Space Mono", fontWeight: 600 }}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
