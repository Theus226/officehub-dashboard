import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Inbox } from "lucide-react";
import { Header } from "./components/Header";
import { BentoGrid } from "./components/BentoGrid";
import { AdminPanel } from "./components/AdminPanel";
import { AddAppModal } from "./components/AddAppModal";
import { useApps } from "./hooks/useApps";

export function Dashboard() {
  const { apps, loading, addApp, removeApp, refresh } = useApps();
  const [adminMode, setAdminMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDelete = async (id: string) => {
    if (window.confirm("Remove this application?")) {
      await removeApp(id);
    }
  };

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 text-surface-900 dark:text-surface-50 transition-colors">
      <Header
        adminMode={adminMode}
        onToggleAdmin={() => setAdminMode((prev) => !prev)}
      />

      <AnimatePresence>
        {adminMode && (
          <AdminPanel
            onAddClick={() => setModalOpen(true)}
            onRefresh={refresh}
            appCount={apps.length}
          />
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex items-center justify-center py-32">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-8 w-8 rounded-full border-2 border-surface-200 dark:border-surface-700 border-t-surface-900 dark:border-t-surface-50"
          />
        </div>
      ) : apps.length === 0 ? (
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
        <BentoGrid apps={apps} adminMode={adminMode} onDelete={handleDelete} />
      )}

      <AddAppModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={async (request) => {
          await addApp(request);
        }}
      />
    </div>
  );
}