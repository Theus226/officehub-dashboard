import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Loader2, Link as LinkIcon } from "lucide-react";
import type { CreateAppRequest } from "../types";

interface AddAppModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (request: CreateAppRequest) => Promise<void>;
}

export function AddAppModal({ open, onClose, onAdd }: AddAppModalProps) {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      new URL(url);
    } catch {
      setError("Please enter a valid URL (e.g., https://example.com)");
      return;
    }

    try {
      setLoading(true);
      await onAdd({
        url,
        name: name.trim() || undefined,
        category: category.trim() || undefined,
      });
      setUrl("");
      setName("");
      setCategory("");
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-[20%] z-50 mx-auto max-w-md
              rounded-bento-lg bg-white dark:bg-surface-800 p-8 shadow-glass sm:inset-x-auto"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-50">Add Application</h2>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-xl
                  text-surface-400 dark:text-surface-500 transition-colors hover:bg-surface-100 dark:hover:bg-surface-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                    className="w-full rounded-2xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900
                      py-3 pl-10 pr-4 text-sm text-surface-900 dark:text-surface-50 outline-none transition-all
                      placeholder:text-surface-300 dark:placeholder:text-surface-600 focus:border-surface-400 dark:focus:border-surface-600 focus:ring-2
                      focus:ring-surface-100 dark:focus:ring-surface-700"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-surface-500 dark:text-surface-400">
                  Name (auto-detected if empty)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="My Application"
                  className="w-full rounded-2xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900
                    py-3 px-4 text-sm text-surface-900 dark:text-surface-50 outline-none transition-all
                    placeholder:text-surface-300 dark:placeholder:text-surface-600 focus:border-surface-400 dark:focus:border-surface-600 focus:ring-2
                    focus:ring-surface-100 dark:focus:ring-surface-700"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-surface-500 dark:text-surface-400">
                  Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Productivity, Communication, Tools..."
                  className="w-full rounded-2xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900
                    py-3 px-4 text-sm text-surface-900 dark:text-surface-50 outline-none transition-all
                    placeholder:text-surface-300 dark:placeholder:text-surface-600 focus:border-surface-400 dark:focus:border-surface-600 focus:ring-2
                    focus:ring-surface-100 dark:focus:ring-surface-700"
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
                disabled={loading || !url}
                className="flex w-full items-center justify-center gap-2 rounded-2xl
                  bg-surface-900 dark:bg-surface-700 py-3 text-sm font-medium text-white transition-all
                  hover:bg-surface-800 dark:hover:bg-surface-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                {loading ? "Discovering..." : "Add Application"}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}