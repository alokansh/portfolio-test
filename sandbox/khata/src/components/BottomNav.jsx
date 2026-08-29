import { NavLink, useNavigate } from "react-router-dom";

const items = [
  { to: "/", label: "Home", icon: "🏠" },
  { to: "/transactions", label: "Txns", icon: "📋" },
  { to: "/parties", label: "Parties", icon: "👥" },
  { to: "/more", label: "More", icon: "≡" },
];

export default function BottomNav() {
  const navigate = useNavigate();
  return (
    <nav
      className="fixed bottom-0 left-1/2 z-30 flex -translate-x-1/2 items-center justify-around bg-white px-2"
      style={{
        width: "100%",
        maxWidth: 430,
        height: 64,
        boxShadow: "0 -2px 12px rgba(0,0,0,0.06)",
      }}
    >
      {items.slice(0, 2).map((it) => (
        <NavItem key={it.to} {...it} />
      ))}
      {/* spacer for the FAB in the middle */}
      <div style={{ width: 56 }} />
      {items.slice(2).map((it) => (
        <NavItem key={it.to} {...it} />
      ))}
    </nav>
  );
}

function NavItem({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        "flex flex-1 flex-col items-center justify-center gap-0.5 text-[11px] font-medium " +
        (isActive ? "text-primary" : "text-text2")
      }
    >
      <span style={{ fontSize: 20 }}>{icon}</span>
      {label}
    </NavLink>
  );
}
