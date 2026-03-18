import { motion } from "framer-motion";
import { Plus, RefreshCw } from "lucide-react";

interface AdminPanelProps {
  onAddClick: () => void;
  onRefresh: () => void;
  appCount: number;
}

export function AdminPanel({ onAddClick, onRefresh, appCount }: AdminPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="mx-6 mb-6 overflow-hidden rounded-bento-lg bg-surface-900 dark:bg-surface-800 p-6
        text-white md:mx-12 transition-colors"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold">Admin Mode</h2>
          <p className="mt-0.5 text-sm text-surface-400 dark:text-surface-500">
            {appCount} application{appCount !== 1 ? "s" : ""} configured
          </p>
        </div>

        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRefresh}
            className="flex items-center gap-2 rounded-2xl bg-white/10 dark:bg-white/5 px-4 py-2.5
              text-sm font-medium transition-colors hover:bg-white/20 dark:hover:bg-white/10"
          >
            <RefreshCw className="h-4 w-4" /> Refresh
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onAddClick}
            className="flex items-center gap-2 rounded-2xl bg-white dark:bg-surface-700 px-4 py-2.5
              text-sm font-medium text-surface-900 dark:text-white transition-colors hover:bg-surface-100 dark:hover:bg-surface-600"
          >
            <Plus className="h-4 w-4" /> Add App
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}