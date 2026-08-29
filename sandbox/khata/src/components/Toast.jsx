import { createContext, useContext, useState, useCallback } from "react";

const ToastCtx = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const show = useCallback((msg) => {
    setToast({ msg, id: Date.now() });
    setTimeout(() => setToast(null), 2200);
  }, []);
  return (
    <ToastCtx.Provider value={show}>
      {children}
      {toast && (
        <div
          className="fixed z-50 left-1/2 -translate-x-1/2 rounded-btn px-4 py-2 text-white text-sm font-medium shadow-card"
          style={{
            bottom: 150,
            background: "#16A34A",
            maxWidth: 360,
          }}
        >
          {toast.msg}
        </div>
      )}
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
