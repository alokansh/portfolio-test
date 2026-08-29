import { useEffect } from "react";

export default function BottomSheet({ title, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      {/* sheet */}
      <div
        className="relative z-10 w-full bg-white rounded-t-2xl shadow-card"
        style={{ maxWidth: 430, maxHeight: "90vh", overflowY: "auto" }}
      >
        <div className="flex justify-center pt-3">
          <div className="h-1.5 w-10 rounded-full bg-border" />
        </div>
        <div className="px-5 pb-6 pt-3">
          <h2 className="mb-4 text-center text-[18px] font-bold text-text1">
            {title}
          </h2>
          {children}
        </div>
      </div>
    </div>
  );
}
