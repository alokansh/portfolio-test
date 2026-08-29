import { wallets, parties } from "../mockData";

// Indian comma formatting: 305600 -> "3,05,600"
export function formatINR(n) {
  const num = Math.round(Math.abs(n));
  const s = num.toString();
  // group from right in 3, then 2
  let out = "";
  const len = s.length;
  for (let i = 0; i < len; i++) {
    const posFromRight = len - i;
    out += s[i];
    if (posFromRight > 3 && posFromRight % 2 === 1) out += ",";
    else if (posFromRight === 3 && len > 3) out += ",";
  }
  return out;
}

export function inr(n) {
  return "₹" + formatINR(n);
}

export function totalBalance() {
  return wallets.reduce((s, w) => s + w.balance, 0);
}

export function toReceive() {
  return parties
    .filter((p) => p.netBalance > 0)
    .reduce((s, p) => s + p.netBalance, 0);
}

export function toPay() {
  return parties
    .filter((p) => p.netBalance < 0)
    .reduce((s, p) => s + Math.abs(p.netBalance), 0);
}

export function initials(name) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export const TYPE_META = {
  received: { label: "Received", color: "#16A34A", arrow: "↓", sign: "+" },
  paid: { label: "Paid", color: "#DC2626", arrow: "↑", sign: "-" },
  lent: { label: "Lent", color: "#2563EB", arrow: "→", sign: "-" },
  borrowed: { label: "Borrowed", color: "#EA580C", arrow: "←", sign: "" },
};

export const STATUS_META = {
  ongoing: { label: "Ongoing", color: "#5F259F", bg: "#F3E9FB" },
  completed: { label: "Completed", color: "#16A34A", bg: "#E7F6EC" },
  payment_pending: { label: "Pending", color: "#EA580C", bg: "#FDEEE3" },
};
