import { useState } from "react";
import BottomSheet from "../components/BottomSheet";
import TypePill from "../components/TypePill";
import { categories, parties } from "../mockData";
import { useToastHook } from "../components/Toast";

const TYPES = [
  { key: "received", label: "Received" },
  { key: "paid", label: "Paid" },
  { key: "lent", label: "Lent" },
  { key: "borrowed", label: "Borrowed" },
];
const BOOKS = ["Personal", "Shop", "Project", "Lending"];

export default function QuickAdd({ onClose }) {
  const toast = useToastHook();
  const [type, setType] = useState("received");
  const [amount, setAmount] = useState("");
  const [book, setBook] = useState("Personal");
  const [party, setParty] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [creatingParty, setCreatingParty] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const save = () => {
    toast("Entry saved!");
    onClose();
  };

  return (
    <BottomSheet title="Add Entry" onClose={onClose}>
      {/* Type */}
      <div className="mb-4">
        <label className="mb-2 block text-xs font-semibold text-text2">Type</label>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <TypePill
              key={t.key}
              label={t.label}
              active={type === t.key}
              onClick={() => setType(t.key)}
            />
          ))}
        </div>
      </div>

      {/* Amount */}
      <div className="mb-4">
        <label className="mb-2 block text-xs font-semibold text-text2">Amount</label>
        <div className="flex items-center rounded-btn border border-border px-3">
          <span className="text-[32px] font-bold text-text1">₹</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className="w-full bg-transparent py-2 text-[32px] font-bold text-text1 outline-none"
          />
        </div>
      </div>

      {/* Book */}
      <div className="mb-4">
        <label className="mb-2 block text-xs font-semibold text-text2">Book</label>
        <div className="flex flex-wrap gap-2">
          {BOOKS.map((b) => (
            <TypePill
              key={b}
              label={b}
              active={book === b}
              onClick={() => setBook(b)}
            />
          ))}
        </div>
      </div>

      {/* Project sub-row */}
      {book === "Project" && (
        <div className="mb-4">
          <label className="mb-2 block text-xs font-semibold text-text2">Project</label>
          <select
            className="w-full rounded-btn border border-border px-3 py-2 text-sm text-text1"
            defaultValue=""
          >
            <option value="" disabled>Select project...</option>
            <option>NH-57 Road Repair, Araria</option>
            <option>Bridge Repair – Forbesganj</option>
            <option>Drain Work – Araria Town</option>
          </select>
        </div>
      )}

      {/* Party */}
      <div className="mb-4">
        <label className="mb-2 block text-xs font-semibold text-text2">
          Party (optional)
        </label>
        {!creatingParty ? (
          <select
            className="w-full rounded-btn border border-border px-3 py-2 text-sm text-text1"
            value={party}
            onChange={(e) => {
              if (e.target.value === "__new__") setCreatingParty(true);
              else setParty(e.target.value);
            }}
          >
            <option value="">Search or create party...</option>
            {parties.map((p) => (
              <option key={p.id} value={p.name}>{p.name}</option>
            ))}
            <option value="__new__">Create new party...</option>
          </select>
        ) : (
          <div className="flex flex-col gap-2">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Name"
              className="w-full rounded-btn border border-border px-3 py-2 text-sm"
            />
            <input
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              placeholder="Phone"
              className="w-full rounded-btn border border-border px-3 py-2 text-sm"
            />
            <button
              className="text-xs font-semibold text-primary"
              onClick={() => setCreatingParty(false)}
            >
              ← Back to list
            </button>
          </div>
        )}
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="mb-2 block text-xs font-semibold text-text2">Category</label>
        <select
          className="w-full rounded-btn border border-border px-3 py-2 text-sm text-text1"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>Select category...</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Note */}
      <div className="mb-4">
        <label className="mb-2 block text-xs font-semibold text-text2">Note (optional)</label>
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note"
          className="w-full rounded-btn border border-border px-3 py-2 text-sm"
        />
      </div>

      {/* Date */}
      <div className="mb-5">
        <label className="mb-2 block text-xs font-semibold text-text2">Date</label>
        <button className="w-full rounded-btn border border-border px-3 py-2 text-left text-sm text-text1">
          Today ▼
        </button>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 rounded-btn border border-border py-3 text-sm font-semibold text-text2"
        >
          Cancel
        </button>
        <button
          onClick={save}
          className="flex-[2] rounded-btn bg-primary py-3 text-sm font-semibold text-white"
          style={{ height: 52 }}
        >
          Save Entry
        </button>
      </div>
    </BottomSheet>
  );
}
