import { motion } from "framer-motion";
import { LayoutGrid, Settings, X } from "lucide-react";

interface HeaderProps {
  adminMode: boolean;
  onToggleAdmin: () => void;
}

export function Header({ adminMode, onToggleAdmin }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-center justify-between px-6 py-8 md:px-12 md:py-10"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-900">
          <LayoutGrid className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight">OfficeHub</h1>
          <p className="text-xs text-surface-400">Your workspace, unified.</p>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggleAdmin}
        className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-medium
          transition-colors duration-200
          ${
            adminMode
              ? "bg-surface-900 text-white"
              : "bg-surface-100 text-surface-600 hover:bg-surface-200"
          }`}
      >
        {adminMode ? (
          <>
            <X className="h-4 w-4" /> Exit Admin
          </>
        ) : (
          <>
            <Settings className="h-4 w-4" /> Admin
          </>
        )}
      </motion.button>
    </motion.header>
  );
}