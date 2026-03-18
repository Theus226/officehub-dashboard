import { forwardRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Trash2, GripVertical } from "lucide-react";
import type { App } from "../types";

interface AppCardProps {
  app: App;
  index: number;
  adminMode: boolean;
  onDelete: (id: string) => void;
}

export const AppCard = forwardRef<HTMLDivElement, AppCardProps>(function AppCard(
  { app, index, adminMode, onDelete },
  ref
) {
  const handleClick = () => {
    if (!adminMode) {
      window.open(app.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      whileHover={!adminMode ? { y: -4, transition: { duration: 0.2 } } : {}}
      onClick={handleClick}
      className={`bento-card group flex flex-col items-center justify-center gap-4
        p-8 md:p-10 cursor-pointer select-none
        bg-white dark:bg-surface-800 transition-colors
        ${adminMode ? "ring-2 ring-dashed ring-surface-200 dark:ring-surface-700" : ""}`}
    >
      {adminMode && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(app.id);
          }}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center
            rounded-xl bg-red-50 dark:bg-red-950 text-red-500 transition-colors hover:bg-red-100 dark:hover:bg-red-900"
        >
          <Trash2 className="h-4 w-4" />
        </motion.button>
      )}

      {adminMode && (
        <div className="absolute left-3 top-3 text-surface-300 dark:text-surface-600">
          <GripVertical className="h-4 w-4" />
        </div>
      )}

      <div className="relative">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-50 dark:bg-surface-700
          shadow-sm transition-transform duration-300 group-hover:scale-110"
        >
          <img
            src={app.favicon}
            alt={`${app.name} icon`}
            className="h-9 w-9 rounded-lg object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                `https://ui-avatars.com/api/?name=${encodeURIComponent(app.name)}&background=f5f5f5&color=171717&size=64&font-size=0.4&bold=true`;
            }}
          />
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-sm font-semibold text-surface-800 dark:text-surface-100">{app.name}</h3>
        {app.category && (
          <span className="mt-1 inline-block text-[11px] font-medium text-surface-400 dark:text-surface-500">
            {app.category}
          </span>
        )}
      </div>

      {!adminMode && (
        <div
          className="absolute bottom-3 right-3 opacity-0 transition-opacity
          duration-200 group-hover:opacity-100"
        >
          <ExternalLink className="h-3.5 w-3.5 text-surface-300 dark:text-surface-600" />
        </div>
      )}
    </motion.div>
  );
});