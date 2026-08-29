import { useState } from "react";
import PageHeader from "../components/PageHeader";
import TransactionRow from "../components/TransactionRow";
import FilterChips from "../components/FilterChips";
import { transactions } from "../mockData";
import { formatDate } from "../lib/format";

const FILTERS = ["All", "Received", "Paid", "Lent", "Borrowed", "Project", "Shop", "Personal"];

export default function Transactions() {
  const [active, setActive] = useState("All");
  const [expanded, setExpanded] = useState(null);

  let list = [...transactions].sort((a, b) => b.date.localeCompare(a.date));
  if (active !== "All") {
    if (["Received", "Paid", "Lent", "Borrowed"].includes(active)) {
      list = list.filter((t) => t.type.toLowerCase() === active.toLowerCase());
    } else {
      list = list.filter((t) => t.book === active.toLowerCase());
    }
  }

  // group by date
  const groups = {};
  for (const t of list) {
    (groups[t.date] = groups[t.date] || []).push(t);
  }

  return (
    <div>
      <PageHeader title="Transactions" />
      <FilterChips options={FILTERS} active={active} onChange={setActive} />
      <div className="mt-1 rounded-card bg-card shadow-card">
        {Object.keys(groups)
          .sort((a, b) => b.localeCompare(a))
          .map((date) => (
            <div key={date}>
              <div className="flex items-center gap-2 px-4 pt-3">
                <span className="text-xs font-medium text-text2">
                  {formatDate(date)}
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>
              {groups[date].map((t) => (
                <TransactionRow
                  key={t.id}
                  txn={t}
                  expanded={expanded === t.id}
                  onToggle={() => setExpanded(expanded === t.id ? null : t.id)}
                />
              ))}
            </div>
          ))}
        {list.length === 0 && (
          <div className="p-6 text-center text-sm text-text2">No transactions</div>
        )}
      </div>
      <div className="h-4" />
    </div>
  );
}
