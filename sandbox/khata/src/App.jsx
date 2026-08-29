import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import BottomNav from "./components/BottomNav";
import QuickAdd from "./screens/QuickAdd";
import { ToastProvider } from "./components/Toast";
import Home from "./screens/Home";
import Transactions from "./screens/Transactions";
import PartyList from "./screens/PartyList";
import PartyDetail from "./screens/PartyDetail";
import More from "./screens/More";
import Projects from "./screens/Projects";

export default function App() {
  const [quickOpen, setQuickOpen] = useState(false);
  const location = useLocation();

  return (
    <ToastProvider>
      <div className="app-shell">
        <div className="app-scroll">
          <Routes>
            <Route path="/" element={<Home onAdd={() => setQuickOpen(true)} />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/parties" element={<PartyList />} />
            <Route path="/parties/:id" element={<PartyDetail />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/more" element={<More />} />
          </Routes>
        </div>

        {/* Floating "+" button */}
        <button
          onClick={() => setQuickOpen(true)}
          className="fixed z-40 flex items-center justify-center rounded-full bg-primary text-white shadow-plus"
          style={{
            width: 56,
            height: 56,
            left: "50%",
            transform: "translateX(-50%)",
            bottom: 72,
          }}
          aria-label="Add entry"
        >
          <span style={{ fontSize: 28, lineHeight: 1, marginTop: -2 }}>+</span>
        </button>

        <BottomNav />

        {quickOpen && <QuickAdd onClose={() => setQuickOpen(false)} />}
      </div>
    </ToastProvider>
  );
}
