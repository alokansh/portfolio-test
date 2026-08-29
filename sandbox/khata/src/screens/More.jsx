import PageHeader from "../components/PageHeader";
import WalletCard from "../components/WalletCard";
import { wallets } from "../mockData";
import { useToast } from "../components/Toast";

const LINKS = [
  { label: "Projects", to: "/projects" },
  { label: "Reports", soon: true },
  { label: "Export Data", soon: true },
  { label: "Categories & Tags", soon: true },
];

export default function More() {
  const toast = useToast();
  return (
    <div>
      <PageHeader title="More" />

      <div className="px-4">
        <h3 className="mb-2 text-sm font-bold text-text1">Your Wallets</h3>
        <div className="grid grid-cols-2 gap-3">
          {wallets.map((w) => (
            <WalletCard key={w.id} wallet={w} />
          ))}
        </div>
      </div>

      <div className="mt-5 px-4">
        <h3 className="mb-2 text-sm font-bold text-text1">Quick Links</h3>
        <div className="overflow-hidden rounded-card bg-card shadow-card">
          {LINKS.map((l, i) => (
            <button
              key={l.label}
              onClick={() => (l.soon ? toast("Coming soon") : null)}
              className="flex w-full items-center justify-between px-4 py-3 text-left"
              style={{
                borderTop: i === 0 ? "none" : "1px solid #E5E7EB",
              }}
            >
              <span className="text-sm text-text1">{l.label}</span>
              <span className="text-text2">{l.soon ? "Soon" : "›"}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="h-4" />
    </div>
  );
}
