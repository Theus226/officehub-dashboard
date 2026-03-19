import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutGrid,
  Settings,
  X,
  Moon,
  Sun,
  Plus,
  Inbox,
  Loader2,
  Link as LinkIcon,
  Pencil,
  Trash2,
} from "lucide-react";
import { useTheme } from "./contexts/ThemeContext";
import { useApps, getFaviconUrl } from "./hooks/useApps";
import { AppCard } from "./components/AppCard";
import type { App, CreateAppInput } from "./types";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { apps, addApp, updateApp, removeApp, editingApp, setEditingApp } = useApps();
  const [adminMode, setAdminMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDelete = (id: string) => {
    if (window.confirm("Remove this application?")) {
      removeApp(id);
    }
  };

  const openEdit = (app: App) => {
    setEditingApp(app);
    setModalOpen(true);
  };

  const openAdd = () => {
    setEditingApp(null);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 text-surface-900 dark:text-surface-50 transition-colors">
      {/* ── Header ── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center justify-between px-4 py-5 sm:px-6 sm:py-7 md:px-12 md:py-10"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-900 dark:bg-surface-50 shrink-0">
            <LayoutGrid className="h-4 w-4 text-white dark:text-surface-900" />
          </div>
          <div>
            <h1 className="text-base font-semibold tracking-tightest sm:text-xl">OfficeHub</h1>
            <p className="hidden text-xs text-surface-400 dark:text-surface-500 sm:block">
              Your workspace, unified.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl
              bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300
              hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setAdminMode((p) => !p)}
            className={`flex items-center gap-1.5 rounded-2xl px-3 py-2 text-xs font-medium transition-colors duration-200 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm
              ${
                adminMode
                  ? "bg-surface-900 dark:bg-surface-50 text-white dark:text-surface-900"
                  : "bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700"
              }`}
          >
            {adminMode ? (
              <>
                <X className="h-3.5 w-3.5" /> <span>Sair</span>
              </>
            ) : (
              <>
                <Settings className="h-3.5 w-3.5" /> <span>Admin</span>
              </>
            )}
          </motion.button>
        </div>
      </motion.header>

      {/* ── Admin Bar ── */}
      <AnimatePresence>
        {adminMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mx-4 mb-4 overflow-hidden rounded-[1.5rem] bg-surface-900 dark:bg-surface-800 p-4 text-white sm:mx-6 sm:mb-6 sm:rounded-[2rem] sm:p-6 md:mx-12"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold tracking-tightest sm:text-base">Admin Mode</h2>
                <p className="mt-0.5 text-xs text-surface-400 dark:text-surface-500 sm:text-sm">
                  {apps.length} app{apps.length !== 1 ? "s" : ""} configurado{apps.length !== 1 ? "s" : ""}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={openAdd}
                className="flex shrink-0 items-center gap-1.5 rounded-2xl bg-white dark:bg-surface-700 px-3 py-2
                  text-xs font-medium text-surface-900 dark:text-white transition-colors
                  hover:bg-surface-100 dark:hover:bg-surface-600 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
              >
                <Plus className="h-3.5 w-3.5" /> Adicionar
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bento Grid ── */}
      {apps.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center gap-4 py-32 text-center"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-surface-100 dark:bg-surface-800">
            <Inbox className="h-7 w-7 text-surface-400 dark:text-surface-500" />
          </div>
          <div>
            <p className="text-base font-medium text-surface-600 dark:text-surface-300">
              No applications yet
            </p>
            <p className="mt-1 text-sm text-surface-400 dark:text-surface-500">
              Enable Admin Mode to add your first app.
            </p>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 gap-3 px-4 pb-12 sm:grid-cols-3 sm:gap-4 sm:px-6 md:grid-cols-4 md:gap-5 md:px-12 lg:grid-cols-5 xl:grid-cols-6">
          <AnimatePresence mode="popLayout">
            {apps.map((app, i) => (
              <AppCard
                key={app.id}
                app={app}
                index={i}
                adminMode={adminMode}
                onDelete={handleDelete}
                onEdit={openEdit}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* ── Add / Edit Modal ── */}
      <AppModal
        open={modalOpen}
        editingApp={editingApp}
        onClose={() => {
          setModalOpen(false);
          setEditingApp(null);
        }}
        onSubmit={(input) => {
          if (editingApp) {
            updateApp(editingApp.id, { ...input, updatedAt: new Date().toISOString() });
          } else {
            addApp(input);
          }
          setModalOpen(false);
        }}
      />
    </div>
  );
}

/* ─────────────── Modal ─────────────── */

interface AppModalProps {
  open: boolean;
  editingApp: App | null;
  onClose: () => void;
  onSubmit: (input: CreateAppInput) => void;
}

function AppModal({ open, editingApp, onClose, onSubmit }: AppModalProps) {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const faviconPreview = useMemo(() => getFaviconUrl(url), [url]);

  const resetAndOpen = () => {
    if (editingApp) {
      setUrl(editingApp.url);
      setName(editingApp.name);
      setCategory(editingApp.category ?? "");
    } else {
      setUrl("");
      setName("");
      setCategory("");
    }
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      new URL(url);
    } catch {
      setError("Please enter a valid URL (e.g., https://example.com)");
      return;
    }

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    onSubmit({ url, name: name.trim(), category: category.trim() || undefined });
    setUrl("");
    setName("");
    setCategory("");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onAnimationStart={resetAndOpen}
            className="fixed inset-x-4 top-1/2 z-50 mx-auto w-full max-w-md -translate-y-1/2
              rounded-[1.5rem] border border-surface-200/60 dark:border-surface-700/40
              bg-white dark:bg-surface-800 p-6 shadow-glass sm:rounded-[2rem] sm:p-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold tracking-tightest text-surface-900 dark:text-surface-50">
                {editingApp ? "Edit Application" : "Add Application"}
              </h2>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-xl
                  text-surface-400 dark:text-surface-500 transition-colors
                  hover:bg-surface-100 dark:hover:bg-surface-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* URL */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-surface-500 dark:text-surface-400">
                  URL *
                </label>
                <div className="relative">
                  <LinkIcon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-300 dark:text-surface-600" />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://app.example.com"
                    required
                    className="w-full rounded-2xl border border-surface-200 dark:border-surface-700
                      bg-surface-50 dark:bg-surface-900 py-3 pl-10 pr-4 text-sm
                      text-surface-900 dark:text-surface-50 outline-none transition-all
                      placeholder:text-surface-300 dark:placeholder:text-surface-600
                      focus:border-surface-400 dark:focus:border-surface-500
                      focus:ring-2 focus:ring-surface-100 dark:focus:ring-surface-700"
                  />
                  {faviconPreview && (
                    <img
                      src={faviconPreview}
                      alt=""
                      className="absolute right-3.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded"
                      onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                    />
                  )}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-surface-500 dark:text-surface-400">
                  Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="My Application"
                  required
                  className="w-full rounded-2xl border border-surface-200 dark:border-surface-700
                    bg-surface-50 dark:bg-surface-900 py-3 px-4 text-sm
                    text-surface-900 dark:text-surface-50 outline-none transition-all
                    placeholder:text-surface-300 dark:placeholder:text-surface-600
                    focus:border-surface-400 dark:focus:border-surface-500
                    focus:ring-2 focus:ring-surface-100 dark:focus:ring-surface-700"
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-surface-500 dark:text-surface-400">
                  Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Productivity, Communication, Tools..."
                  className="w-full rounded-2xl border border-surface-200 dark:border-surface-700
                    bg-surface-50 dark:bg-surface-900 py-3 px-4 text-sm
                    text-surface-900 dark:text-surface-50 outline-none transition-all
                    placeholder:text-surface-300 dark:placeholder:text-surface-600
                    focus:border-surface-400 dark:focus:border-surface-500
                    focus:ring-2 focus:ring-surface-100 dark:focus:ring-surface-700"
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-red-500 dark:text-red-400"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={!url}
                className="flex w-full items-center justify-center gap-2 rounded-2xl
                  bg-surface-900 dark:bg-surface-50 py-3 text-sm font-medium
                  text-white dark:text-surface-900 transition-all
                  hover:bg-surface-800 dark:hover:bg-surface-200
                  disabled:cursor-not-allowed disabled:opacity-50"
              >
                {editingApp ? (
                  <>
                    <Pencil className="h-4 w-4" /> Save Changes
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" /> Add Application
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
