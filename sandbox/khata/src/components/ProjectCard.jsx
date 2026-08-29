import { STATUS_META, inr } from "../lib/format";

export default function ProjectCard({ project, compact = false }) {
  const status = STATUS_META[project.status] || STATUS_META.ongoing;
  const pendingGovt = project.contractValue - project.received;

  if (compact) {
    return (
      <div
        className="w-[160px] shrink-0 rounded-card bg-card p-3 shadow-card"
      >
        <div
          className="mb-2 line-clamp-2 text-sm font-bold text-text1"
          style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
        >
          {project.name}
        </div>
        <span
          className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
          style={{ background: status.bg, color: status.color }}
        >
          {status.label}
        </span>
        <div className="mt-2 text-xs text-text2">
          Pending from Govt:{" "}
          <span className="font-semibold text-paid">{inr(pendingGovt)}</span>
        </div>
      </div>
    );
  }

  const profit = project.received - project.spent - project.advancesOut;
  return (
    <div className="rounded-card bg-card p-4 shadow-card">
      <div className="flex items-start justify-between gap-2">
        <div className="text-[15px] font-bold text-text1">{project.name}</div>
        <span
          className="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold"
          style={{ background: status.bg, color: status.color }}
        >
          {status.label}
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-y-1 text-sm">
        <span className="text-text2">Contract:</span>
        <span className="text-right font-semibold">{inr(project.contractValue)}</span>
        <span className="text-text2">Received:</span>
        <span className="text-right font-semibold">{inr(project.received)}</span>
        <span className="text-text2">Pending Govt:</span>
        <span className="text-right font-semibold text-paid">{inr(pendingGovt)}</span>
        <span className="text-text2">Spent:</span>
        <span className="text-right font-semibold">{inr(project.spent)}</span>
        <span className="text-text2">Advances Out:</span>
        <span className="text-right font-semibold">{inr(project.advancesOut)}</span>
        <span className="text-text2">Est. Profit:</span>
        <span className="text-right font-semibold text-received">{inr(profit)}</span>
      </div>
    </div>
  );
}
