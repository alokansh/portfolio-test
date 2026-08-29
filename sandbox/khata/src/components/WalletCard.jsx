import { inr } from "../lib/format";

export default function WalletCard({ wallet }) {
  const isCash = wallet.type === "cash";
  return (
    <div className="rounded-card bg-card p-4 shadow-card">
      <div className="flex items-center gap-2">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full text-lg"
          style={{
            background: isCash ? "#E7F6EC" : "#E7EEFB",
            color: isCash ? "#16A34A" : "#2563EB",
          }}
        >
          {isCash ? "💵" : "🏛️"}
        </div>
        <div className="text-sm font-semibold text-text1">{wallet.name}</div>
      </div>
      <div className="mt-3 text-[22px] font-bold text-text1">{inr(wallet.balance)}</div>
    </div>
  );
}
