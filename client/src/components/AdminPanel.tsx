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
      className="mx-6 mb-6 overflow-hidden rounded-bento-lg bg-surface-900 p-6
        text-white md:mx-12"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold">Admin Mode</h2>
          <p className="mt-0.5 text-sm text-surface-400">
            {appCount} application{appCount !== 1 ? "s" : ""} configured
          </p>
        </div>

        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRefresh}
            className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2.5
              text-sm font-medium transition-colors hover:bg-white/20"
          >
            <RefreshCw className="h-4 w-4" /> Refresh
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onAddClick}
            className="flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5
              text-sm font-medium text-surface-900 transition-colors hover:bg-surface-100"
          >
            <Plus className="h-4 w-4" /> Add App
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}