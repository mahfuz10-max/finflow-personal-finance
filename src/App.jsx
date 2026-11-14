import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Wallet, TrendingUp, TrendingDown, Plus, Search, Filter, Download, Upload,
  Sun, Moon, LogOut, Eye, EyeOff, Trash2, Edit3, Check, X, AlertTriangle,
  PieChart as PieChartIcon, BarChart3, Activity, Settings, CreditCard,
  Smartphone, Landmark, Banknote, Calendar, ArrowUpRight, ArrowDownRight,
  Briefcase, GraduationCap, Gift, ShoppingBag, Utensils, Car, Wifi, Home,
  Cpu, HeartPulse, MoreHorizontal, Sparkles, RefreshCw, ShieldCheck,
  UserCheck, ChevronDown, Bell, HelpCircle, Layers, FileText, CheckCircle2,
  FolderOpen, Lock, Mail, User, ArrowRightLeft, DollarSign, Zap, Printer,
  Users, HandCoins, Coffee
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

// ============================================================================
// 1. BRAND LOGO COMPONENT (Exact SVG Specification)
// ============================================================================
export const FinFlowLogo = ({ size = 38, className = '', showText = false, textClass = '' }) => (
  <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      width={size}
      height={size}
      className="shrink-0 drop-shadow-sm transition-transform duration-300 hover:scale-105"
    >
      <defs>
        <linearGradient id="finflowGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10B981" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#finflowGrad)" />
      <rect x="14" y="18" width="36" height="28" rx="6" fill="#F8FAFC" />
      <path d="M14 24C14 20.6863 16.6863 18 20 18H44C47.3137 18 50 20.6863 50 24V27H14V24Z" fill="#D1FAE5" />
      <rect x="36" y="28" width="14" height="11" rx="3.5" fill="#10B981" />
      <circle cx="43" cy="33.5" r="2" fill="#FFFFFF" />
      <path
        d="M19 37L26 30L31 35L39 26"
        stroke="#10B981"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    {showText && (
      <span className={`font-extrabold tracking-tight text-xl leading-none ${textClass}`}>
        Fin<span className="text-emerald-500">Flow</span>
      </span>
    )}
  </div>
);

// ============================================================================
// 2. CATEGORIES, PAYMENT METHODS, QUICK CHIPS & CURRENCY CONFIG
// ============================================================================
const INCOME_CATEGORIES = [
  { id: 'Salary', label: 'Salary', icon: Briefcase, color: '#10B981' },
  { id: 'Freelancing', label: 'Freelancing', icon: Cpu, color: '#059669' },
  { id: 'Business', label: 'Business', icon: TrendingUp, color: '#0D9488' },
  { id: 'Tuition', label: 'Tuition', icon: GraduationCap, color: '#14B8A6' },
  { id: 'Gift/Bonus', label: 'Gift/Bonus', icon: Gift, color: '#34D399' },
  { id: 'Investment', label: 'Investment', icon: Landmark, color: '#2DD4BF' },
  { id: 'Others', label: 'Others', icon: MoreHorizontal, color: '#6EE7B7' },
];

const EXPENSE_CATEGORIES = [
  { id: 'Food & Dining', label: 'Food & Dining', icon: Utensils, color: '#F43F5E' },
  { id: 'Transport/Ride', label: 'Transport/Ride', icon: Car, color: '#FB923C' },
  { id: 'University/Education', label: 'University/Education', icon: GraduationCap, color: '#8B5CF6' },
  { id: 'Shopping', label: 'Shopping', icon: ShoppingBag, color: '#EC4899' },
  { id: 'Mobile & Internet', label: 'Mobile & Internet', icon: Wifi, color: '#3B82F6' },
  { id: 'Rent/Bills', label: 'Rent/Bills', icon: Home, color: '#EAB308' },
  { id: 'Tech & Gadgets', label: 'Tech & Gadgets', icon: Cpu, color: '#06B6D4' },
  { id: 'Health', label: 'Health', icon: HeartPulse, color: '#EF4444' },
  { id: 'Others', label: 'Others', icon: MoreHorizontal, color: '#64748B' },
];

const PAYMENT_METHODS = [
  { id: 'Cash', label: 'Cash', icon: Banknote, badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20', color: '#10B981', limitText: 'Physical Wallet' },
  { id: 'bKash', label: 'bKash', icon: Smartphone, badgeBg: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20', color: '#E2136E', limitText: 'Mobile Wallet' },
  { id: 'Nagad', label: 'Nagad', icon: Smartphone, badgeBg: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20', color: '#F7941D', limitText: 'Mobile Wallet' },
  { id: 'Rocket', label: 'Rocket', icon: Smartphone, badgeBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20', color: '#8C3494', limitText: 'DBBL Mobile' },
  { id: 'Bank Transfer', label: 'Bank Transfer', icon: Landmark, badgeBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20', color: '#3B82F6', limitText: 'NPSB / EFTN' },
  { id: 'Card', label: 'Card', icon: CreditCard, badgeBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20', color: '#6366F1', limitText: 'Visa / Mastercard' },
];

// Quick 1-Tap Presets for Instant Logging
const QUICK_PRESETS = [
  { id: 'qp_1', title: 'Tea & Snacks', amount: 60, type: 'expense', category: 'Food & Dining', paymentMethod: 'Cash', icon: Coffee },
  { id: 'qp_2', title: 'Rickshaw / Ride', amount: 120, type: 'expense', category: 'Transport/Ride', paymentMethod: 'bKash', icon: Car },
  { id: 'qp_3', title: 'Daily Lunch', amount: 220, type: 'expense', category: 'Food & Dining', paymentMethod: 'Cash', icon: Utensils },
  { id: 'qp_4', title: 'Mobile Data Pack', amount: 299, type: 'expense', category: 'Mobile & Internet', paymentMethod: 'bKash', icon: Wifi },
  { id: 'qp_5', title: 'Freelance Quick Task', amount: 2500, type: 'income', category: 'Freelancing', paymentMethod: 'bKash', icon: Zap },
];

const CURRENCIES = {
  BDT: { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka (৳ BDT)', flag: '🇧🇩' },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar ($ USD)', flag: '🇺🇸' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro (€ EUR)', flag: '🇪🇺' },
};

// Safe LocalStorage Helper
const safeStorage = {
  get: (key, fallback) => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (e) {
      return fallback;
    }
  },
  set: (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // Ignore storage quota errors in sandboxed preview
    }
  },
  remove: (key) => {
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      // Ignore error
    }
  }
};

// Format Date Helpers
const getTodayStr = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const getOffsetDateStr = (daysAgo) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const getCurrentTimeStr = () => {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
};

// Generate Realistic Demo Transactions Scoped to User
const generateDemoTransactions = (userId) => [
  {
    id: `tx_${userId}_1`,
    type: 'income',
    title: 'Full-Stack Web App Milestone (Fiverr)',
    amount: 42500,
    category: 'Freelancing',
    paymentMethod: 'Bank Transfer',
    date: getTodayStr(),
    time: '10:30',
    notes: 'Client project milestone payout via Payoneer to BRAC Bank',
  },
  {
    id: `tx_${userId}_2`,
    type: 'expense',
    title: 'Daily Breakfast & Cold Coffee',
    amount: 420,
    category: 'Food & Dining',
    paymentMethod: 'bKash',
    date: getTodayStr(),
    time: '09:15',
    notes: 'Paratha, omelette & iced latte near Niketan',
  },
  {
    id: `tx_${userId}_3`,
    type: 'expense',
    title: 'Uber Moto Ride to Campus',
    amount: 260,
    category: 'Transport/Ride',
    paymentMethod: 'Nagad',
    date: getTodayStr(),
    time: '08:30',
    notes: 'Morning commute to Southeast University',
  },
  {
    id: `tx_${userId}_4`,
    type: 'income',
    title: 'ICT & Programming Tuition Batch',
    amount: 12000,
    category: 'Tuition',
    paymentMethod: 'bKash',
    date: getOffsetDateStr(1),
    time: '19:45',
    notes: 'Monthly honorarium for HSC C++ & Web Design mentoring',
  },
  {
    id: `tx_${userId}_5`,
    type: 'expense',
    title: 'High-Speed Fiber Internet & Mobile Data',
    amount: 1650,
    category: 'Mobile & Internet',
    paymentMethod: 'bKash',
    date: getOffsetDateStr(1),
    time: '14:20',
    notes: '50 Mbps broadband bill + 30GB backup 4G pack',
  },
  {
    id: `tx_${userId}_6`,
    type: 'expense',
    title: 'Apartment Shared Rent & Utilities',
    amount: 9500,
    category: 'Rent/Bills',
    paymentMethod: 'Bank Transfer',
    date: getOffsetDateStr(2),
    time: '11:00',
    notes: 'Monthly room rent, electricity & service charge',
  },
  {
    id: `tx_${userId}_7`,
    type: 'income',
    title: 'UI/UX Dashboard Template Sale',
    amount: 18500,
    category: 'Business',
    paymentMethod: 'Card',
    date: getOffsetDateStr(3),
    time: '16:10',
    notes: 'React + Tailwind SaaS kit license payout',
  },
  {
    id: `tx_${userId}_8`,
    type: 'expense',
    title: 'Mechanical Keyboard Switches & NVMe Enclosure',
    amount: 3800,
    category: 'Tech & Gadgets',
    paymentMethod: 'Card',
    date: getOffsetDateStr(3),
    time: '18:05',
    notes: 'Purchased from Star Tech Panthapath branch',
  },
  {
    id: `tx_${userId}_9`,
    type: 'expense',
    title: 'Semester Lab Manual & IEEE Workshop Fee',
    amount: 2400,
    category: 'University/Education',
    paymentMethod: 'Rocket',
    date: getOffsetDateStr(4),
    time: '12:30',
    notes: 'CSE443 Graphics lab printouts + AI seminar registration',
  },
  {
    id: `tx_${userId}_10`,
    type: 'expense',
    title: 'Kacchi Biryani Dinner with Friends',
    amount: 1850,
    category: 'Food & Dining',
    paymentMethod: 'Cash',
    date: getOffsetDateStr(5),
    time: '21:15',
    notes: 'Sultan’s Dine Gulshan branch treat',
  },
  {
    id: `tx_${userId}_11`,
    type: 'income',
    title: 'Monthly Junior Dev Retainer',
    amount: 35000,
    category: 'Salary',
    paymentMethod: 'Bank Transfer',
    date: getOffsetDateStr(6),
    time: '10:00',
    notes: 'Part-time remote frontend engineering retainer',
  },
  {
    id: `tx_${userId}_12`,
    type: 'expense',
    title: 'Skincare & Personal Grooming Essentials',
    amount: 1950,
    category: 'Shopping',
    paymentMethod: 'bKash',
    date: getOffsetDateStr(6),
    time: '17:40',
    notes: 'Hydrating gel moisturizer & daily essentials',
  },
];

const generateDemoDues = (userId) => [
  {
    id: `due_${userId}_1`,
    person: 'Tanvir Ahmed (Mess Mate)',
    type: 'lent', // 'lent' = I will get money back (পাওনা), 'borrowed' = I owe money (দেনা)
    amount: 1500,
    paymentMethod: 'bKash',
    dueDate: getOffsetDateStr(-3),
    note: 'Shared Wi-Fi & utility bill split',
    settled: false,
  },
  {
    id: `due_${userId}_2`,
    person: 'Rafiqul Islam (Course Lab Partner)',
    type: 'borrowed',
    amount: 650,
    paymentMethod: 'Cash',
    dueDate: getOffsetDateStr(-2),
    note: 'Hardware sensor components for project',
    settled: false,
  },
];

// ============================================================================
// 3. MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  // --------------------------------------------------------------------------
  // AUTHENTICATION & MULTI-USER ISOLATION STATE
  // --------------------------------------------------------------------------
  const [users, setUsers] = useState(() => {
    const saved = safeStorage.get('finflow_users_v1', null);
    if (saved && Array.isArray(saved) && saved.length > 0) return saved;
    const initialUsers = [
      {
        id: 'usr_mahfuz_01',
        fullName: 'Mustafizur Rahman Mahfuz',
        username: 'mahfuz',
        email: 'mr.mahfuz.me@gmail.com',
        password: 'password123',
        role: 'Full-Stack Developer',
        createdAt: '2026-10-01'
      },
      {
        id: 'usr_sajibur_02',
        fullName: 'Sajibur Rahman',
        username: 'sajibur',
        email: 'sajibur.rahman@gmail.com',
        password: 'password123',
        role: 'Product Designer',
        createdAt: '2026-10-15'
      }
    ];
    safeStorage.set('finflow_users_v1', initialUsers);
    if (!safeStorage.get('finflow_transactions_usr_mahfuz_01', null)) {
      safeStorage.set('finflow_transactions_usr_mahfuz_01', generateDemoTransactions('usr_mahfuz_01'));
    }
    if (!safeStorage.get('finflow_dues_usr_mahfuz_01', null)) {
      safeStorage.set('finflow_dues_usr_mahfuz_01', generateDemoDues('usr_mahfuz_01'));
    }
    if (!safeStorage.get('finflow_budget_usr_mahfuz_01', null)) {
      safeStorage.set('finflow_budget_usr_mahfuz_01', {
        monthlyLimit: 35000,
        currency: 'BDT',
        theme: 'light'
      });
    }
    if (!safeStorage.get('finflow_transactions_usr_sajibur_02', null)) {
      safeStorage.set('finflow_transactions_usr_sajibur_02', [
        {
          id: 'tx_sajibur_1',
          type: 'income',
          title: 'Design System Retainer (Figma)',
          amount: 68000,
          category: 'Salary',
          paymentMethod: 'Bank Transfer',
          date: getTodayStr(),
          time: '11:00',
          notes: 'UI/UX design lead monthly payout'
        },
        {
          id: 'tx_sajibur_2',
          type: 'expense',
          title: 'Adobe Creative Cloud & Figma Pro',
          amount: 4500,
          category: 'Tech & Gadgets',
          paymentMethod: 'Card',
          date: getTodayStr(),
          time: '13:20',
          notes: 'Monthly design subscription renewal'
        }
      ]);
    }
    if (!safeStorage.get('finflow_budget_usr_sajibur_02', null)) {
      safeStorage.set('finflow_budget_usr_sajibur_02', {
        monthlyLimit: 50000,
        currency: 'BDT',
        theme: 'light'
      });
    }
    return initialUsers;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    return safeStorage.get('finflow_active_session_v1', users[0] || null);
  });

  // Auth Screen Form State
  const [authMode, setAuthMode] = useState('login');
  const [authFullName, setAuthFullName] = useState('');
  const [authIdentifier, setAuthIdentifier] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authConfirmPassword, setAuthConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // --------------------------------------------------------------------------
  // STRICT PER-USER DATA ISOLATION (SCOPED BY currentUser.id)
  // --------------------------------------------------------------------------
  const [transactions, setTransactions] = useState([]);
  const [dues, setDues] = useState([]);
  const [userSettings, setUserSettings] = useState({
    monthlyLimit: 35000,
    currency: 'BDT',
    theme: 'light'
  });

  useEffect(() => {
    if (!currentUser) {
      setTransactions([]);
      setDues([]);
      return;
    }
    const txKey = `finflow_transactions_${currentUser.id}`;
    const dueKey = `finflow_dues_${currentUser.id}`;
    const budgetKey = `finflow_budget_${currentUser.id}`;

    const loadedTx = safeStorage.get(txKey, []);
    const loadedDues = safeStorage.get(dueKey, []);
    const loadedBudget = safeStorage.get(budgetKey, {
      monthlyLimit: 35000,
      currency: 'BDT',
      theme: 'light'
    });

    setTransactions(Array.isArray(loadedTx) ? loadedTx : []);
    setDues(Array.isArray(loadedDues) ? loadedDues : []);
    setUserSettings({
      monthlyLimit: Number(loadedBudget?.monthlyLimit) || 35000,
      currency: loadedBudget?.currency || 'BDT',
      theme: loadedBudget?.theme || 'light'
    });
    safeStorage.set('finflow_active_session_v1', currentUser);
  }, [currentUser]);

  const updateTransactionsForUser = (newTxList) => {
    if (!currentUser) return;
    setTransactions(newTxList);
    safeStorage.set(`finflow_transactions_${currentUser.id}`, newTxList);
  };

  const updateDuesForUser = (newDueList) => {
    if (!currentUser) return;
    setDues(newDueList);
    safeStorage.set(`finflow_dues_${currentUser.id}`, newDueList);
  };

  const updateSettingsForUser = (partialSettings) => {
    if (!currentUser) return;
    const updated = { ...userSettings, ...partialSettings };
    setUserSettings(updated);
    safeStorage.set(`finflow_budget_${currentUser.id}`, updated);
  };

  // --------------------------------------------------------------------------
  // UI NAVIGATION, MODALS & TOASTS
  // --------------------------------------------------------------------------
  // Simplified Single Top Pill Navigation: 'Overview' | 'Activity' | 'Analytics' | 'Wallets & Dues' | 'Settings'
  const [activeTab, setActiveTab] = useState('Overview');
  const [isTxModalOpen, setIsTxModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isDueModalOpen, setIsDueModalOpen] = useState(false);
  const [isStatementModalOpen, setIsStatementModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false); // Collapsible Filter Panel
  const [editingTxId, setEditingTxId] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [toast, setToast] = useState(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((prev) => (prev && Date.now() - prev.id >= 2900 ? null : prev));
    }, 3000);
  };

  // --------------------------------------------------------------------------
  // TRANSACTION MODAL FORM STATE & QUICK 1-TAP HANDLER
  // --------------------------------------------------------------------------
  const [txType, setTxType] = useState('expense');
  const [txTitle, setTxTitle] = useState('');
  const [txAmount, setTxAmount] = useState('');
  const [txCategory, setTxCategory] = useState('Food & Dining');
  const [txPaymentMethod, setTxPaymentMethod] = useState('bKash');
  const [txDate, setTxDate] = useState(getTodayStr());
  const [txTime, setTxTime] = useState(getCurrentTimeStr());
  const [txNotes, setTxNotes] = useState('');
  const [txFormError, setTxFormError] = useState('');

  // Wallet-to-Wallet Transfer Form State
  const [transferFrom, setTransferFrom] = useState('Bank Transfer');
  const [transferTo, setTransferTo] = useState('bKash');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferNote, setTransferNote] = useState('');
  const [transferError, setTransferError] = useState('');

  // Lent / Borrowed (Due Tracker) Form State
  const [duePerson, setDuePerson] = useState('');
  const [dueType, setDueType] = useState('lent'); // 'lent' (পাওনা) | 'borrowed' (দেনা)
  const [dueAmount, setDueAmount] = useState('');
  const [dueMethod, setDueMethod] = useState('bKash');
  const [dueDateVal, setDueDateVal] = useState(getTodayStr());
  const [dueNote, setDueNote] = useState('');
  const [dueError, setDueError] = useState('');

  const openAddTransactionModal = (defaultType = 'expense') => {
    setEditingTxId(null);
    setTxType(defaultType);
    setTxTitle('');
    setTxAmount('');
    setTxCategory(defaultType === 'income' ? 'Salary' : 'Food & Dining');
    setTxPaymentMethod('bKash');
    setTxDate(getTodayStr());
    setTxTime(getCurrentTimeStr());
    setTxNotes('');
    setTxFormError('');
    setIsTxModalOpen(true);
  };

  const openEditTransactionModal = (tx) => {
    setEditingTxId(tx.id);
    setTxType(tx.type);
    setTxTitle(tx.title);
    setTxAmount(String(tx.amount));
    setTxCategory(tx.category);
    setTxPaymentMethod(tx.paymentMethod);
    setTxDate(tx.date);
    setTxTime(tx.time || '12:00');
    setTxNotes(tx.notes || '');
    setTxFormError('');
    setIsTxModalOpen(true);
  };

  const handleTxTypeSwitch = (newType) => {
    setTxType(newType);
    const validList = newType === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    if (!validList.some((c) => c.id === txCategory)) {
      setTxCategory(validList[0].id);
    }
  };

  const handleSaveTransaction = (e) => {
    e.preventDefault();
    const trimmedTitle = txTitle.trim();
    const numericAmount = parseFloat(txAmount);

    if (!trimmedTitle) {
      setTxFormError('Please enter a transaction title or particulars.');
      return;
    }
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setTxFormError('Please enter a valid positive amount.');
      return;
    }
    if (!txDate) {
      setTxFormError('Please select a valid date.');
      return;
    }

    const payload = {
      id: editingTxId || `tx_${currentUser.id}_${Date.now()}`,
      type: txType,
      title: trimmedTitle,
      amount: Math.round(numericAmount * 100) / 100,
      category: txCategory,
      paymentMethod: txPaymentMethod,
      date: txDate,
      time: txTime || '12:00',
      notes: txNotes.trim(),
    };

    if (editingTxId) {
      const updated = transactions.map((t) => (t.id === editingTxId ? payload : t));
      updateTransactionsForUser(updated);
      showToast(`Updated "${payload.title}"`);
    } else {
      const updated = [payload, ...transactions];
      updateTransactionsForUser(updated);
      showToast(`Added ${payload.type === 'income' ? 'Income' : 'Expense'}: "${payload.title}"`);
    }

    setIsTxModalOpen(false);
  };

  // 1-Tap Instant Entry Handler
  const handleQuickPresetAdd = (preset) => {
    const newTx = {
      id: `tx_${currentUser.id}_${Date.now()}`,
      type: preset.type,
      title: preset.title,
      amount: preset.amount,
      category: preset.category,
      paymentMethod: preset.paymentMethod,
      date: getTodayStr(),
      time: getCurrentTimeStr(),
      notes: 'Logged via 1-Tap Quick Entry',
    };
    updateTransactionsForUser([newTx, ...transactions]);
    showToast(`Quick added: ${preset.title} (${currencySymbol}${preset.amount})`);
  };

  // Wallet-to-Wallet Transfer Handler (Creates paired outflow & inflow records so net balance stays exact while shifting wallet balances)
  const handleWalletTransferSubmit = (e) => {
    e.preventDefault();
    setTransferError('');
    const amt = parseFloat(transferAmount);
    if (!transferFrom || !transferTo || transferFrom === transferTo) {
      setTransferError('Please choose two different wallets (e.g., Bank Transfer to bKash).');
      return;
    }
    if (isNaN(amt) || amt <= 0) {
      setTransferError('Please enter a valid transfer amount.');
      return;
    }

    const nowTs = Date.now();
    const today = getTodayStr();
    const time = getCurrentTimeStr();
    const outTx = {
      id: `tx_${currentUser.id}_tr_out_${nowTs}`,
      type: 'expense',
      title: `Transfer to ${transferTo}`,
      amount: amt,
      category: 'Others',
      paymentMethod: transferFrom,
      date: today,
      time,
      notes: transferNote.trim() || `Internal wallet transfer: ${transferFrom} → ${transferTo}`,
      isTransfer: true,
    };
    const inTx = {
      id: `tx_${currentUser.id}_tr_in_${nowTs + 1}`,
      type: 'income',
      title: `Transfer from ${transferFrom}`,
      amount: amt,
      category: 'Others',
      paymentMethod: transferTo,
      date: today,
      time,
      notes: transferNote.trim() || `Internal wallet transfer: ${transferFrom} → ${transferTo}`,
      isTransfer: true,
    };

    updateTransactionsForUser([inTx, outTx, ...transactions]);
    setTransferAmount('');
    setTransferNote('');
    setIsTransferModalOpen(false);
    showToast(`Transferred ${currencySymbol}${amt.toLocaleString()} from ${transferFrom} to ${transferTo}`);
  };

  // Save Lent / Borrowed Due Entry
  const handleAddDueSubmit = (e) => {
    e.preventDefault();
    setDueError('');
    const person = duePerson.trim();
    const amt = parseFloat(dueAmount);
    if (!person) {
      setDueError('Please enter the person or friend name.');
      return;
    }
    if (isNaN(amt) || amt <= 0) {
      setDueError('Please enter a valid positive amount.');
      return;
    }
    const newDue = {
      id: `due_${currentUser.id}_${Date.now()}`,
      person,
      type: dueType, // 'lent' or 'borrowed'
      amount: amt,
      paymentMethod: dueMethod,
      dueDate: dueDateVal || getTodayStr(),
      note: dueNote.trim(),
      settled: false,
    };
    updateDuesForUser([newDue, ...dues]);
    setDuePerson('');
    setDueAmount('');
    setDueNote('');
    setIsDueModalOpen(false);
    showToast(`Recorded ${dueType === 'lent' ? 'Receivable (পাওনা)' : 'Payable (দেনা)'} for ${person}`);
  };

  // Settle a Due item and optionally log it into transactions
  const handleSettleDue = (dueItem) => {
    const updatedDues = dues.map((d) =>
      d.id === dueItem.id ? { ...d, settled: !d.settled } : d
    );
    updateDuesForUser(updatedDues);

    if (!dueItem.settled) {
      // Automatically create a corresponding settled transaction
      const autoTx = {
        id: `tx_${currentUser.id}_due_${Date.now()}`,
        type: dueItem.type === 'lent' ? 'income' : 'expense',
        title:
          dueItem.type === 'lent'
            ? `Due Received from ${dueItem.person}`
            : `Due Paid to ${dueItem.person}`,
        amount: dueItem.amount,
        category: 'Others',
        paymentMethod: dueItem.paymentMethod || 'bKash',
        date: getTodayStr(),
        time: getCurrentTimeStr(),
        notes: dueItem.note ? `Settled due: ${dueItem.note}` : 'Settled from Due/Split Tracker',
      };
      updateTransactionsForUser([autoTx, ...transactions]);
      showToast(`Marked settled & updated ${dueItem.paymentMethod} balance!`);
    } else {
      showToast(`Re-opened due record for ${dueItem.person}`, 'info');
    }
  };

  const handleDeleteDue = (id) => {
    updateDuesForUser(dues.filter((d) => d.id !== id));
    showToast('Removed due record', 'info');
  };

  const handleDeleteTransaction = (tx) => {
    setConfirmDialog({
      title: 'Delete Transaction?',
      message: `Are you sure you want to permanently remove "${tx.title}" (${currencySymbol}${tx.amount.toLocaleString()}) from your records?`,
      confirmLabel: 'Delete Record',
      danger: true,
      onConfirm: () => {
        const updated = transactions.filter((item) => item.id !== tx.id);
        updateTransactionsForUser(updated);
        setConfirmDialog(null);
        showToast(`Deleted "${tx.title}"`, 'info');
      }
    });
  };

  // --------------------------------------------------------------------------
  // CHART & TABLE FILTER STATES
  // --------------------------------------------------------------------------
  const [barChartTimeframe, setBarChartTimeframe] = useState('monthly'); // Default to clean Monthly view like Finexy
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterPayment, setFilterPayment] = useState('All');
  const [filterDateRange, setFilterDateRange] = useState('All Time');
  const [sortBy, setSortBy] = useState('date-desc');

  const fileInputRef = useRef(null);

  // --------------------------------------------------------------------------
  // AUTHENTICATION HANDLERS
  // --------------------------------------------------------------------------
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setAuthError('');
    const identifier = authIdentifier.trim().toLowerCase();
    if (!identifier || !authPassword) {
      setAuthError('Please enter both your Email/Username and Password.');
      return;
    }

    const matchedUser = users.find(
      (u) =>
        (u.email.toLowerCase() === identifier || u.username.toLowerCase() === identifier) &&
        u.password === authPassword
    );

    if (!matchedUser) {
      setAuthError('Invalid credentials. Please check your Email/Username and Password.');
      return;
    }

    setCurrentUser(matchedUser);
    setAuthIdentifier('');
    setAuthPassword('');
    showToast(`Welcome back, ${matchedUser.fullName.split(' ')[0]}!`);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setAuthError('');

    const cleanName = authFullName.trim();
    const cleanEmail = authEmail.trim().toLowerCase();
    const cleanUsername = authIdentifier.trim().toLowerCase() || cleanEmail.split('@')[0];

    if (!cleanName || !cleanEmail || !authPassword || !authConfirmPassword) {
      setAuthError('All fields are required to create a secure FinFlow account.');
      return;
    }
    if (!cleanEmail.includes('@')) {
      setAuthError('Please enter a valid email address.');
      return;
    }
    if (authPassword.length < 6) {
      setAuthError('Password must be at least 6 characters long.');
      return;
    }
    if (authPassword !== authConfirmPassword) {
      setAuthError('Passwords do not match. Please confirm your password.');
      return;
    }

    const exists = users.some(
      (u) => u.email.toLowerCase() === cleanEmail || u.username.toLowerCase() === cleanUsername
    );
    if (exists) {
      setAuthError('An account with that email or username already exists.');
      return;
    }

    const newUserId = `usr_${Date.now()}`;
    const newUser = {
      id: newUserId,
      fullName: cleanName,
      username: cleanUsername,
      email: cleanEmail,
      password: authPassword,
      role: 'Personal Account',
      createdAt: getTodayStr(),
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    safeStorage.set('finflow_users_v1', updatedUsers);

    safeStorage.set(`finflow_transactions_${newUserId}`, []);
    safeStorage.set(`finflow_dues_${newUserId}`, []);
    safeStorage.set(`finflow_budget_${newUserId}`, {
      monthlyLimit: 30000,
      currency: 'BDT',
      theme: userSettings.theme || 'light',
    });

    setCurrentUser(newUser);
    setAuthFullName('');
    setAuthEmail('');
    setAuthIdentifier('');
    setAuthPassword('');
    setAuthConfirmPassword('');
    showToast(`Account created for ${cleanName}! Your workspace is 100% private.`);
  };

  const handleLogout = () => {
    setIsProfileMenuOpen(false);
    safeStorage.remove('finflow_active_session_v1');
    setCurrentUser(null);
    setAuthMode('login');
    setAuthError('');
  };

  const handleQuickSwitchUser = (targetUser) => {
    setIsProfileMenuOpen(false);
    setCurrentUser(targetUser);
    showToast(`Switched to ${targetUser.fullName}'s isolated workspace`);
  };

  // --------------------------------------------------------------------------
  // COMPUTED FINANCIAL ANALYTICS & KPIS
  // --------------------------------------------------------------------------
  const currencyObj = CURRENCIES[userSettings.currency] || CURRENCIES.BDT;
  const currencySymbol = currencyObj.symbol;
  const isDark = userSettings.theme === 'dark';

  const kpiMetrics = useMemo(() => {
    const todayStr = getTodayStr();
    const currentMonthPrefix = todayStr.slice(0, 7);

    const now = new Date();
    const prevMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const prevMonthPrefix = `${prevMonthDate.getFullYear()}-${String(prevMonthDate.getMonth() + 1).padStart(2, '0')}`;

    let totalIncome = 0;
    let totalExpense = 0;
    let todayIncome = 0;
    let todayExpense = 0;
    let monthIncome = 0;
    let monthIncomeCount = 0;
    let monthExpense = 0;
    let monthExpenseCount = 0;
    let prevMonthIncome = 0;

    transactions.forEach((tx) => {
      // Exclude internal wallet-to-wallet transfers from global income/expense totals so they don't artificially inflate spending
      const isInternalTransfer = Boolean(tx.isTransfer);
      const amt = Number(tx.amount) || 0;
      if (tx.type === 'income') {
        if (!isInternalTransfer) totalIncome += amt;
        if (tx.date === todayStr && !isInternalTransfer) todayIncome += amt;
        if (tx.date && tx.date.startsWith(currentMonthPrefix) && !isInternalTransfer) {
          monthIncome += amt;
          monthIncomeCount += 1;
        }
        if (tx.date && tx.date.startsWith(prevMonthPrefix) && !isInternalTransfer) {
          prevMonthIncome += amt;
        }
      } else {
        if (!isInternalTransfer) totalExpense += amt;
        if (tx.date === todayStr && !isInternalTransfer) todayExpense += amt;
        if (tx.date && tx.date.startsWith(currentMonthPrefix) && !isInternalTransfer) {
          monthExpense += amt;
          monthExpenseCount += 1;
        }
      }
    });

    const netBalance = totalIncome - totalExpense;
    const budgetLimit = Math.max(1, Number(userSettings.monthlyLimit) || 35000);
    const budgetUsedPercent = Math.min(999, Math.round((monthExpense / budgetLimit) * 1000) / 10);

    let incomeGrowthPercent = 8.4;
    if (prevMonthIncome > 0) {
      incomeGrowthPercent = Math.round(((monthIncome - prevMonthIncome) / prevMonthIncome) * 1000) / 10;
    } else if (monthIncome > 0) {
      incomeGrowthPercent = 12.5;
    } else {
      incomeGrowthPercent = 0;
    }

    const totalLentPending = dues
      .filter((d) => !d.settled && d.type === 'lent')
      .reduce((acc, d) => acc + (Number(d.amount) || 0), 0);
    const totalBorrowedPending = dues
      .filter((d) => !d.settled && d.type === 'borrowed')
      .reduce((acc, d) => acc + (Number(d.amount) || 0), 0);

    return {
      totalIncome,
      totalExpense,
      netBalance,
      todayIncome,
      todayExpense,
      monthIncome,
      monthIncomeCount,
      monthExpense,
      monthExpenseCount,
      budgetLimit,
      budgetUsedPercent,
      incomeGrowthPercent,
      totalLentPending,
      totalBorrowedPending,
    };
  }, [transactions, dues, userSettings.monthlyLimit]);

  // 1. Grouped Bar Chart Data (Daily Last 7 Days, Monthly, Yearly)
  const barChartData = useMemo(() => {
    if (barChartTimeframe === 'daily') {
      const days = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        const dateStr = `${yyyy}-${mm}-${dd}`;
        const label = d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });
        days.push({ key: dateStr, name: label, Income: 0, Expense: 0 });
      }
      const map = Object.fromEntries(days.map((d) => [d.key, d]));
      transactions.forEach((tx) => {
        if (!tx.isTransfer && map[tx.date]) {
          if (tx.type === 'income') map[tx.date].Income += Number(tx.amount) || 0;
          else map[tx.date].Expense += Number(tx.amount) || 0;
        }
      });
      return days;
    }

    if (barChartTimeframe === 'monthly') {
      const months = [];
      const now = new Date();
      for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        const label = d.toLocaleDateString('en-US', { month: 'short' });
        months.push({ key, name: label, Income: 0, Expense: 0 });
      }
      const map = Object.fromEntries(months.map((m) => [m.key, m]));
      transactions.forEach((tx) => {
        if (!tx.isTransfer) {
          const mKey = (tx.date || '').slice(0, 7);
          if (map[mKey]) {
            if (tx.type === 'income') map[mKey].Income += Number(tx.amount) || 0;
            else map[mKey].Expense += Number(tx.amount) || 0;
          }
        }
      });
      return months;
    }

    const currentYear = new Date().getFullYear();
    const years = [currentYear - 2, currentYear - 1, currentYear].map((yr) => ({
      key: String(yr),
      name: String(yr),
      Income: 0,
      Expense: 0,
    }));
    const map = Object.fromEntries(years.map((y) => [y.key, y]));
    transactions.forEach((tx) => {
      if (!tx.isTransfer) {
        const yKey = (tx.date || '').slice(0, 4);
        if (map[yKey]) {
          if (tx.type === 'income') map[yKey].Income += Number(tx.amount) || 0;
          else map[yKey].Expense += Number(tx.amount) || 0;
        }
      }
    });
    return years;
  }, [transactions, barChartTimeframe]);

  // 2. Expense by Category Donut Chart Data
  const expenseDonutData = useMemo(() => {
    const totals = {};
    let grandTotal = 0;
    transactions.forEach((tx) => {
      if (tx.type === 'expense' && !tx.isTransfer) {
        const amt = Number(tx.amount) || 0;
        totals[tx.category] = (totals[tx.category] || 0) + amt;
        grandTotal += amt;
      }
    });

    return EXPENSE_CATEGORIES.map((cat) => {
      const value = totals[cat.id] || 0;
      const percentage = grandTotal > 0 ? Math.round((value / grandTotal) * 1000) / 10 : 0;
      return {
        name: cat.label,
        value,
        percentage,
        color: cat.color,
      };
    })
      .filter((item) => item.value > 0)
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  // 3. Daily Cashflow Area Chart Data
  const cashflowAreaData = useMemo(() => {
    if (transactions.length === 0) {
      return [
        { date: 'Start', balance: 0, netChange: 0 },
        { date: 'Today', balance: 0, netChange: 0 },
      ];
    }

    const dailyDeltas = {};
    transactions.forEach((tx) => {
      if (!tx.isTransfer) {
        const d = tx.date || getTodayStr();
        const delta = tx.type === 'income' ? Number(tx.amount) : -Number(tx.amount);
        dailyDeltas[d] = (dailyDeltas[d] || 0) + delta;
      }
    });

    const sortedDates = Object.keys(dailyDeltas).sort();
    let runningBalance = 0;
    return sortedDates.map((dateStr) => {
      runningBalance += dailyDeltas[dateStr];
      const dObj = new Date(`${dateStr}T00:00:00`);
      const formattedLabel = isNaN(dObj.getTime())
        ? dateStr
        : dObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return {
        rawDate: dateStr,
        date: formattedLabel,
        balance: runningBalance,
        netChange: dailyDeltas[dateStr],
      };
    });
  }, [transactions]);

  // 4. Per-Wallet Separate Balance Tracking (Includes Internal Transfers)
  const walletBreakdown = useMemo(() => {
    const map = {};
    PAYMENT_METHODS.forEach((pm) => {
      map[pm.id] = { ...pm, income: 0, expense: 0, balance: 0, txCount: 0 };
    });
    transactions.forEach((tx) => {
      const target = map[tx.paymentMethod] || map['Cash'];
      if (target) {
        const amt = Number(tx.amount) || 0;
        if (tx.type === 'income') target.income += amt;
        else target.expense += amt;
        target.balance = target.income - target.expense;
        target.txCount += 1;
      }
    });
    return Object.values(map);
  }, [transactions]);

  // 5. Filtered & Sorted Transactions for Table
  const filteredTransactions = useMemo(() => {
    const todayStr = getTodayStr();
    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);
    const weekAgoStr = `${sevenDaysAgo.getFullYear()}-${String(sevenDaysAgo.getMonth() + 1).padStart(2, '0')}-${String(sevenDaysAgo.getDate()).padStart(2, '0')}`;
    const monthPrefix = todayStr.slice(0, 7);

    return transactions
      .filter((tx) => {
        if (filterType !== 'All' && tx.type !== filterType) return false;
        if (filterCategory !== 'All' && tx.category !== filterCategory) return false;
        if (filterPayment !== 'All' && tx.paymentMethod !== filterPayment) return false;

        if (filterDateRange === 'Today' && tx.date !== todayStr) return false;
        if (filterDateRange === 'This Week' && tx.date < weekAgoStr) return false;
        if (filterDateRange === 'This Month' && !(tx.date || '').startsWith(monthPrefix)) return false;

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = (tx.title || '').toLowerCase().includes(q);
          const matchNotes = (tx.notes || '').toLowerCase().includes(q);
          const matchCat = (tx.category || '').toLowerCase().includes(q);
          const matchPay = (tx.paymentMethod || '').toLowerCase().includes(q);
          if (!matchTitle && !matchNotes && !matchCat && !matchPay) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'date-desc') {
          return `${b.date} ${b.time || ''}`.localeCompare(`${a.date} ${a.time || ''}`);
        }
        if (sortBy === 'date-asc') {
          return `${a.date} ${a.time || ''}`.localeCompare(`${b.date} ${b.time || ''}`);
        }
        if (sortBy === 'amount-desc') {
          return Number(b.amount) - Number(a.amount);
        }
        if (sortBy === 'amount-asc') {
          return Number(a.amount) - Number(b.amount);
        }
        return 0;
      });
  }, [transactions, filterType, filterCategory, filterPayment, filterDateRange, searchQuery, sortBy]);

  const activeFilterCount = [
    filterType !== 'All',
    filterCategory !== 'All',
    filterPayment !== 'All',
    filterDateRange !== 'All Time',
  ].filter(Boolean).length;

  // --------------------------------------------------------------------------
  // CSV EXPORT, JSON BACKUP/RESTORE & DEMO LOADER
  // --------------------------------------------------------------------------
  const handleExportCSV = () => {
    if (filteredTransactions.length === 0) {
      showToast('No transactions to export.', 'error');
      return;
    }
    const headers = ['ID', 'Date', 'Time', 'Type', 'Title', 'Category', 'Payment Method', 'Amount', 'Currency', 'Notes'];
    const escapeCSV = (val) => `"${String(val ?? '').replace(/"/g, '""')}"`;

    const rows = filteredTransactions.map((tx) => [
      tx.id,
      tx.date,
      tx.time || '',
      tx.type.toUpperCase(),
      tx.title,
      tx.category,
      tx.paymentMethod,
      tx.type === 'income' ? tx.amount : -tx.amount,
      userSettings.currency,
      tx.notes || '',
    ]);

    const csvContent = [headers.map(escapeCSV).join(','), ...rows.map((r) => r.map(escapeCSV).join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `finflow_${currentUser.username}_${getTodayStr()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Exported ${filteredTransactions.length} transactions to CSV`);
  };

  const handleBackupJSON = () => {
    const payload = {
      app: 'FinFlow',
      version: '3.0',
      exportedAt: new Date().toISOString(),
      user: {
        id: currentUser.id,
        fullName: currentUser.fullName,
        email: currentUser.email,
      },
      settings: userSettings,
      transactions,
      dues,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `finflow_backup_${currentUser.username}_${getTodayStr()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Downloaded JSON backup for your account');
  };

  const handleRestoreJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (!parsed || !Array.isArray(parsed.transactions)) {
          showToast('Invalid backup file format.', 'error');
          return;
        }
        updateTransactionsForUser(parsed.transactions);
        if (Array.isArray(parsed.dues)) {
          updateDuesForUser(parsed.dues);
        }
        if (parsed.settings) {
          updateSettingsForUser(parsed.settings);
        }
        showToast(`Restored ${parsed.transactions.length} transactions to your account!`);
      } catch (err) {
        showToast('Failed to parse JSON backup file.', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleLoadDemoData = () => {
    const demoData = generateDemoTransactions(currentUser.id);
    const demoDueList = generateDemoDues(currentUser.id);
    updateTransactionsForUser(demoData);
    updateDuesForUser(demoDueList);
    showToast(`Loaded demo transactions & due records for ${currentUser.fullName}`);
  };

  const handleResetAccountData = () => {
    setConfirmDialog({
      title: 'Reset Your Account Data?',
      message: `This will clear all ${transactions.length} transactions and ${dues.length} due records for ${currentUser.fullName} (${currentUser.email}). Other users' accounts will remain untouched.`,
      confirmLabel: 'Reset My Data',
      danger: true,
      onConfirm: () => {
        updateTransactionsForUser([]);
        updateDuesForUser([]);
        setConfirmDialog(null);
        showToast('Your account data has been reset to zero.', 'info');
      },
    });
  };

  const getCategoryMeta = (catId, type) => {
    const all = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];
    return (
      all.find((c) => c.id === catId) || {
        id: catId,
        label: catId || 'General',
        icon: type === 'income' ? TrendingUp : TrendingDown,
        color: type === 'income' ? '#10B981' : '#F43F5E',
      }
    );
  };

  const getPaymentMeta = (pmId) => {
    return PAYMENT_METHODS.find((p) => p.id === pmId) || PAYMENT_METHODS[0];
  };

  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 12) return 'Good morning';
    if (hr < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // ============================================================================
  // 4. AUTHENTICATION SCREEN (WHEN LOGGED OUT)
  // ============================================================================
  if (!currentUser) {
    return (
      <div className={isDark ? 'dark' : ''}>
        <div className="min-h-screen bg-[#F1F5F9] dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 transition-colors duration-300">
          <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-slate-900 rounded-[32px] shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden">
            {/* Left Minimal Showcase Panel */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white p-8 flex flex-col justify-between">
              <div>
                <FinFlowLogo size={42} showText={true} textClass="text-white" />
                <div className="mt-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Private Per-User Storage
                </div>
                <h1 className="mt-4 text-2xl font-extrabold tracking-tight leading-snug">
                  Minimal, Effortless Personal Money Tracker.
                </h1>
                <p className="mt-2.5 text-xs text-slate-300 leading-relaxed">
                  Track daily expenses in 1 tap, manage separate bKash/Nagad/Bank balances, and keep tabs on friends' dues without clutter.
                </p>
              </div>

              <div className="mt-8 space-y-3">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-[11px] text-emerald-300 font-bold mb-2 flex items-center justify-between">
                    <span>1-CLICK DEMO ACCOUNTS</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div className="space-y-1.5">
                    {users.slice(0, 2).map((u) => (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => {
                          setCurrentUser(u);
                          showToast(`Logged into ${u.fullName}'s private account`);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl bg-white/10 hover:bg-emerald-500/30 border border-white/10 transition flex items-center justify-between"
                      >
                        <div className="truncate">
                          <div className="font-bold text-xs text-white truncate">{u.fullName}</div>
                          <div className="text-[10px] text-slate-300 truncate">{u.email}</div>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Clean Login / Register Form */}
            <div className="lg:col-span-7 p-8 flex flex-col justify-center">
              <div className="mb-5">
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {authMode === 'login' ? 'Welcome back' : 'Create your FinFlow account'}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {authMode === 'login'
                    ? 'Sign in to view your isolated wallets and transactions.'
                    : 'Every account gets its own completely isolated financial vault.'}
                </p>
              </div>

              <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-5">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setAuthError('');
                  }}
                  className={`py-2 text-xs font-bold rounded-xl transition ${
                    authMode === 'login'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('register');
                    setAuthError('');
                  }}
                  className={`py-2 text-xs font-bold rounded-xl transition ${
                    authMode === 'register'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Register Account
                </button>
              </div>

              {authError && (
                <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-medium flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              {authMode === 'login' ? (
                <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Email or Username
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={authIdentifier}
                        onChange={(e) => setAuthIdentifier(e.target.value)}
                        placeholder="mr.mahfuz.me@gmail.com or mahfuz"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        placeholder="Password (demo: password123)"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md shadow-emerald-500/20 transition"
                  >
                    Sign In to FinFlow
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={authFullName}
                        onChange={(e) => setAuthFullName(e.target.value)}
                        placeholder="Mustafizur Rahman Mahfuz"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        value={authIdentifier}
                        onChange={(e) => setAuthIdentifier(e.target.value)}
                        placeholder="mahfuz"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative">
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        Password
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        placeholder="Min 6 chars"
                        className="w-full px-3.5 pr-9 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 bottom-3 text-slate-400"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <div className="relative">
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        Confirm Password
                      </label>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={authConfirmPassword}
                        onChange={(e) => setAuthConfirmPassword(e.target.value)}
                        placeholder="Repeat password"
                        className="w-full px-3.5 pr-9 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 bottom-3 text-slate-400"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md shadow-emerald-500/20 transition"
                  >
                    Create Isolated Account
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // 5. AUTHENTICATED MINIMAL BENTO DASHBOARD (FINEXY REFERENCE STYLE)
  // ============================================================================
  const initials = currentUser.fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const budgetAlert80 = kpiMetrics.budgetUsedPercent >= 80;
  const budgetExceeded = kpiMetrics.budgetUsedPercent >= 100;

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-[#E2E8F0]/70 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 transition-colors duration-300 p-2 sm:p-4 lg:p-6 font-sans">
        {/* Clean Rounded App Canvas Matching Finexy Screenshot */}
        <div className="max-w-[1380px] mx-auto bg-[#F8FAFC] dark:bg-[#0F172A] rounded-[32px] shadow-xl border border-white/80 dark:border-slate-800/90 overflow-hidden min-h-[calc(100vh-3rem)] flex flex-col">
          
          {/* ================================================================
              SINGLE CLEAN TOP HEADER (No Duplicate Left Sidebar!)
             ================================================================ */}
          <header className="px-5 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/80 sticky top-0 z-30">
            {/* Brand Logo */}
            <FinFlowLogo size={36} showText={true} textClass="text-slate-900 dark:text-white" />

            {/* Single Center Pill Navigation (Just like Finexy Reference) */}
            <nav className="flex items-center bg-slate-100/90 dark:bg-slate-800/90 p-1 rounded-full border border-slate-200/60 dark:border-slate-700/60 overflow-x-auto max-w-full">
              {[
                { id: 'Overview', label: 'Overview' },
                { id: 'Transactions', label: 'Activity' },
                { id: 'Wallets', label: 'Wallets & Dues' },
                { id: 'Analytics', label: 'Reports' },
                { id: 'Settings', label: 'Settings' },
              ].map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                      active
                        ? 'bg-slate-900 dark:bg-emerald-500 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Clean Action Bar: 1 Primary CTA + Theme + Profile Pill */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => openAddTransactionModal('expense')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold shadow-sm shadow-emerald-500/20 transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Record</span>
              </button>

              <button
                type="button"
                onClick={() => updateSettingsForUser({ theme: isDark ? 'light' : 'dark' })}
                className="p-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-500 transition"
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Profile Header & Account Switcher */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2.5 pl-1.5 pr-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 hover:border-emerald-500/50 transition"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold text-xs flex items-center justify-center">
                    {initials}
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight max-w-[125px] truncate">
                      {currentUser.fullName}
                    </div>
                    <div className="text-[10px] text-slate-400 leading-tight max-w-[125px] truncate">
                      {currentUser.email}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 p-3 z-50">
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 mb-2">
                      <div className="font-bold text-xs text-slate-900 dark:text-white truncate">
                        {currentUser.fullName}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {currentUser.email}
                      </div>
                    </div>

                    <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Switch Isolated Account
                    </div>
                    <div className="space-y-1 mb-2">
                      {users.map((u) => {
                        const isCurrent = u.id === currentUser.id;
                        return (
                          <button
                            key={u.id}
                            type="button"
                            onClick={() => handleQuickSwitchUser(u)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition ${
                              isCurrent
                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold'
                                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <span className="truncate">{u.fullName}</span>
                            {isCurrent && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                          </button>
                        );
                      })}
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800 pt-2 space-y-1">
                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          setIsStatementModalOpen(true);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <Printer className="w-3.5 h-3.5 text-emerald-500" /> Monthly Statement Report
                      </button>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Logout Account
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* ================================================================
              MAIN CONTENT BODY (SPACIOUS BENTO LAYOUT)
             ================================================================ */}
          <main className="flex-1 p-5 sm:p-8 space-y-6">
            {/* Greeting Row + Quick 1-Tap Expense/Income Chips */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {getGreeting()}, {currentUser.fullName.split(' ')[0]}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Stay on top of your daily cashflow, monitor wallets, and track monthly budgets.
                </p>
              </div>

              {/* Quick 1-Tap Instant Log Bar */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-emerald-500" /> 1-Tap Log:
                </span>
                {QUICK_PRESETS.map((preset) => {
                  const PresetIcon = preset.icon;
                  const isInc = preset.type === 'income';
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleQuickPresetAdd(preset)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition shrink-0 cursor-pointer ${
                        isInc
                          ? 'bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-emerald-700 dark:text-emerald-300 border-emerald-500/20'
                          : 'bg-white dark:bg-slate-900 hover:border-emerald-500 text-slate-700 dark:text-slate-200 border-slate-200/80 dark:border-slate-800 shadow-2xs'
                      }`}
                      title={`Instant 1-Tap add: ${preset.title} (${currencySymbol}${preset.amount} via ${preset.paymentMethod})`}
                    >
                      <PresetIcon className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{preset.title}</span>
                      <span className={isInc ? 'font-extrabold' : 'text-slate-400 font-bold'}>
                        {isInc ? '+' : '-'}
                        {currencySymbol}
                        {preset.amount}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 80% Monthly Budget Warning Banner */}
            {budgetAlert80 && (
              <div
                className={`px-4 py-3 rounded-2xl border flex items-center justify-between gap-3 ${
                  budgetExceeded
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-300'
                    : 'bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-300'
                }`}
              >
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>
                    {budgetExceeded
                      ? `Monthly budget exceeded (${kpiMetrics.budgetUsedPercent}% used — ${currencySymbol}${kpiMetrics.monthExpense.toLocaleString()} / ${currencySymbol}${kpiMetrics.budgetLimit.toLocaleString()})`
                      : `Heads up: You've used ${kpiMetrics.budgetUsedPercent}% of your ${currencySymbol}${kpiMetrics.budgetLimit.toLocaleString()} monthly budget.`}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('Settings')}
                  className="px-3 py-1 rounded-xl bg-white dark:bg-slate-800 text-xs font-bold shrink-0 shadow-2xs"
                >
                  Edit Limit
                </button>
              </div>
            )}

            {/* ==============================================================
                TAB 1: OVERVIEW (EXACT FINEXY BENTO GRID LAYOUT)
               ============================================================== */}
            {activeTab === 'Overview' && (
              <>
                {/* Top Bento Row: 3 Columns Matching Finexy Screenshot */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  
                  {/* LEFT CARD (4 cols): Total Balance + Transfer/Add Buttons + Mini Wallet Cards */}
                  <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-[28px] p-6 border border-slate-200/70 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          Total Net Balance
                        </span>
                        {/* Currency Pill like Finexy */}
                        <div className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full text-xs font-bold">
                          <span>{currencyObj.flag}</span>
                          <select
                            value={userSettings.currency}
                            onChange={(e) => updateSettingsForUser({ currency: e.target.value })}
                            className="bg-transparent focus:outline-none cursor-pointer"
                            aria-label="Select currency"
                          >
                            {Object.values(CURRENCIES).map((c) => (
                              <option key={c.code} value={c.code} className="bg-white dark:bg-slate-900">
                                {c.code}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        {kpiMetrics.netBalance < 0 ? '-' : ''}
                        {currencySymbol}
                        {Math.abs(kpiMetrics.netBalance).toLocaleString()}
                      </div>

                      <div className="mt-2 flex items-center gap-2 text-xs">
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                          ↑ {kpiMetrics.incomeGrowthPercent}%
                        </span>
                        <span className="text-slate-400">vs last month</span>
                      </div>

                      {/* 2 Pill Action Buttons (Matching Finexy Transfer / Request) */}
                      <div className="grid grid-cols-2 gap-2.5 mt-5">
                        <button
                          type="button"
                          onClick={() => setIsTransferModalOpen(true)}
                          className="py-2.5 px-4 rounded-full bg-slate-900 dark:bg-emerald-500 text-white text-xs font-bold hover:opacity-90 transition flex items-center justify-center gap-1.5"
                        >
                          <ArrowRightLeft className="w-3.5 h-3.5" /> Transfer
                        </button>
                        <button
                          type="button"
                          onClick={() => openAddTransactionModal('income')}
                          className="py-2.5 px-4 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition flex items-center justify-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Money
                        </button>
                      </div>
                    </div>

                    {/* Mini Wallets Sub-Grid (Cash, bKash, Bank) */}
                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                      <div className="flex items-center justify-between text-xs mb-3">
                        <span className="font-bold text-slate-700 dark:text-slate-300">
                          Wallets <span className="text-slate-400 font-normal">| Total {walletBreakdown.length} channels</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setActiveTab('Wallets')}
                          className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                        >
                          See all
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        {walletBreakdown.slice(0, 3).map((w) => {
                          const IconComp = w.icon;
                          return (
                            <div
                              key={w.id}
                              onClick={() => {
                                setFilterPayment(w.id);
                                setActiveTab('Transactions');
                              }}
                              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 hover:border-emerald-500/40 transition cursor-pointer"
                            >
                              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200">
                                <IconComp className="w-3.5 h-3.5" style={{ color: w.color }} />
                                <span className="truncate">{w.label}</span>
                              </div>
                              <div className="mt-2 font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                                {w.balance < 0 ? '-' : ''}
                                {currencySymbol}
                                {Math.abs(w.balance).toLocaleString()}
                              </div>
                              <div className="mt-1 text-[10px] font-semibold text-emerald-500">
                                Active
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* CENTER 2x2 KPI GRID (4 cols): Matching Finexy 4 Stat Tiles */}
                  <div className="lg:col-span-4 grid grid-cols-2 gap-4">
                    {/* Tile 1: Highlighted Emerald Card — This Month's Income */}
                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-[26px] p-5 shadow-md shadow-emerald-500/15 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-emerald-50">Monthly Income</span>
                        <div className="p-2 rounded-full bg-white/15">
                          <TrendingUp className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="my-3">
                        <div className="text-xl sm:text-2xl font-extrabold truncate">
                          {currencySymbol}
                          {kpiMetrics.monthIncome.toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-emerald-100">
                        <span className="px-1.5 py-0.5 rounded-full bg-white/20 font-bold">
                          +{kpiMetrics.incomeGrowthPercent}%
                        </span>
                        <span>{kpiMetrics.monthIncomeCount} entries</span>
                      </div>
                    </div>

                    {/* Tile 2: This Month's Spending */}
                    <div className="bg-white dark:bg-slate-900 rounded-[26px] p-5 border border-slate-200/70 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          Monthly Spending
                        </span>
                        <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-rose-500">
                          <TrendingDown className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="my-3">
                        <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white truncate">
                          {currencySymbol}
                          {kpiMetrics.monthExpense.toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <span className="px-1.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold">
                          {kpiMetrics.budgetUsedPercent}%
                        </span>
                        <span>of budget</span>
                      </div>
                    </div>

                    {/* Tile 3: Today's Cashflow (Income vs Expense) */}
                    <div className="bg-white dark:bg-slate-900 rounded-[26px] p-5 border border-slate-200/70 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          Today's Summary
                        </span>
                        <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-emerald-500">
                          <Calendar className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="my-2 space-y-1">
                        <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 truncate">
                          In: +{currencySymbol}
                          {kpiMetrics.todayIncome.toLocaleString()}
                        </div>
                        <div className="text-sm font-extrabold text-rose-600 dark:text-rose-400 truncate">
                          Out: -{currencySymbol}
                          {kpiMetrics.todayExpense.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        Date: {getTodayStr()}
                      </div>
                    </div>

                    {/* Tile 4: Pending Dues (পাওনা / দেনা) */}
                    <div
                      onClick={() => setActiveTab('Wallets')}
                      className="bg-white dark:bg-slate-900 rounded-[26px] p-5 border border-slate-200/70 dark:border-slate-800 hover:border-emerald-500/40 shadow-xs flex flex-col justify-between cursor-pointer transition"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          Lent / Borrowed
                        </span>
                        <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-amber-500">
                          <HandCoins className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="my-2 space-y-1">
                        <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 truncate">
                          Get: +{currencySymbol}
                          {kpiMetrics.totalLentPending.toLocaleString()}
                        </div>
                        <div className="text-sm font-extrabold text-rose-600 dark:text-rose-400 truncate">
                          Owe: -{currencySymbol}
                          {kpiMetrics.totalBorrowedPending.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                        Manage Dues →
                      </div>
                    </div>
                  </div>

                  {/* RIGHT CARD (4 cols): Single Clean Income vs Expense Bar Chart */}
                  <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-[28px] p-6 border border-slate-200/70 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                          Cashflow Analytics
                        </h2>
                        <p className="text-xs text-slate-400">Income vs Expense comparison</p>
                      </div>
                      <div className="inline-flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-full text-[11px] font-bold">
                        {[
                          { id: 'daily', label: '7D' },
                          { id: 'monthly', label: 'Month' },
                          { id: 'yearly', label: 'Year' },
                        ].map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setBarChartTimeframe(t.id)}
                            className={`px-2.5 py-1 rounded-full transition ${
                              barChartTimeframe === t.id
                                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-2xs'
                                : 'text-slate-500'
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="relative h-56 w-full my-auto">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barChartData} margin={{ top: 8, right: 5, left: -18, bottom: 0 }}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke={isDark ? '#1E293B' : '#F1F5F9'}
                          />
                          <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: isDark ? '#94A3B8' : '#64748B', fontSize: 11 }}
                          />
                          <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: isDark ? '#94A3B8' : '#64748B', fontSize: 11 }}
                            tickFormatter={(v) => `${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
                              borderColor: isDark ? '#1E293B' : '#E2E8F0',
                              borderRadius: '14px',
                              fontSize: '12px',
                            }}
                            formatter={(val, name) => [`${currencySymbol}${Number(val).toLocaleString()}`, name]}
                          />
                          <Bar dataKey="Income" fill="#10B981" radius={[6, 6, 0, 0]} maxBarSize={22} />
                          <Bar dataKey="Expense" fill="#0F172A" radius={[6, 6, 0, 0]} maxBarSize={22} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </section>

                {/* Bottom Bento Row: Left (Monthly Spending Limit + My Wallets/Cards) & Right (Clean Recent Activities) */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  {/* Left Column (4 cols): Monthly Spending Limit + Visual Payment Cards */}
                  <div className="lg:col-span-4 space-y-5">
                    {/* Monthly Spending Limit Card (Exact Finexy Reference Element) */}
                    <div className="bg-white dark:bg-slate-900 rounded-[28px] p-6 border border-slate-200/70 dark:border-slate-800 shadow-xs">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                          Monthly Spending Limit
                        </span>
                        <button
                          type="button"
                          onClick={() => setActiveTab('Settings')}
                          className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                        >
                          Edit
                        </button>
                      </div>

                      <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            budgetExceeded
                              ? 'bg-rose-500'
                              : budgetAlert80
                              ? 'bg-amber-500'
                              : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                          }`}
                          style={{ width: `${Math.min(100, kpiMetrics.budgetUsedPercent)}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-xs mt-3">
                        <span className="text-slate-500 dark:text-slate-400">
                          <strong className="text-slate-900 dark:text-white">
                            {currencySymbol}
                            {kpiMetrics.monthExpense.toLocaleString()}
                          </strong>{' '}
                          spent out of
                        </span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          {currencySymbol}
                          {kpiMetrics.budgetLimit.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Visual Payment Cards (Finexy "My Cards" Style) */}
                    <div className="bg-white dark:bg-slate-900 rounded-[28px] p-6 border border-slate-200/70 dark:border-slate-800 shadow-xs">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-emerald-500" />
                          <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                            Active Cards & MFS
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsTransferModalOpen(true)}
                          className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-emerald-500 hover:text-white transition"
                        >
                          + Transfer
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Card 1: Dark Slate Bank/Visa Card */}
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col justify-between h-36 relative overflow-hidden">
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-0.5 rounded-full bg-white/15 text-[10px] font-bold">
                              Bank / Card
                            </span>
                            <Landmark className="w-4 h-4 text-emerald-400" />
                          </div>
                          <div>
                            <div className="text-[11px] text-slate-400">Available Balance</div>
                            <div className="text-lg font-extrabold">
                              {currencySymbol}
                              {(
                                (walletBreakdown.find((w) => w.id === 'Bank Transfer')?.balance || 0) +
                                (walletBreakdown.find((w) => w.id === 'Card')?.balance || 0)
                              ).toLocaleString()}
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-slate-400">
                            <span>**** 6782</span>
                            <span>ACTIVE</span>
                          </div>
                        </div>

                        {/* Card 2: Emerald / MFS (bKash + Nagad) Card */}
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex flex-col justify-between h-36 relative overflow-hidden">
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold">
                              bKash & Nagad
                            </span>
                            <Smartphone className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="text-[11px] text-emerald-100">MFS Wallet Balance</div>
                            <div className="text-lg font-extrabold">
                              {currencySymbol}
                              {(
                                (walletBreakdown.find((w) => w.id === 'bKash')?.balance || 0) +
                                (walletBreakdown.find((w) => w.id === 'Nagad')?.balance || 0) +
                                (walletBreakdown.find((w) => w.id === 'Rocket')?.balance || 0)
                              ).toLocaleString()}
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-emerald-100">
                            <span>Instant MFS</span>
                            <span>VERIFIED</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column (8 cols): Clean Recent Activities Table with Collapsible Filter */}
                  <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-[28px] p-6 border border-slate-200/70 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                        <div>
                          <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                            Recent Activities
                          </h2>
                          <p className="text-xs text-slate-400">
                            Showing latest transactions • Click "Activity" tab for full history
                          </p>
                        </div>

                        {/* Minimal Search + Single Filter Toggle Button (Just like Finexy Screenshot) */}
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="Search activity..."
                              className="pl-8 pr-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-emerald-500 text-xs focus:outline-none w-40 sm:w-48"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => setShowFilters(!showFilters)}
                            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border transition ${
                              showFilters || activeFilterCount > 0
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                                : 'bg-slate-100 dark:bg-slate-800 border-transparent text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <Filter className="w-3.5 h-3.5" />
                            <span>Filter</span>
                            {activeFilterCount > 0 && (
                              <span className="px-1.5 py-0.2 rounded-full bg-emerald-500 text-white text-[10px]">
                                {activeFilterCount}
                              </span>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Collapsible Filter Drawer (Hidden by default to keep UI clean!) */}
                      {showFilters && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 mb-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
                          <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                          >
                            <option value="All">All Types</option>
                            <option value="income">Income (+)</option>
                            <option value="expense">Expense (-)</option>
                          </select>
                          <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                          >
                            <option value="All">All Categories</option>
                            {[...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES].map((c) => (
                              <option key={c.id} value={c.id}>{c.label}</option>
                            ))}
                          </select>
                          <select
                            value={filterPayment}
                            onChange={(e) => setFilterPayment(e.target.value)}
                            className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                          >
                            <option value="All">All Wallets</option>
                            {PAYMENT_METHODS.map((pm) => (
                              <option key={pm.id} value={pm.id}>{pm.label}</option>
                            ))}
                          </select>
                          <select
                            value={filterDateRange}
                            onChange={(e) => setFilterDateRange(e.target.value)}
                            className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                          >
                            <option value="All Time">All Time</option>
                            <option value="Today">Today</option>
                            <option value="This Week">This Week</option>
                            <option value="This Month">This Month</option>
                          </select>
                        </div>
                      )}

                      {/* Compact 6-Row Recent Activity Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                              <th className="py-3 px-3">Activity</th>
                              <th className="py-3 px-3">Category</th>
                              <th className="py-3 px-3">Wallet</th>
                              <th className="py-3 px-3">Date</th>
                              <th className="py-3 px-3 text-right">Amount</th>
                              <th className="py-3 px-3 text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                            {filteredTransactions.slice(0, 6).map((tx) => {
                              const catMeta = getCategoryMeta(tx.category, tx.type);
                              const payMeta = getPaymentMeta(tx.paymentMethod);
                              const CatIcon = catMeta.icon;
                              const isIncome = tx.type === 'income';
                              return (
                                <tr key={tx.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                                  <td className="py-3 px-3 max-w-[200px]">
                                    <div className="flex items-center gap-2.5">
                                      <div
                                        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                                        style={{ backgroundColor: `${catMeta.color}15`, color: catMeta.color }}
                                      >
                                        <CatIcon className="w-4 h-4" />
                                      </div>
                                      <div className="truncate">
                                        <div className="font-bold text-slate-900 dark:text-white truncate">
                                          {tx.title}
                                        </div>
                                        {tx.notes && (
                                          <div className="text-[11px] text-slate-400 truncate">{tx.notes}</div>
                                        )}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="py-3 px-3 whitespace-nowrap text-slate-600 dark:text-slate-300 font-medium">
                                    {catMeta.label}
                                  </td>
                                  <td className="py-3 px-3 whitespace-nowrap">
                                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${payMeta.badgeBg}`}>
                                      {payMeta.label}
                                    </span>
                                  </td>
                                  <td className="py-3 px-3 whitespace-nowrap text-slate-400">
                                    {tx.date}
                                  </td>
                                  <td className="py-3 px-3 text-right whitespace-nowrap font-extrabold">
                                    <span className={isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>
                                      {isIncome ? '+' : '-'}
                                      {currencySymbol}
                                      {Number(tx.amount).toLocaleString()}
                                    </span>
                                  </td>
                                  <td className="py-3 px-3 text-right whitespace-nowrap">
                                    <div className="inline-flex items-center gap-1">
                                      <button
                                        type="button"
                                        onClick={() => openEditTransactionModal(tx)}
                                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-emerald-500"
                                        title="Edit"
                                      >
                                        <Edit3 className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteTransaction(tx)}
                                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-rose-500"
                                        title="Delete"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-400">
                        Showing {Math.min(6, filteredTransactions.length)} of {filteredTransactions.length} records
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setIsStatementModalOpen(true)}
                          className="font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-500 flex items-center gap-1"
                        >
                          <Printer className="w-3.5 h-3.5" /> Monthly Statement
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveTab('Transactions')}
                          className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                        >
                          View All Activity →
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}

            {/* ==============================================================
                TAB 2: FULL ACTIVITY TABLE (COLLAPSIBLE FILTERS + CSV + PRINT)
               ============================================================== */}
            {activeTab === 'Transactions' && (
              <section className="bg-white dark:bg-slate-900 rounded-[28px] p-6 border border-slate-200/70 dark:border-slate-800 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                      All Transactions & Activity ({filteredTransactions.length})
                    </h2>
                    <p className="text-xs text-slate-400">
                      Search, filter, sort, or export your complete financial ledger
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search keyword..."
                        className="pl-9 pr-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowFilters(!showFilters)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold"
                    >
                      <Filter className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleExportCSV}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 hover:text-white text-xs font-bold transition"
                    >
                      <Download className="w-3.5 h-3.5" /> Export CSV
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsStatementModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold hover:bg-emerald-500 hover:text-white transition"
                    >
                      <Printer className="w-3.5 h-3.5" /> Statement PDF
                    </button>
                  </div>
                </div>

                {showFilters && (
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                    >
                      <option value="All">All Types</option>
                      <option value="income">Income (+)</option>
                      <option value="expense">Expense (-)</option>
                    </select>
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                    >
                      <option value="All">All Categories</option>
                      {[...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES].map((c) => (
                        <option key={c.id} value={c.id}>{c.label}</option>
                      ))}
                    </select>
                    <select
                      value={filterPayment}
                      onChange={(e) => setFilterPayment(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                    >
                      <option value="All">All Wallets</option>
                      {PAYMENT_METHODS.map((pm) => (
                        <option key={pm.id} value={pm.id}>{pm.label}</option>
                      ))}
                    </select>
                    <select
                      value={filterDateRange}
                      onChange={(e) => setFilterDateRange(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                    >
                      <option value="All Time">All Time</option>
                      <option value="Today">Today</option>
                      <option value="This Week">This Week</option>
                      <option value="This Month">This Month</option>
                    </select>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                    >
                      <option value="date-desc">Newest First</option>
                      <option value="date-asc">Oldest First</option>
                      <option value="amount-desc">Highest Amount</option>
                      <option value="amount-asc">Lowest Amount</option>
                    </select>
                  </div>
                )}

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200/80 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        <th className="py-3.5 px-4">Date & Time</th>
                        <th className="py-3.5 px-4">Particulars & Note</th>
                        <th className="py-3.5 px-4">Category</th>
                        <th className="py-3.5 px-4">Wallet</th>
                        <th className="py-3.5 px-4 text-right">Amount</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70 text-xs sm:text-sm">
                      {filteredTransactions.map((tx) => {
                        const catMeta = getCategoryMeta(tx.category, tx.type);
                        const payMeta = getPaymentMeta(tx.paymentMethod);
                        const CatIcon = catMeta.icon;
                        const isIncome = tx.type === 'income';
                        return (
                          <tr key={tx.id} className="hover:bg-slate-50/90 dark:hover:bg-slate-800/40 transition">
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <div className="font-bold text-slate-800 dark:text-slate-200">{tx.date}</div>
                              <div className="text-[11px] text-slate-400">{tx.time || '12:00'}</div>
                            </td>
                            <td className="py-3.5 px-4 max-w-xs">
                              <div className="font-bold text-slate-900 dark:text-white truncate">{tx.title}</div>
                              {tx.notes && <div className="text-xs text-slate-400 truncate">{tx.notes}</div>}
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                                style={{ backgroundColor: `${catMeta.color}18`, color: catMeta.color }}
                              >
                                <CatIcon className="w-3.5 h-3.5" />
                                {catMeta.label}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${payMeta.badgeBg}`}>
                                {payMeta.label}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right whitespace-nowrap font-extrabold">
                              <span className={isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>
                                {isIncome ? '+' : '-'}
                                {currencySymbol}
                                {Number(tx.amount).toLocaleString()}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                              <div className="inline-flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => openEditTransactionModal(tx)}
                                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:text-emerald-500"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteTransaction(tx)}
                                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:text-rose-500"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* ==============================================================
                TAB 3: WALLETS & DUES (SEPARATE WALLET BALANCES + LENT/BORROWED)
               ============================================================== */}
            {activeTab === 'Wallets' && (
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Left 6 Cols: Individual Wallet Balances & Wallet-to-Wallet Transfer */}
                <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-[28px] p-6 border border-slate-200/70 dark:border-slate-800 shadow-xs space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                        <Wallet className="w-5 h-5 text-emerald-500" />
                        Separate Wallet Balances
                      </h2>
                      <p className="text-xs text-slate-400">
                        Track exact balance across Cash, bKash, Nagad, Rocket, Bank & Card
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsTransferModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 dark:bg-emerald-500 text-white text-xs font-bold shadow-xs hover:opacity-90 transition"
                    >
                      <ArrowRightLeft className="w-3.5 h-3.5" /> Transfer Funds
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {walletBreakdown.map((w) => {
                      const IconComp = w.icon;
                      return (
                        <div
                          key={w.id}
                          className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 flex flex-col justify-between"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <span className={`p-2.5 rounded-xl border ${w.badgeBg}`}>
                                <IconComp className="w-4 h-4" />
                              </span>
                              <div>
                                <div className="font-bold text-sm text-slate-900 dark:text-white">{w.label}</div>
                                <div className="text-[10px] text-slate-400">{w.limitText}</div>
                              </div>
                            </div>
                            <span className="text-[11px] font-semibold text-slate-400">{w.txCount} tx</span>
                          </div>

                          <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-700/50 flex items-baseline justify-between">
                            <span className="text-[11px] text-slate-400">Current Balance</span>
                            <span
                              className={`text-base font-extrabold ${
                                w.balance >= 0 ? 'text-slate-900 dark:text-white' : 'text-rose-500'
                              }`}
                            >
                              {w.balance < 0 ? '-' : ''}
                              {currencySymbol}
                              {Math.abs(w.balance).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right 6 Cols: Lent / Borrowed (ধার-দেনা / Due & Split Tracker) */}
                <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-[28px] p-6 border border-slate-200/70 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                          <HandCoins className="w-5 h-5 text-amber-500" />
                          Lent & Borrowed Tracker (ধার-দেনা হিসাব)
                        </h2>
                        <p className="text-xs text-slate-400">
                          Track money friends owe you (পাওনা) or money you owe others (দেনা)
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsDueModalOpen(true)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Due
                      </button>
                    </div>

                    {/* Summary Strip */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                        <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                          YOU WILL GET (পাওনা)
                        </div>
                        <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                          +{currencySymbol}
                          {kpiMetrics.totalLentPending.toLocaleString()}
                        </div>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                        <div className="text-[11px] font-bold text-rose-700 dark:text-rose-300">
                          YOU OWE (দেনা)
                        </div>
                        <div className="text-xl font-extrabold text-rose-600 dark:text-rose-400 mt-0.5">
                          -{currencySymbol}
                          {kpiMetrics.totalBorrowedPending.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Dues List */}
                    <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                      {dues.length === 0 ? (
                        <div className="text-center py-10 text-xs text-slate-400">
                          No active lent or borrowed records. Click "+ Add Due" to log shared bills or loans.
                        </div>
                      ) : (
                        dues.map((d) => {
                          const isLent = d.type === 'lent';
                          return (
                            <div
                              key={d.id}
                              className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition ${
                                d.settled
                                  ? 'bg-slate-50/50 dark:bg-slate-800/20 border-slate-200/40 dark:border-slate-800 opacity-60'
                                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200/70 dark:border-slate-800'
                              }`}
                            >
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                                    {d.person}
                                  </span>
                                  <span
                                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                      isLent
                                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                                        : 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                                    }`}
                                  >
                                    {isLent ? 'Lent (পাওনা)' : 'Borrowed (দেনা)'}
                                  </span>
                                </div>
                                <div className="text-[11px] text-slate-400 truncate mt-0.5">
                                  {d.note || 'Shared expense'} • via {d.paymentMethod} • {d.dueDate}
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                <span
                                  className={`font-extrabold text-sm ${
                                    isLent ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                                  }`}
                                >
                                  {isLent ? '+' : '-'}
                                  {currencySymbol}
                                  {Number(d.amount).toLocaleString()}
                                </span>

                                <button
                                  type="button"
                                  onClick={() => handleSettleDue(d)}
                                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition ${
                                    d.settled
                                      ? 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                                      : 'bg-emerald-500 text-white hover:bg-emerald-600'
                                  }`}
                                >
                                  {d.settled ? 'Settled ✓' : 'Mark Paid'}
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleDeleteDue(d.id)}
                                  className="p-1.5 text-slate-400 hover:text-rose-500"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* ==============================================================
                TAB 4: REPORTS & VISUAL ANALYTICS (DONUT, AREA & STATEMENT)
               ============================================================== */}
            {activeTab === 'Analytics' && (
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 rounded-[28px] p-5 border border-slate-200/70 dark:border-slate-800">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                      Detailed Financial Reports & Charts
                    </h2>
                    <p className="text-xs text-slate-400">
                      Deep-dive into category spending, cumulative cashflow, and printable monthly statements
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsStatementModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 dark:bg-emerald-500 text-white text-xs font-bold shadow-sm hover:opacity-90 transition"
                  >
                    <Printer className="w-4 h-4" /> Open Printable Monthly Statement
                  </button>
                </div>

                <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  {/* Category Donut Chart (5 cols) */}
                  <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-[28px] p-6 border border-slate-200/70 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                        Expense Breakdown by Category
                      </h3>
                      <p className="text-xs text-slate-400">Share of spending across categories</p>
                    </div>

                    <div className="relative h-60 w-full my-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={expenseDonutData}
                            cx="50%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={82}
                            paddingAngle={3}
                            dataKey="value"
                            label={({ percentage }) => `${percentage}%`}
                            labelLine={false}
                          >
                            {expenseDonutData.map((entry, idx) => (
                              <Cell key={`cell-${idx}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(val, name, props) => [
                              `${currencySymbol}${Number(val).toLocaleString()} (${props.payload.percentage}%)`,
                              name,
                            ]}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                      {expenseDonutData.map((cat) => (
                        <div key={cat.name} className="flex items-center justify-between text-xs px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                          <span className="truncate flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                            <span className="truncate">{cat.name}</span>
                          </span>
                          <span className="font-bold">{cat.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cumulative Cashflow Area Chart (7 cols) */}
                  <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-[28px] p-6 border border-slate-200/70 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                        Daily Cashflow Trajectory
                      </h3>
                      <p className="text-xs text-slate-400">Cumulative net balance progression over time</p>
                    </div>

                    <div className="relative h-72 w-full my-auto">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={cashflowAreaData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="emeraldAreaGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                              <stop offset="95%" stopColor="#10B981" stopOpacity={0.02} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#1E293B' : '#F1F5F9'} />
                          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                          <Tooltip formatter={(val) => [`${currencySymbol}${Number(val).toLocaleString()}`, 'Balance']} />
                          <Area type="monotone" dataKey="balance" stroke="#10B981" strokeWidth={3} fill="url(#emeraldAreaGrad)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* ==============================================================
                TAB 5: SETTINGS, BUDGET & BACKUP
               ============================================================== */}
            {activeTab === 'Settings' && (
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-[28px] p-6 border border-slate-200/70 dark:border-slate-800 space-y-5">
                  <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Budget Limit & Display Preferences
                  </h2>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">
                      Monthly Expense Limit ({currencySymbol})
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={userSettings.monthlyLimit}
                        onChange={(e) =>
                          updateSettingsForUser({ monthlyLimit: Math.max(1, Number(e.target.value) || 0) })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold"
                      />
                      <button
                        type="button"
                        onClick={() => showToast('Saved monthly budget limit!')}
                        className="px-4 py-2.5 rounded-xl bg-emerald-500 text-white text-xs font-bold shrink-0"
                      >
                        Save
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5">Currency</label>
                      <select
                        value={userSettings.currency}
                        onChange={(e) => updateSettingsForUser({ currency: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold"
                      >
                        {Object.values(CURRENCIES).map((c) => (
                          <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5">Theme Mode</label>
                      <button
                        type="button"
                        onClick={() => updateSettingsForUser({ theme: isDark ? 'light' : 'dark' })}
                        className="w-full py-2.5 px-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold flex items-center justify-center gap-2"
                      >
                        {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
                        <span>{isDark ? 'Dark Mode Active' : 'Light Mode Active'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-[28px] p-6 border border-slate-200/70 dark:border-slate-800 space-y-4">
                  <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Data Backup, Demo & Account Reset
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={handleLoadDemoData}
                      className="py-3 px-4 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" /> Load Demo Data
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsStatementModalOpen(true)}
                      className="py-3 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2"
                    >
                      <Printer className="w-4 h-4 text-emerald-500" /> Monthly Statement PDF
                    </button>
                    <button
                      type="button"
                      onClick={handleBackupJSON}
                      className="py-3 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4 text-emerald-500" /> Backup JSON
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="py-3 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2"
                    >
                      <Upload className="w-4 h-4 text-blue-500" /> Restore JSON
                    </button>
                    <input ref={fileInputRef} type="file" accept=".json" onChange={handleRestoreJSON} className="hidden" />
                  </div>
                  <button
                    type="button"
                    onClick={handleResetAccountData}
                    className="w-full py-3 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" /> Reset My Account Data <span>Clear {transactions.length} Records</span>
                  </button>
                </div>
              </section>
            )}
          </main>
        </div>

        {/* ====================================================================
            MODAL 1: ADD / EDIT TRANSACTION MODAL
           ==================================================================== */}
        {isTxModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8">
              <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FinFlowLogo size={26} />
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {editingTxId ? 'Edit Transaction' : 'Add Transaction'}
                  </h3>
                </div>
                <button type="button" onClick={() => setIsTxModalOpen(false)} className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveTransaction} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => handleTxTypeSwitch('income')}
                    className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                      txType === 'income' ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    <TrendingUp className="w-4 h-4" /> Income (+)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTxTypeSwitch('expense')}
                    className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                      txType === 'expense' ? 'bg-rose-500 text-white shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    <TrendingDown className="w-4 h-4" /> Expense (-)
                  </button>
                </div>

                {txFormError && (
                  <div className="p-3 rounded-xl bg-rose-500/10 text-rose-600 text-xs font-semibold">
                    {txFormError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-7">
                    <label className="block text-xs font-bold text-slate-500 mb-1">Particulars *</label>
                    <input
                      type="text"
                      value={txTitle}
                      onChange={(e) => setTxTitle(e.target.value)}
                      placeholder="e.g., Daily Breakfast, Fiverr Order"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
                    />
                  </div>
                  <div className="sm:col-span-5">
                    <label className="block text-xs font-bold text-slate-500 mb-1">Amount ({currencySymbol}) *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={txAmount}
                      onChange={(e) => setTxAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">Category</label>
                  <div className="grid grid-cols-3 gap-2 max-h-36 overflow-y-auto p-0.5">
                    {(txType === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES).map((cat) => {
                      const IconComp = cat.icon;
                      const selected = txCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setTxCategory(cat.id)}
                          className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-semibold border text-left transition ${
                            selected
                              ? 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                              : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          <IconComp className="w-3.5 h-3.5 shrink-0" style={{ color: cat.color }} />
                          <span className="truncate">{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Wallet</label>
                    <select
                      value={txPaymentMethod}
                      onChange={(e) => setTxPaymentMethod(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                    >
                      {PAYMENT_METHODS.map((pm) => (
                        <option key={pm.id} value={pm.id}>{pm.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Date</label>
                    <input
                      type="date"
                      value={txDate}
                      onChange={(e) => setTxDate(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Time</label>
                    <input
                      type="time"
                      value={txTime}
                      onChange={(e) => setTxTime(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Notes (Optional)</label>
                  <input
                    type="text"
                    value={txNotes}
                    onChange={(e) => setTxNotes(e.target.value)}
                    placeholder="Reference, TrxID, or details..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button type="button" onClick={() => setIsTxModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-5 py-2 rounded-xl text-white text-xs font-bold ${
                      txType === 'income' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-rose-500 hover:bg-rose-600'
                    }`}
                  >
                    Save Record
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ====================================================================
            MODAL 2: WALLET-TO-WALLET TRANSFER MODAL (e.g. Bank -> bKash / Cash)
           ==================================================================== */}
        {isTransferModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ArrowRightLeft className="w-4 h-4 text-emerald-500" />
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    Transfer Between Wallets
                  </h3>
                </div>
                <button type="button" onClick={() => setIsTransferModalOpen(false)} className="p-1.5 rounded-full text-slate-400">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleWalletTransferSubmit} className="p-6 space-y-4">
                {transferError && (
                  <div className="p-3 rounded-xl bg-rose-500/10 text-rose-600 text-xs font-semibold">
                    {transferError}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">From Wallet</label>
                    <select
                      value={transferFrom}
                      onChange={(e) => setTransferFrom(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold"
                    >
                      {PAYMENT_METHODS.map((pm) => (
                        <option key={pm.id} value={pm.id}>{pm.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">To Wallet</label>
                    <select
                      value={transferTo}
                      onChange={(e) => setTransferTo(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold"
                    >
                      {PAYMENT_METHODS.map((pm) => (
                        <option key={pm.id} value={pm.id}>{pm.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Transfer Amount ({currencySymbol})</label>
                  <input
                    type="number"
                    step="0.01"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    placeholder="e.g., 5000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Note (Optional)</label>
                  <input
                    type="text"
                    value={transferNote}
                    onChange={(e) => setTransferNote(e.target.value)}
                    placeholder="e.g., NPSB transfer from BRAC Bank to bKash"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setIsTransferModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold">
                    Confirm Transfer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ====================================================================
            MODAL 3: LENT / BORROWED (DUE TRACKER) MODAL
           ==================================================================== */}
        {isDueModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HandCoins className="w-4 h-4 text-amber-500" />
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    Add Lent / Borrowed Record (ধার-দেনা)
                  </h3>
                </div>
                <button type="button" onClick={() => setIsDueModalOpen(false)} className="p-1.5 rounded-full text-slate-400">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddDueSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setDueType('lent')}
                    className={`py-2 rounded-xl text-xs font-bold transition ${
                      dueType === 'lent' ? 'bg-emerald-500 text-white' : 'text-slate-500'
                    }`}
                  >
                    I Lent (টাকা পাবো)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDueType('borrowed')}
                    className={`py-2 rounded-xl text-xs font-bold transition ${
                      dueType === 'borrowed' ? 'bg-rose-500 text-white' : 'text-slate-500'
                    }`}
                  >
                    I Borrowed (টাকা দেবো)
                  </button>
                </div>

                {dueError && (
                  <div className="p-3 rounded-xl bg-rose-500/10 text-rose-600 text-xs font-semibold">
                    {dueError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Person / Friend Name *</label>
                  <input
                    type="text"
                    value={duePerson}
                    onChange={(e) => setDuePerson(e.target.value)}
                    placeholder="e.g., Tanvir Ahmed"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Amount ({currencySymbol}) *</label>
                    <input
                      type="number"
                      value={dueAmount}
                      onChange={(e) => setDueAmount(e.target.value)}
                      placeholder="1000"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Wallet</label>
                    <select
                      value={dueMethod}
                      onChange={(e) => setDueMethod(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold"
                    >
                      {PAYMENT_METHODS.map((pm) => (
                        <option key={pm.id} value={pm.id}>{pm.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Reason / Note</label>
                  <input
                    type="text"
                    value={dueNote}
                    onChange={(e) => setDueNote(e.target.value)}
                    placeholder="e.g., Dinner split, Wi-Fi bill, emergency cash"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setIsDueModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold">
                    Save Due Record
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ====================================================================
            MODAL 4: PRINTABLE MONTHLY STATEMENT REPORT (PDF / PRINT VIEW)
           ==================================================================== */}
        {isStatementModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white text-slate-900 w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
              <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FinFlowLogo size={30} showText={true} textClass="text-white" />
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                    Official Monthly Statement
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold"
                  >
                    <Printer className="w-3.5 h-3.5" /> Print / Save PDF
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsStatementModalOpen(false)}
                    className="p-1.5 rounded-full text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 gap-2">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">{currentUser.fullName}</h2>
                    <p className="text-xs text-slate-500">{currentUser.email} • Statement Date: {getTodayStr()}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-xs text-slate-500">Net Account Balance</div>
                    <div className="text-2xl font-extrabold text-emerald-600">
                      {currencySymbol}
                      {kpiMetrics.netBalance.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100">
                    <div className="text-[11px] font-bold text-emerald-700">TOTAL INCOME</div>
                    <div className="text-lg font-extrabold text-emerald-600 mt-0.5">
                      +{currencySymbol}
                      {kpiMetrics.totalIncome.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-100">
                    <div className="text-[11px] font-bold text-rose-700">TOTAL EXPENSE</div>
                    <div className="text-lg font-extrabold text-rose-600 mt-0.5">
                      -{currencySymbol}
                      {kpiMetrics.totalExpense.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200">
                    <div className="text-[11px] font-bold text-slate-600">BUDGET UTILIZATION</div>
                    <div className="text-lg font-extrabold text-slate-900 mt-0.5">
                      {kpiMetrics.budgetUsedPercent}%
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Recent Ledger Summary ({transactions.length} entries)
                  </h4>
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500">
                        <th className="py-2">Date</th>
                        <th className="py-2">Particulars</th>
                        <th className="py-2">Category</th>
                        <th className="py-2">Wallet</th>
                        <th className="py-2 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {transactions.slice(0, 15).map((tx) => (
                        <tr key={tx.id}>
                          <td className="py-2 text-slate-500">{tx.date}</td>
                          <td className="py-2 font-semibold text-slate-800">{tx.title}</td>
                          <td className="py-2 text-slate-600">{tx.category}</td>
                          <td className="py-2 text-slate-600">{tx.paymentMethod}</td>
                          <td className={`py-2 text-right font-bold ${tx.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {tx.type === 'income' ? '+' : '-'}
                            {currencySymbol}
                            {Number(tx.amount).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            IN-PAGE CONFIRMATION MODAL
           ==================================================================== */}
        {confirmDialog && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-2xl bg-rose-500/10 text-rose-600">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {confirmDialog.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {confirmDialog.message}
              </p>
              <div className="flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setConfirmDialog(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDialog.onConfirm}
                  className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold"
                >
                  {confirmDialog.confirmLabel || 'Confirm'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            NON-BLOCKING TOAST NOTIFICATION
           ==================================================================== */}
        {toast && (
          <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900 dark:bg-emerald-600 text-white text-xs font-semibold shadow-xl border border-white/10">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-white shrink-0" />
            <span>{toast.message}</span>
          </div>
        )}
      </div>
    </div>
  );
}
