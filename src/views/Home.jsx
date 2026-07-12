import Header from '../components/Header';
import TaskTable from '../components/TaskTable';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <motion.div
      id="home-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="min-h-screen bg-zinc-50 pb-16"
    >
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <TaskTable />
      </main>
    </motion.div>
  );
}
