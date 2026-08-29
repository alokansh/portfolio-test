import PageHeader from "../components/PageHeader";
import BalanceCard from "../components/BalanceCard";
import TransactionRow from "../components/TransactionRow";
import ProjectCard from "../components/ProjectCard";
import { transactions, projects } from "../mockData";
import { useNavigate } from "react-router-dom";

const QUICK = [
  { type: "received", label: "Received", icon: "↓", color: "#16A34A" },
  { type: "paid", label: "Paid", icon: "↑", color: "#DC2626" },
  { type: "lent", label: "Lent", icon: "→", color: "#2563EB" },
  { type: "borrowed", label: "Borrowed", icon: "←", color: "#EA580C" },
];

export default function Home({ onAdd }) {
  const navigate = useNavigate();
  const recent = [...transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  return (
    <div>
      <PageHeader title="Dashboard" />
      <BalanceCard />

      {/* Quick actions */}
      <div className="mt-4 grid grid-cols-4 gap-2 px-4">
        {QUICK.map((q) => (
          <button
            key={q.type}
            onClick={onAdd}
            className="flex flex-col items-center gap-1 rounded-card bg-card py-3 shadow-card"
          >
            <div
              className="flex h-7 w-7 items-center justify-center rounded-full text-white"
              style={{ background: q.color, fontSize: 14 }}
            >
              {q.icon}
            </div>
            <span className="text-[11px] font-medium text-text2">{q.label}</span>
          </button>
        ))}
      </div>

      {/* Projects strip */}
      <div className="mt-5 flex items-center justify-between px-4">
        <h3 className="text-sm font-bold text-text1">Projects</h3>
        <button
          className="text-xs font-semibold text-primary"
          onClick={() => navigate("/projects")}
        >
          See all →
        </button>
      </div>
      <div className="no-scrollbar mt-2 flex gap-3 overflow-x-auto px-4 pb-2">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} compact />
        ))}
      </div>

      {/* Recent */}
      <div className="mt-5 flex items-center justify-between px-4">
        <h3 className="text-sm font-bold text-text1">Recent</h3>
        <button
          className="text-xs font-semibold text-primary"
          onClick={() => navigate("/transactions")}
        >
          See all →
        </button>
      </div>
      <div className="mt-1 rounded-card bg-card shadow-card">
        {recent.map((t) => (
          <TransactionRow key={t.id} txn={t} />
        ))}
      </div>
      <div className="h-4" />
    </div>
  );
}
