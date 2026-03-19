import { motion } from "framer-motion";
import { ExternalLink, Trash2, Pencil } from "lucide-react";
import type { App } from "../types";

interface AppCardProps {
  app: App;
  index: number;
  adminMode: boolean;
  onDelete: (id: string) => void;
  onEdit: (app: App) => void;
}

export function AppCard({ app, index, adminMode, onDelete, onEdit }: AppCardProps) {
  const handleClick = () => {
    if (!adminMode) {
      window.open(app.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={!adminMode ? { scale: 1.03, transition: { duration: 0.2 } } : {}}
      onClick={handleClick}
      className={`group relative flex flex-col items-center justify-center gap-3
        rounded-[1.5rem] border border-surface-200/60 dark:border-surface-700/40
        bg-white dark:bg-surface-800/80 p-5 sm:rounded-[2rem] sm:p-7 md:p-8
        shadow-bento transition-shadow duration-300
        hover:shadow-bento-hover
        ${adminMode ? "cursor-default ring-2 ring-dashed ring-surface-300 dark:ring-surface-600" : "cursor-pointer"}
        select-none`}
    >
      {adminMode && (
        <div className="absolute right-3 top-3 flex gap-1.5">
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(app);
            }}
            className="flex h-8 w-8 items-center justify-center rounded-xl
              bg-surface-100 dark:bg-surface-700 text-surface-500 dark:text-surface-300
              transition-colors hover:bg-surface-200 dark:hover:bg-surface-600"
          >
            <Pencil className="h-3.5 w-3.5" />
          </motion.button>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(app.id);
            }}
            className="flex h-8 w-8 items-center justify-center rounded-xl
              bg-red-50 dark:bg-red-950 text-red-500
              transition-colors hover:bg-red-100 dark:hover:bg-red-900"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </motion.button>
        </div>
      )}

      <div className="relative">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl
            bg-surface-50 dark:bg-surface-700 shadow-sm sm:h-14 sm:w-14 sm:rounded-2xl
            transition-transform duration-300 group-hover:scale-110"
        >
          <img
            src={app.favicon}
            alt={`${app.name} icon`}
            className="h-7 w-7 rounded-md object-contain sm:h-8 sm:w-8"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                `https://ui-avatars.com/api/?name=${encodeURIComponent(app.name)}&background=f5f5f5&color=171717&size=64&font-size=0.4&bold=true`;
            }}
          />
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-xs font-semibold tracking-tightest text-surface-800 dark:text-surface-100 sm:text-sm">
          {app.name}
        </h3>
        {app.category && (
          <span className="mt-0.5 inline-block text-[10px] font-medium text-surface-400 dark:text-surface-500 sm:text-[11px]">
            {app.category}
          </span>
        )}
      </div>

      {!adminMode && (
        <div className="absolute bottom-3 right-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <ExternalLink className="h-3.5 w-3.5 text-surface-300 dark:text-surface-600" />
        </div>
      )}
    </motion.div>
  );
}