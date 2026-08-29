export default function TypePill({ label, active, onClick, color }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full px-4 py-2 text-sm font-semibold transition-colors"
      style={{
        background: active ? (color || "#5F259F") : "#fff",
        color: active ? "#fff" : "#6B7280",
        border: active ? "none" : "1px solid #E5E7EB",
      }}
    >
      {label}
    </button>
  );
}
