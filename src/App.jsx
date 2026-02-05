import { useState, useRef } from "react";
import logo from "./assets/logo.png";

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

const formatPrice = (p) => `$${(p / 1000).toFixed(1)}k`;

// ─── Components ───

function Sidebar({ activeSection, onNavigate }) {
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
      width: 80,
      minHeight: "100vh",
      background: "rgba(5, 5, 16, 0.8)",
      backdropFilter: "blur(20px)",
      borderRight: "1px solid var(--border-light)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: 32,
      gap: 12,
      position: "fixed",
      left: 0,
      top: 0,
      zIndex: 100,
    }}>
      <div className="animate-glow" style={{
        width: 48, height: 48, borderRadius: 12,
        background: "linear-gradient(135deg, var(--primary), var(--secondary))",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 32,
        boxShadow: "0 0 20px rgba(188, 19, 254, 0.4)"
      }}>
        <img src={logo} alt="Logo" style={{ width: 28, height: 28 }} />
      </div>
      {sections.map((s) => (
        <button
          key={s.id}
          onClick={() => onNavigate(s.id)}
          className={`sidebar-item ${activeSection === s.id ? 'active' : ''}`}
          title={s.label}
        >
          <span style={{ fontSize: "1.2rem" }}>{s.icon}</span>
          <span className="sidebar-item-label">{s.label}</span>
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

  const fonts = ["Orbitron", "Inter", "Space Mono", "Sora", "DM Sans", "Montserrat", "Poppins"];
  const tones = ["Profesional", "Casual", "Elegante", "Juvenil", "Cyberpunk", "Audaz", "Sofisticado"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div>
        <h2 className="text-gradient" style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
          Identidad de Marca
        </h2>
        <p style={{ color: "var(--text-muted)" }}>
          Configura el ADN visual de tu cliente para generar posts coherentes
        </p>
      </div>

      {/* Brand Name & Tagline */}
      <div className="grid-2">
        <div>
          <label>Nombre de Marca</label>
          <input
            className="cyber-input"
            value={brandConfig.brandName}
            onChange={(e) => handleColorChange("brandName", e.target.value)}
            placeholder="Ej: NOVA Streetwear"
          />
        </div>
        <div>
          <label>Tagline / Slogan</label>
          <input
            className="cyber-input"
            value={brandConfig.tagline}
            onChange={(e) => handleColorChange("tagline", e.target.value)}
            placeholder="Ej: Define tu estilo"
          />
        </div>
      </div>

      {/* Colors */}
      <div className="glass-panel" style={{ padding: 24, borderRadius: 16 }}>
        <label style={{ marginBottom: 16 }}>Paleta de Colores</label>
        <div style={{ display: "flex", gap: 24 }}>
          {["primaryColor", "secondaryColor", "accentColor", "bgColor"].map((key, i) => (
            <div key={key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 64, height: 64, borderRadius: 16, cursor: "pointer",
                  background: brandConfig[key],
                  border: "2px solid rgba(255,255,255,0.1)",
                  position: "relative", overflow: "hidden",
                  boxShadow: `0 0 15px ${brandConfig[key]}44`,
                  transition: "transform 0.2s"
                }}
                onClick={() => document.getElementById(`color-${key}`).click()}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                <input
                  id={`color-${key}`}
                  type="color"
                  value={brandConfig[key]}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  style={{ opacity: 0, position: "absolute", inset: 0, cursor: "pointer" }}
                />
              </div>
              <span style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                {["Primario", "Secundario", "Acento", "Fondo"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div className="grid-2">
        <div>
          <label>Fuente Principal</label>
          <select
            className="cyber-input"
            value={brandConfig.fontPrimary}
            onChange={(e) => handleColorChange("fontPrimary", e.target.value)}
          >
            {fonts.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div>
          <label>Fuente Secundaria</label>
          <select
            className="cyber-input"
            value={brandConfig.fontSecondary}
            onChange={(e) => handleColorChange("fontSecondary", e.target.value)}
          >
            {fonts.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
      </div>

      {/* Tone */}
      <div>
        <label>Tono de Comunicación</label>
        <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
          {tones.map((t) => (
            <button
              key={t}
              onClick={() => handleColorChange("tone", t)}
              className={brandConfig.tone === t ? "cyber-button" : "cyber-button secondary"}
              style={{
                padding: "8px 20px",
                fontSize: "0.8rem"
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label>Piezas Gráficas de Referencia</label>
        <div
          onClick={() => fileRef.current?.click()}
          className="cyber-card"
          style={{
            borderStyle: "dashed",
            textAlign: "center", cursor: "pointer",
            background: "rgba(255,255,255,0.01)",
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 8, color: "var(--primary)" }}>⊕</div>
          <div style={{ color: "var(--text-muted)", fontSize: 14 }}>
            Arrastra archivos o haz click para subir
          </div>
          <div style={{ color: "var(--text-dim)", fontSize: 11, marginTop: 4 }}>
            PNG, JPG, SVG · Máx 10MB
          </div>
          <input ref={fileRef} type="file" multiple accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />
        </div>

        {uploadedImages.length > 0 && (
          <div className="grid-4" style={{ marginTop: 16 }}>
            {uploadedImages.map((img, i) => (
              <div key={i} style={{
                borderRadius: 12, overflow: "hidden", aspectRatio: "1",
                border: "1px solid var(--border-light)", position: "relative",
              }}>
                <img src={img.src} alt={img.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EcommerceSection({ ecommerceConfig, setEcommerceConfig }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div>
        <h2 className="text-gradient" style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
          Conexión E-commerce
        </h2>
        <p style={{ color: "var(--text-muted)" }}>
          Conecta tu tienda para obtener productos y stock en tiempo real
        </p>
      </div>

      <div className="grid-3">
        {ECOMMERCE_PLATFORMS.map((p) => (
          <button
            key={p.id}
            onClick={() => setEcommerceConfig((prev) => ({ ...prev, platform: p.id }))}
            className={`cyber-card ${ecommerceConfig.platform === p.id ? 'active' : ''}`}
            style={{
              padding: 20, cursor: "pointer", display: "flex", flexDirection: "column",
              alignItems: "center", gap: 12,
              textAlign: "center"
            }}
          >
            <span style={{ fontSize: 32 }}>{p.icon}</span>
            <span style={{
              fontSize: 14, fontWeight: 500,
              color: ecommerceConfig.platform === p.id ? "#fff" : "var(--text-muted)"
            }}>{p.name}</span>
          </button>
        ))}
      </div>

      {ecommerceConfig.platform && (
        <div className="glass-panel" style={{ padding: 24, borderRadius: 16, display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <label>URL de la Tienda</label>
            <input
              className="cyber-input"
              value={ecommerceConfig.storeUrl}
              onChange={(e) => setEcommerceConfig((prev) => ({ ...prev, storeUrl: e.target.value }))}
              placeholder="https://tu-tienda.myshopify.com"
            />
          </div>
          <div>
            <label>API Key</label>
            <input
              className="cyber-input"
              style={{ fontFamily: "var(--font-mono)" }}
              value={ecommerceConfig.apiKey}
              onChange={(e) => setEcommerceConfig((prev) => ({ ...prev, apiKey: e.target.value }))}
              placeholder="shpat_xxxxxxxxxxxxxxxxxxxxx"
              type="password"
            />
          </div>
          <button
            onClick={() => setEcommerceConfig((prev) => ({ ...prev, connected: true }))}
            className="cyber-button"
            style={{ alignSelf: "flex-start" }}
          >
            {ecommerceConfig.connected ? "✓ Conectado" : "Conectar Tienda"}
          </button>

          {ecommerceConfig.connected && (
            <div style={{
              background: "rgba(0,184,148,0.1)", border: "1px solid rgba(0,184,148,0.3)",
              borderRadius: 12, padding: 16, display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00b894", boxShadow: "0 0 10px #00b894" }} />
              <div>
                <div style={{ color: "#00b894", fontSize: 13, fontWeight: 600 }}>Sincronización activa</div>
                <div style={{ color: "var(--text-muted)", fontSize: 11 }}>
                  8 productos · 1,493 unidades en stock · Última sync: hace 2min
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ProductsSection({ products }) {
  const sorted = [...products].sort((a, b) => b.stock - a.stock);
  const maxStock = Math.max(...products.map((p) => p.stock));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h2 className="text-gradient" style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
            Catálogo de Productos
          </h2>
          <p style={{ color: "var(--text-muted)" }}>
            {products.length} productos sincronizados
          </p>
        </div>
      </div>

      {/* Stock Overview Bar */}
      <div className="glass-panel" style={{ padding: 24, borderRadius: 16 }}>
        <div style={{ fontSize: 10, color: "var(--text-dim)", fontFamily: "var(--font-mono)", letterSpacing: 2, marginBottom: 12 }}>
          DISTRIBUCIÓN DE STOCK
        </div>
        <div style={{ display: "flex", gap: 4, height: 48, alignItems: "flex-end" }}>
          {sorted.map((p) => (
            <div
              key={p.id}
              style={{
                flex: 1, borderRadius: "4px 4px 0 0",
                height: `${(p.stock / maxStock) * 100}%`,
                background: `linear-gradient(to top, rgba(0,243,255,0.2), var(--primary))`,
                transition: "height 0.5s ease",
                position: "relative",
              }}
            />
          ))}
        </div>
      </div>

      {/* Product List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {sorted.map((p, i) => (
          <div
            key={p.id}
            className="glass-panel"
            style={{
              display: "grid", gridTemplateColumns: "40px 50px 1fr 100px 120px 80px",
              alignItems: "center", gap: 16, padding: "16px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <span style={{ color: "var(--text-dim)", fontSize: 12, fontFamily: "var(--font-mono)" }}>#{i + 1}</span>
            <div style={{
              width: 40, height: 40, borderRadius: 8,
              background: `linear-gradient(135deg, ${p.color}, ${p.color}88)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16,
            }}>
              📦
            </div>
            <div>
              <div style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>{p.name}</div>
              <div style={{ color: "var(--text-dim)", fontSize: 11, fontFamily: "var(--font-mono)" }}>{p.sku}</div>
            </div>
            <div style={{ color: "var(--primary)", fontSize: 14, fontWeight: 600, fontFamily: "var(--font-mono)" }}>{formatPrice(p.price)}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                flex: 1, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.1)",
                overflow: "hidden",
              }}>
                <div style={{
                  width: `${(p.stock / maxStock) * 100}%`, height: "100%", borderRadius: 2,
                  background: p.stock > 200 ? "#00b894" : p.stock > 50 ? "#fdcb6e" : "#e17055",
                  boxShadow: `0 0 10px ${p.stock > 200 ? "#00b894" : "#fdcb6e"}`,
                }} />
              </div>
              <span style={{ color: "var(--text-muted)", fontSize: 11, fontFamily: "var(--font-mono)" }}>{p.stock}</span>
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
        <h2 className="text-gradient" style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
          Templates de Post
        </h2>
        <p style={{ color: "var(--text-muted)" }}>
          Selecciona y personaliza el diseño base
        </p>
      </div>

      <div className="grid-3">
        {POST_TEMPLATES.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedTemplate(t.id)}
            className={`cyber-card ${selectedTemplate === t.id ? 'active' : ''}`}
            style={{
              padding: 0, overflow: "hidden", display: "flex", flexDirection: "column",
              gap: 0, border: selectedTemplate === t.id ? "1px solid var(--primary)" : "1px solid var(--border-light)"
            }}
          >
            <div style={{ padding: 20, width: "100%", display: "flex", justifyContent: "center", background: "rgba(0,0,0,0.2)" }}>
              <TemplatePreview layout={t.layout} brandConfig={brandConfig} />
            </div>
            <div style={{
              padding: 12, width: "100%", textAlign: "center",
              fontSize: 12, fontWeight: 600, letterSpacing: 1,
              background: selectedTemplate === t.id ? "rgba(0, 243, 255, 0.1)" : "transparent",
              color: selectedTemplate === t.id ? "#fff" : "var(--text-muted)"
            }}>
              {t.name}
            </div>
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
  const primary = brandConfig.primaryColor || "#00f3ff";
  const secondary = brandConfig.secondaryColor || "#bc13fe";
  const accent = brandConfig.accentColor || "#ff0055";
  const fontP = brandConfig.fontPrimary || "Orbitron";
  const fontS = brandConfig.fontSecondary || "Inter";
  const name = product?.name || "Producto";
  const price = product ? formatPrice(product.price) : "$29.9k";

  const layouts = {
    centered: (
      <div style={{ width: w, height: h, background: bg, borderRadius: large ? 16 : 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 * s, overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", top: -20, right: -20, width: 100 * s, height: 100 * s, borderRadius: "50%", background: `${primary}22`, filter: "blur(20px)" }} />
        <div style={{ width: 80 * s, height: 80 * s, borderRadius: 16 * s, background: `linear-gradient(135deg, ${primary}44, ${secondary}44)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 * s, border: `1px solid ${primary}44` }}>📦</div>
        <div style={{ color: "#fff", fontSize: 14 * s, fontWeight: 700, fontFamily: fontP, textAlign: "center", padding: `0 ${12 * s}px`, textShadow: `0 0 10px ${primary}66` }}>{name}</div>
        <div style={{ color: accent, fontSize: 16 * s, fontWeight: 800, fontFamily: "Space Mono" }}>{price}</div>
      </div>
    ),
    minimal: (
      <div style={{ width: w, height: h, background: "#fff", borderRadius: large ? 16 : 10, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 16 * s, overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)", width: 70 * s, height: 70 * s, borderRadius: 12 * s, background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 * s }}>📦</div>
        <div style={{ color: "#000", fontSize: 12 * s, fontWeight: 700, fontFamily: fontP }}>{name}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 * s }}>
          <span style={{ color: "#666", fontSize: 10 * s, fontFamily: fontS }}>New Arrival</span>
          <span style={{ color: "#000", fontSize: 13 * s, fontWeight: 800, fontFamily: "Space Mono" }}>{price}</span>
        </div>
      </div>
    ),
    bold: (
      <div style={{ width: w, height: h, background: primary, borderRadius: large ? 16 : 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 * s, overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)` }} />
        <div style={{ fontSize: 32 * s, fontWeight: 900, color: "#fff", fontFamily: fontP, textTransform: "uppercase", textAlign: "center", lineHeight: 1, padding: `0 ${12 * s}px`, position: "relative", textShadow: "0 2px 0 rgba(0,0,0,0.1)" }}>{name}</div>
        <div style={{ padding: `${6 * s}px ${14 * s}px`, borderRadius: 4, background: "#fff", color: primary, fontSize: 14 * s, fontWeight: 800, fontFamily: "Space Mono", position: "relative" }}>{price}</div>
      </div>
    ),
    duo: (
      <div style={{ width: w, height: h, background: bg, borderRadius: large ? 16 : 10, display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }}>
        <div style={{ background: `${primary}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 * s, borderRight: `1px solid ${primary}22` }}>📦</div>
        <div style={{ padding: 12 * s, display: "flex", flexDirection: "column", justifyContent: "center", gap: 6 * s }}>
          <div style={{ fontSize: 8 * s, color: accent, fontFamily: fontS, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>NUEVO</div>
          <div style={{ color: "#fff", fontSize: 11 * s, fontWeight: 700, fontFamily: fontP, lineHeight: 1.2 }}>{name}</div>
          <div style={{ color: secondary, fontSize: 13 * s, fontWeight: 800, fontFamily: "Space Mono" }}>{price}</div>
        </div>
      </div>
    ),
    story: (
      <div style={{ width: w, height: h, background: `linear-gradient(180deg, ${primary}, ${bg})`, borderRadius: large ? 16 : 10, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 14 * s, overflow: "hidden" }}>
        <div style={{ fontSize: 8 * s, color: "rgba(255,255,255,0.8)", fontFamily: fontS, fontWeight: 600, letterSpacing: 2 }}>{brandConfig.brandName || "BRAND"}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 * s }}>
          <div style={{ fontSize: 28 * s, filter: "drop-shadow(0 0 10px rgba(255,255,255,0.4))" }}>📦</div>
          <div style={{ color: "#fff", fontSize: 14 * s, fontWeight: 700, fontFamily: fontP }}>{name}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 * s }}>
            <span style={{ color: "#fff", fontSize: 14 * s, fontWeight: 800, fontFamily: "Space Mono" }}>{price}</span>
          </div>
        </div>
      </div>
    ),
    sale: (
      <div style={{ width: w, height: h, background: accent, borderRadius: large ? 16 : 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 * s, overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", top: 8 * s, left: 8 * s, padding: `${3 * s}px ${8 * s}px`, background: "#fff", borderRadius: 4, color: accent, fontSize: 8 * s, fontWeight: 800, fontFamily: "Space Mono", transform: "rotate(-5deg)" }}>-30%</div>
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
        <h2 className="text-gradient" style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
          Generador de Posts
        </h2>
      </div>

      <div className="glass-panel" style={{ padding: 24, borderRadius: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div>
          <label>Cantidad de Posts</label>
          <div style={{ display: "flex", gap: 8 }}>
            {[2, 4, 6, 8].map((n) => (
              <button
                key={n}
                onClick={() => setPostCount(n)}
                className={`cyber-button ${postCount === n ? 'outline-primary' : 'secondary'}`}
                style={{ flex: 1, padding: "10px" }}
              >{n}</button>
            ))}
          </div>
        </div>
        <div>
          <label>Estilo</label>
          <div style={{ display: "flex", gap: 8 }}>
            {[
              { id: "engaging", label: "Engaging" },
              { id: "minimal", label: "Minimal" },
              { id: "storytelling", label: "Story" },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setCaptionStyle(s.id)}
                className={`cyber-button ${captionStyle === s.id ? 'outline-primary' : 'secondary'}`}
                style={{ flex: 1, padding: "10px", fontSize: "0.8rem" }}
              >{s.label}</button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={generating}
        className="cyber-button"
        style={{ width: "100%", fontSize: "1rem", letterSpacing: 2 }}
      >
        {generating ? "ANALIZANDO STOCK & GENERANDO..." : "⚡ GENERAR POSTS AUTOMÁTICOS"}
      </button>

      {generated.length > 0 && (
        <div className="grid-2">
          {generated.map((post, i) => (
            <div key={i} className="cyber-card" style={{ display: "flex", gap: 16 }}>
              <div style={{ width: 100 }}>
                <TemplatePreview layout={selectedTemplate} brandConfig={brandConfig} product={post.product} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: "bold", color: "var(--primary)" }}>{post.product.name}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>📅 {post.scheduledDate} · {post.scheduledTime}</div>
                <div style={{ fontSize: 10, color: "var(--text-dim)", marginTop: 8, whiteSpace: "pre-wrap" }}>
                  {post.caption}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CalendarSection() {
  const days = Array.from({ length: 28 }, (_, i) => i + 1);
  const scheduled = [3, 5, 8, 10, 13, 15, 18, 20, 23, 25, 27];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h2 className="text-gradient" style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
          Calendario
        </h2>
      </div>

      <div className="glass-panel" style={{ padding: 24, borderRadius: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 12 }}>
          {days.map((d) => {
            const isScheduled = scheduled.includes(d);
            const isToday = d === 4;
            return (
              <div
                key={d}
                style={{
                  aspectRatio: "1", borderRadius: 12, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                  background: isToday ? "rgba(0, 243, 255, 0.2)" : isScheduled ? "rgba(255,255,255,0.03)" : "transparent",
                  border: isToday ? "1px solid var(--primary)" : "1px solid transparent",
                  color: isToday ? "#fff" : "var(--text-muted)"
                }}
              >
                {d}
                {isScheduled && <div style={{ width: 4, height: 4, background: "var(--secondary)", borderRadius: "50%", position: "absolute", marginTop: 24 }} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Main App ───

export default function App() {
  const [activeSection, setActiveSection] = useState("brand");
  const [brandConfig, setBrandConfig] = useState({
    brandName: "NOVA",
    tagline: "Define tu estilo",
    primaryColor: "#00f3ff",
    secondaryColor: "#bc13fe",
    accentColor: "#ff0055",
    bgColor: "#050510",
    fontPrimary: "Orbitron",
    fontSecondary: "Inter",
    tone: "Cyberpunk",
  });
  const [ecommerceConfig, setEcommerceConfig] = useState({
    platform: "",
    storeUrl: "",
    apiKey: "",
    connected: false,
    strategy: "high-stock",
  });
  const [selectedTemplate, setSelectedTemplate] = useState("product-hero");

  const sections = {
    brand: <BrandSection brandConfig={brandConfig} setBrandConfig={setBrandConfig} />,
    ecommerce: <EcommerceSection ecommerceConfig={ecommerceConfig} setEcommerceConfig={setEcommerceConfig} />,
    products: <ProductsSection products={MOCK_PRODUCTS} brandConfig={brandConfig} />,
    templates: <TemplatesSection selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} brandConfig={brandConfig} />,
    generator: <GeneratorSection products={MOCK_PRODUCTS} brandConfig={brandConfig} selectedTemplate={selectedTemplate} />,
    calendar: <CalendarSection brandConfig={brandConfig} />,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar activeSection={activeSection} onNavigate={setActiveSection} />

      <div style={{ marginLeft: 80, flex: 1, display: "flex" }}>
        {/* Main Content */}
        <div style={{ flex: 1, padding: "40px 60px", maxWidth: 1000, overflowY: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 10, letterSpacing: 4, color: "var(--primary)", fontFamily: "var(--font-display)" }}>
              SYSTEM V.2.0.45 // ONLINE
            </div>
          </div>
          {sections[activeSection]}
        </div>

        {/* Right Panel - Live Preview */}
        <div style={{
          width: 380, borderLeft: "1px solid var(--border-light)",
          background: "rgba(5, 5, 16, 0.4)", backdropFilter: "blur(10px)",
          padding: 40, display: "flex", flexDirection: "column", gap: 32
        }}>
          <div style={{ fontSize: 10, letterSpacing: 2, color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
            LIVE PREVIEW
          </div>

          {/* Phone Frame */}
          <div style={{
            width: "100%", aspectRatio: "9/16", borderRadius: 32,
            border: "4px solid rgba(255,255,255,0.1)",
            boxShadow: "0 0 40px rgba(0,0,0,0.5)",
            background: "#000", overflow: "hidden",
            display: "flex", flexDirection: "column",
            position: "relative"
          }}>
            {/* Notch */}
            <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 120, height: 24, background: "#111", borderRadius: "0 0 16px 16px", zIndex: 10 }} />

            {/* IG Header */}
            <div style={{
              padding: "40px 16px 12px", display: "flex", alignItems: "center", gap: 10,
              borderBottom: "1px solid rgba(255,255,255,0.1)", background: "#000"
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: `linear-gradient(135deg, ${brandConfig.primaryColor}, ${brandConfig.accentColor})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontWeight: "bold"
              }}>
                {brandConfig.brandName?.[0] || "N"}
              </div>
              <div>
                <div style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>{brandConfig.brandName}</div>
                <div style={{ color: "#666", fontSize: 10 }}>Sponsored</div>
              </div>
            </div>

            {/* Post Preview */}
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#111" }}>
              <TemplatePreview
                layout={(POST_TEMPLATES.find((t) => t.id === selectedTemplate) || POST_TEMPLATES[0]).layout}
                brandConfig={brandConfig}
                product={MOCK_PRODUCTS[0]}
                large
              />
            </div>

            <div style={{ padding: 16, background: "#000" }}>
              <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
                <span>🤍</span> <span>💬</span> <span>✈️</span>
              </div>
              <div style={{ fontSize: 12, color: "#fff" }}>
                <span style={{ fontWeight: "bold" }}>{brandConfig.brandName}</span> <span style={{ color: "#ddd" }}>Descubre la nueva colección...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
