// src/mockData.js
export const currentUser = { name: "Ansh", initials: "A" };

export const wallets = [
  { id: "w1", name: "Cash – Araria", type: "cash", balance: 47500 },
  { id: "w2", name: "SBI – Main",    type: "bank", balance: 182300 },
  { id: "w3", name: "Cash – Shop",   type: "cash", balance: 12800 },
  { id: "w4", name: "HDFC – Papa",   type: "bank", balance: 63000 },
];

export const parties = [
  { id: "p1", name: "Manoj Kumar",    phone: "9876543210", netBalance: 45000,  youOwe: false }, // he owes you
  { id: "p2", name: "Ramesh Thakur",  phone: "9123456789", netBalance: -18000, youOwe: true  }, // you owe him
  { id: "p3", name: "Suresh Builders",phone: "9988776655", netBalance: 120000, youOwe: false },
  { id: "p4", name: "Lalan Yadav",    phone: "9654321098", netBalance: -7500,  youOwe: true  },
  { id: "p5", name: "Govt – NHAI",    phone: null,          netBalance: 340000, youOwe: false },
];

export const projects = [
  {
    id: "pr1",
    name: "NH-57 Road Repair, Araria",
    contractValue: 2500000,
    received: 1600000,
    spent: 980000,
    advancesOut: 300000,
    status: "ongoing",
    startDate: "2024-11-01",
  },
  {
    id: "pr2",
    name: "Bridge Repair – Forbesganj",
    contractValue: 800000,
    received: 800000,
    spent: 710000,
    advancesOut: 0,
    status: "completed",
    startDate: "2024-06-15",
  },
  {
    id: "pr3",
    name: "Drain Work – Araria Town",
    contractValue: 450000,
    received: 0,
    spent: 85000,
    advancesOut: 50000,
    status: "payment_pending",
    startDate: "2025-02-10",
  },
];

export const categories = [
  "Material", "Labour", "Fuel", "Transport", "Machinery Hire",
  "Government Fees", "Food", "Travel", "Medical", "Shop Stock",
  "Rent", "Electricity", "Salary", "Personal", "Misc",
];

export const transactions = [
  { id: "t1",  date: "2025-07-15", type: "received", amount: 400000, book: "project", party: "Govt – NHAI",     category: "Government Payment", note: "2nd installment NH-57",  enteredBy: "Papa"  },
  { id: "t2",  date: "2025-07-14", type: "paid",     amount: 85000,  book: "project", party: "Manoj Kumar",    category: "Labour",              note: "Labour bill week 3",    enteredBy: "Ansh"  },
  { id: "t3",  date: "2025-07-13", type: "lent",     amount: 15000,  book: "lending", party: "Lalan Yadav",    category: "Personal",            note: "Medical emergency",     enteredBy: "Mummy" },
  { id: "t4",  date: "2025-07-12", type: "paid",     amount: 2200,   book: "personal",party: null,             category: "Food",                note: "Grocery – week",        enteredBy: "Mummy" },
  { id: "t5",  date: "2025-07-12", type: "paid",     amount: 45000,  book: "project", party: "Suresh Builders",category: "Material",            note: "Gravel – 50 truckload", enteredBy: "Papa"  },
  { id: "t6",  date: "2025-07-11", type: "received", amount: 8500,   book: "shop",    party: null,             category: "Shop Stock",          note: "Daily sales",           enteredBy: "Papa"  },
  { id: "t7",  date: "2025-07-10", type: "borrowed", amount: 50000,  book: "lending", party: "Ramesh Thakur",  category: "Personal",            note: "Short term",            enteredBy: "Papa"  },
  { id: "t8",  date: "2025-07-09", type: "paid",     amount: 12000,  book: "project", party: null,             category: "Fuel",                note: "JCB fuel – NH57",       enteredBy: "Ansh"  },
  { id: "t9",  date: "2025-07-08", type: "received", amount: 5000,   book: "personal",party: "Manoj Kumar",    category: "Personal",            note: "Old return",            enteredBy: "Papa"  },
  { id: "t10", date: "2025-07-07", type: "paid",     amount: 3500,   book: "personal",party: null,             category: "Travel",              note: "Patna–Araria bus",      enteredBy: "Ansh"  },
];
