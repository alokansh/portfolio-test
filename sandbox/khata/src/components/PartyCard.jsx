import { useNavigate } from "react-router-dom";
import { inr, initials } from "../lib/format";

export default function PartyCard({ party }) {
  const navigate = useNavigate();
  const owesYou = !party.youOwe; // youOwe=false means they owe you
  const amountColor = owesYou ? "#16A34A" : "#DC2626";
  const avatarBg = owesYou ? "#E7F6EC" : "#FDECEC";

  return (
    <div
      onClick={() => navigate(`/parties/${party.id}`)}
      className="flex items-center gap-3 rounded-card bg-card p-3 shadow-card"
      style={{ minHeight: 72, cursor: "pointer" }}
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold"
        style={{ background: avatarBg, color: amountColor }}
      >
        {initials(party.name)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[15px] font-semibold text-text1">
          {party.name}
        </div>
        <div className="truncate text-xs text-text2">Sub-contractor</div>
      </div>
      <div className="shrink-0 text-right">
        <div className="text-sm font-bold" style={{ color: amountColor }}>
          {inr(party.netBalance)}
        </div>
        <div className="text-[11px] text-text2">
          {owesYou ? "He owes you" : "You owe"}
        </div>
      </div>
      <div className="ml-1 text-text2">›</div>
    </div>
  );
}
