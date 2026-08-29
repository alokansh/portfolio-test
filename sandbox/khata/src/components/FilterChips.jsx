export default function FilterChips({ options, active, onChange }) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-2">
      {options.map((opt) => {
        const isActive = active === opt;
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className="shrink-0 rounded-full px-3 text-sm font-medium"
            style={{
              height: 36,
              background: isActive ? "#5F259F" : "#fff",
              color: isActive ? "#fff" : "#6B7280",
              border: isActive ? "none" : "1px solid #E5E7EB",
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
