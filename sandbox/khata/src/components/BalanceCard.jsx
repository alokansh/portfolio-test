import { totalBalance, toReceive, toPay, inr } from "../lib/format";

export default function BalanceCard() {
  return (
    <div
      className="mx-4 mt-3 rounded-b-[28px] px-5 pb-5 pt-4 text-white"
      style={{
        background: "linear-gradient(135deg, #5F259F 0%, #3D1466 100%)",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      }}
    >
      <div className="mb-3 text-sm opacity-90">Good morning, Papa 👋</div>
      <div className="text-xs opacity-80">Total Balance</div>
      <div className="text-[32px] font-bold leading-tight">{inr(totalBalance())}</div>
      <div className="mt-4 flex gap-3">
        <div className="flex-1 rounded-full bg-white/15 px-3 py-2">
          <div className="text-[11px] opacity-80">↑ To Receive</div>
          <div className="text-sm font-bold text-green-300">{inr(toReceive())}</div>
        </div>
        <div className="flex-1 rounded-full bg-white/15 px-3 py-2">
          <div className="text-[11px] opacity-80">↓ To Pay</div>
          <div className="text-sm font-bold text-red-300">{inr(toPay())}</div>
        </div>
      </div>
    </div>
  );
}
