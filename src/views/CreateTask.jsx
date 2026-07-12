import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function CreateTask() {
  const { createTask } = useTasks();
  const navigate = useNavigate();

  const handleCreateSubmit = (formValues) => {
    createTask(formValues);
    navigate('/');
  };

  return (
    <motion.div
      id="create-task-view"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.22 }}
      className="min-h-screen bg-[#E4E3E0] py-10 px-4 sm:px-6 lg:px-8 text-[#141414]"
    >
      <div className="max-w-2xl mx-auto mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-[#D2E7FC] border-2 border-[#141414] px-3.5 py-1.5 shadow-[2px_2px_0px_#141414] select-none">
          <Sparkles className="w-4 h-4 text-[#141414]" />
          <span className="text-[10px] font-black tracking-widest uppercase font-mono text-[#141414]">
            Quick Action Panel
          </span>
        </div>
      </div>

      <TaskForm
        titleText="Define New Task"
        submitButtonText="Create Task"
        onSubmit={handleCreateSubmit}
      />
    </motion.div>
  );
}
