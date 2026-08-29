import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import TransactionRow from "../components/TransactionRow";
import { parties, transactions } from "../mockData";
import { inr } from "../lib/format";
import { useToast as useToastHook } from "../components/Toast";

export default function PartyDetail() {
  const { id } = useParams();
  const party = parties.find((p) => p.id === id);
  const toast = useToastHook();

  if (!party) {
    return (
      <div>
        <PageHeader title="Party" showBack />
        <div className="p-6 text-center text-sm text-text2">Party not found</div>
      </div>
    );
  }

  const partyTxns = transactions.filter((t) => t.party === party.name);

  return (
    <div>
      <PageHeader title="Party" showBack />

      {/* header card */}
      <div
        className="mx-4 mt-2 rounded-b-[28px] rounded-t-[16px] px-5 pb-5 pt-4 text-white"
        style={{ background: "linear-gradient(135deg, #5F259F 0%, #3D1466 100%)" }}
      >
        <div className="text-sm font-semibold">{party.name}</div>
        <div className="mt-2 text-xs opacity-80">Net Balance</div>
        <div className="text-[28px] font-bold">{inr(party.netBalance)}</div>
        <div className="text-xs opacity-90">
          {party.youOwe ? "You owe" : "He owes you"}
        </div>
      </div>

      {/* breakdown pills */}
      <div className="mt-3 flex gap-2 px-4">
        <Pill label="Lending" value={inr(15000)} />
        <Pill label="Business" value={inr(30000)} />
        <Pill label="Net" value={inr(party.netBalance)} />
      </div>

      {/* history */}
      <div className="mt-4 px-4">
        <h3 className="mb-1 text-sm font-bold text-text1">Transaction History</h3>
        <div className="rounded-card bg-card shadow-card">
          {partyTxns.length === 0 && (
            <div className="p-4 text-center text-sm text-text2">No transactions</div>
          )}
          {partyTxns.map((t) => (
            <TransactionRow key={t.id} txn={t} />
          ))}
        </div>
      </div>

      {/* mark settled */}
      <div className="px-4 pt-4">
        <button
          onClick={() => toast("Marked settled")}
          className="w-full rounded-btn border-2 border-primary py-3 text-sm font-semibold text-primary"
        >
          Mark as Settled
        </button>
      </div>
      <div className="h-4" />
    </div>
  );
}

function Pill({ label, value }) {
  return (
    <div className="flex-1 rounded-full bg-bg px-3 py-2 text-center">
      <div className="text-[11px] text-text2">{label}</div>
      <div className="text-xs font-bold text-text1">{value}</div>
    </div>
  );
}
