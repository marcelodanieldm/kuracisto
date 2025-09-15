import React from "react";

export default function Header({ email, role, onLogout }) {
  // Avatar: inicial del email, color de fondo según rol
  const avatarColor = role === "admin" ? "#7c3aed" : role === "medico" ? "#059669" : "#2563eb";
  const avatarBg = `linear-gradient(135deg, ${avatarColor} 60%, #fff 100%)`;
  const initial = email ? email[0].toUpperCase() : "U";
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = e => setDarkMode(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Estado online simulado
  const online = true;
  // Notificaciones simuladas
  const notifications = 2;
  // Mensaje de bienvenida
  const nombre = email.split('@')[0];
  const welcomeText = `¡Bienvenido${role === 'medico' ? ', Dr.' : role === 'empleado' ? ', Lic.' : ''} ${nombre.charAt(0).toUpperCase() + nombre.slice(1)}! Tu trabajo hace la diferencia cada día.`;

  // Tooltip
  const [showTooltip, setShowTooltip] = React.useState(false);

  // Acceso rápido
  const quickLinks = [
    { label: "Inicio", href: "/" },
    { label: "Ayuda", href: "/ayuda" },
    { label: "Soporte", href: "/soporte" }
  ];

  return (
    <header style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1.5rem 2rem",
      background: darkMode ? avatarColor + "22" : "#f8fafc",
      color: avatarColor,
      borderRadius: "1.5rem",
      boxShadow: darkMode ? `0 2px 24px ${avatarColor}55` : "0 2px 16px #0002",
      marginBottom: "2rem",
      border: `2px solid ${avatarColor}`,
      position: "relative"
    }}>
      {/* Menú avatar y bienvenida */}
      <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
        <div
          style={{
            width: "3.2rem",
            height: "3.2rem",
            borderRadius: "50%",
            background: avatarBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "1.5rem",
            color: "#fff",
            boxShadow: `0 2px 8px ${avatarColor}55`,
            marginRight: "1.2rem",
            border: `2px solid ${avatarColor}`,
            cursor: "pointer",
            position: "relative",
            transition: "box-shadow 0.2s"
          }}
          onClick={() => setMenuOpen(m => !m)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {initial}
          {/* Indicador de estado */}
          <span style={{
            position: "absolute",
            bottom: "0.3rem",
            right: "0.3rem",
            width: "0.8rem",
            height: "0.8rem",
            borderRadius: "50%",
            background: online ? "#22c55e" : "#ef4444",
            border: "2px solid #fff"
          }} />
        </div>
        {/* Tooltip */}
        {showTooltip && (
          <div style={{
            position: "absolute",
            top: "3.5rem",
            left: "0",
            background: "#fff",
            color: avatarColor,
            padding: "0.5rem 1rem",
            borderRadius: "0.75rem",
            boxShadow: `0 2px 8px ${avatarColor}33`,
            fontSize: "0.95rem",
            zIndex: 10
          }}>
            {email}<br />Rol: {role}
          </div>
        )}
        {/* Menú desplegable */}
        {menuOpen && (
          <div style={{
            position: "absolute",
            top: "3.5rem",
            left: "0",
            background: "#fff",
            color: avatarColor,
            minWidth: "180px",
            borderRadius: "1rem",
            boxShadow: `0 4px 16px ${avatarColor}33`,
            zIndex: 20,
            padding: "0.5rem 0"
          }}>
            <a href="/perfil" style={{ display: "block", padding: "0.7rem 1.2rem", textDecoration: "none", color: avatarColor, fontWeight: "bold", borderBottom: "1px solid #eee" }}>Perfil</a>
            <a href="/configuracion" style={{ display: "block", padding: "0.7rem 1.2rem", textDecoration: "none", color: avatarColor, fontWeight: "bold", borderBottom: "1px solid #eee" }}>Configuración</a>
            <button onClick={onLogout} style={{ display: "block", width: "100%", background: "none", border: "none", color: "#ef4444", fontWeight: "bold", padding: "0.7rem 1.2rem", textAlign: "left", cursor: "pointer" }}>Cerrar sesión</button>
          </div>
        )}
        <div>
          <span style={{
            fontWeight: "bold",
            fontSize: "1.35rem",
            color: avatarColor,
            fontFamily: "'Segoe UI', 'Montserrat', 'Poppins', 'Arial', sans-serif",
            letterSpacing: "0.5px",
            textShadow: `0 1px 4px ${avatarColor}22`
          }}>
            {welcomeText}
          </span>
          <span style={{
            background: avatarColor,
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "0.75rem",
            padding: "0.3rem 1rem",
            marginLeft: "1rem",
            fontSize: "1.08rem",
            boxShadow: `0 1px 4px ${avatarColor}33`,
            fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif"
          }}>{role}</span>
        </div>
      </div>
      {/* Notificaciones y acceso rápido */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        {/* Notificaciones */}
        <div style={{ position: "relative", marginRight: "1.2rem" }}>
          <span
            style={{
              fontSize: "2.1rem",
              color: avatarColor,
              cursor: "pointer",
              transition: "color 0.2s"
            }}
            title="Notificaciones"
          >
            {/* Modern bell icon */}
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="14" cy="23" rx="3" ry="2.2" fill="#fff" stroke={avatarColor} strokeWidth="1.5" />
              <path d="M7 20c-1.5-2-2.5-5-2.5-8A9.5 9.5 0 0 1 14 2a9.5 9.5 0 0 1 9.5 10c0 3-1 6-2.5 8" stroke={avatarColor} strokeWidth="2" fill="none" />
              <path d="M4 20h20" stroke={avatarColor} strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          {notifications > 0 && (
            <span style={{
              position: "absolute",
              top: "-0.3rem",
              right: "-0.7rem",
              background: "#ef4444",
              color: "#fff",
              borderRadius: "50%",
              padding: "0.22rem 0.55rem",
              fontSize: "0.95rem",
              fontWeight: "bold",
              fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif",
              boxShadow: "0 1px 4px #ef444455"
            }}>{notifications}</span>
          )}
        </div>
        {/* Acceso rápido */}
        {quickLinks.map(link => (
          <a key={link.href} href={link.href} style={{
            background: darkMode ? avatarColor : "#fff",
            color: darkMode ? "#fff" : avatarColor,
            fontWeight: "bold",
            borderRadius: "0.75rem",
            padding: "0.5rem 1.2rem",
            textDecoration: "none",
            boxShadow: `0 1px 4px ${avatarColor}22`,
            marginRight: "0.5rem",
            transition: "background 0.2s, color 0.2s",
            fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem"
          }}>
            {/* Modern icon for each link */}
            {link.label === "Inicio" && (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke={avatarColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9L9 3l6 6"/><path d="M4 10v5h3v-3h4v3h3v-5"/></svg>
            )}
            {link.label === "Ayuda" && (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke={avatarColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="9" r="8"/><path d="M9 13v-2"/><path d="M9 9a2 2 0 1 1 2-2"/></svg>
            )}
            {link.label === "Soporte" && (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke={avatarColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="12" height="8" rx="2"/><path d="M7 6V4a2 2 0 0 1 4 0v2"/></svg>
            )}
            {link.label}
          </a>
        ))}
        {/* Botón logout visual para fallback */}
        <button
          onClick={onLogout}
          style={{
            background: avatarColor,
            color: "#fff",
            border: "none",
            borderRadius: "0.75rem",
            padding: "0.7rem 1.5rem",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: `0 1px 8px ${avatarColor}33`,
            transition: "background 0.2s"
            // Oculto si menú abierto
          }}
          onMouseOver={e => e.currentTarget.style.background = "#ef4444"}
          onMouseOut={e => e.currentTarget.style.background = avatarColor}
          hidden={menuOpen}
        >
          Cerrar sesión
        </button>
      </div>
      {/* Separador visual */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "6px", background: avatarColor + "33", borderRadius: "0 0 1.5rem 1.5rem" }} />
    </header>
  );
}
