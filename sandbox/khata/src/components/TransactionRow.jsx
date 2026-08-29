import { TYPE_META, inr } from "../lib/format";

export default function TransactionRow({ txn, expanded = false, onToggle }) {
  const meta = TYPE_META[txn.type] || TYPE_META.paid;
  const isIn = txn.type === "received";
  const amountColor =
    txn.type === "received"
      ? "#16A34A"
      : txn.type === "paid"
      ? "#DC2626"
      : txn.type === "lent"
      ? "#2563EB"
      : "#EA580C";

  const amountText =
    (isIn ? "+" : txn.type === "borrowed" ? "" : "-") + inr(txn.amount);

  return (
    <div
      className="border-b border-border px-4 py-3"
      onClick={onToggle}
      style={{ cursor: onToggle ? "pointer" : "default" }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
          style={{ background: meta.color, fontSize: 14 }}
        >
          {meta.arrow}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-text1">
            {txn.party || txn.note || txn.category}
          </div>
          <div className="truncate text-xs text-text2">
            {txn.category} · {txn.book} · By {txn.enteredBy}
          </div>
        </div>
        <div
          className="shrink-0 text-sm font-bold"
          style={{ color: amountColor }}
        >
          {amountText}
        </div>
      </div>
      {expanded && (
        <div className="mt-2 rounded-btn bg-bg p-3 text-xs text-text2">
          <div><span className="font-semibold text-text1">Note:</span> {txn.note}</div>
          <div><span className="font-semibold text-text1">Date:</span> {txn.date}</div>
          <div><span className="font-semibold text-text1">Entered by:</span> {txn.enteredBy}</div>
          <div><span className="font-semibold text-text1">Category:</span> {txn.category}</div>
        </div>
      )}
    </div>
  );
}
