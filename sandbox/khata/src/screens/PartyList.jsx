import { useState } from "react";
import PageHeader from "../components/PageHeader";
import PartyCard from "../components/PartyCard";
import FilterChips from "../components/FilterChips";
import { parties } from "../mockData";
import { toReceive, toPay, inr } from "../lib/format";

const CHIPS = ["All", "Owes You", "You Owe"];

export default function PartyList() {
  const [active, setActive] = useState("All");
  let list = parties;
  if (active === "Owes You") list = parties.filter((p) => !p.youOwe);
  if (active === "You Owe") list = parties.filter((p) => p.youOwe);

  return (
    <div>
      <PageHeader title="Parties" />

      {/* summary strip */}
      <div className="grid grid-cols-3 gap-2 px-4">
        <SummaryChip label="All" value={parties.length} active={active === "All"} onClick={() => setActive("All")} />
        <SummaryChip label="Owes You" value={inr(toReceive())} active={active === "Owes You"} onClick={() => setActive("Owes You")} />
        <SummaryChip label="You Owe" value={inr(toPay())} active={active === "You Owe"} onClick={() => setActive("You Owe")} />
      </div>

      <div className="mt-3">
        <FilterChips
          options={CHIPS}
          active={CHIPS.find((c) => c === active) || "All"}
          onChange={setActive}
        />
      </div>

      <div className="flex flex-col gap-2 px-4">
        {list.map((p) => (
          <PartyCard key={p.id} party={p} />
        ))}
      </div>
      <div className="h-4" />
    </div>
  );
}

function SummaryChip({ label, value, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-card bg-card p-2 text-center shadow-card"
      style={{ border: active ? "2px solid #5F259F" : "none" }}
    >
      <div className="text-[11px] text-text2">{label}</div>
      <div className="truncate text-xs font-bold text-text1">{value}</div>
    </button>
  );
}
