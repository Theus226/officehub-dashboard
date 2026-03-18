import { motion } from "framer-motion";
import { LayoutGrid, Settings, X, Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

interface HeaderProps {
  adminMode: boolean;
  onToggleAdmin: () => void;
}

export function Header({ adminMode, onToggleAdmin }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-center justify-between px-6 py-8 md:px-12 md:py-10"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-900 dark:bg-surface-50">
          <LayoutGrid className="h-5 w-5 text-white dark:text-surface-900" />
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight">OfficeHub</h1>
          <p className="text-xs text-surface-400 dark:text-surface-500">Your workspace, unified.</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="flex items-center justify-center h-10 w-10 rounded-xl
            bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300
            hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </motion.button>

        {/* Admin Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleAdmin}
          className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-medium
            transition-colors duration-200
            ${
              adminMode
                ? "bg-surface-900 dark:bg-surface-50 text-white dark:text-surface-900"
                : "bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700"
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
      </div>
    </motion.header>
  );
}