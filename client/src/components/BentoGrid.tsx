import { AnimatePresence } from "framer-motion";
import { AppCard } from "./AppCard";
import type { App } from "../types";

interface BentoGridProps {
  apps: App[];
  adminMode: boolean;
  onDelete: (id: string) => void;
}

export function BentoGrid({ apps, adminMode, onDelete }: BentoGridProps) {
  return (
    <div
      className="grid grid-cols-2 gap-4 px-6 pb-12 sm:grid-cols-3
        md:grid-cols-4 md:gap-5 md:px-12 lg:grid-cols-5 xl:grid-cols-6"
    >
      <AnimatePresence mode="popLayout">
        {apps.map((app, index) => (
          <AppCard
            key={app.id}
            app={app}
            index={index}
            adminMode={adminMode}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}