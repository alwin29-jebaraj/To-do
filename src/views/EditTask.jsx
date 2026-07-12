import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';
import { motion } from 'motion/react';
import { AlertCircle, ChevronLeft } from 'lucide-react';

export default function EditTask() {
  const { id } = useParams();
  const { getTaskById, updateTask } = useTasks();
  const navigate = useNavigate();

  const task = id ? getTaskById(id) : undefined;

  const handleEditSubmit = (formValues) => {
    if (task) {
      updateTask({
        ...task,
        ...formValues,
      });
      navigate('/');
    }
  };

  if (!task) {
    return (
      <div id="edit-task-not-found" className="min-h-screen bg-[#E4E3E0] flex items-center justify-center p-4 text-[#141414]">
        <div className="max-w-md w-full bg-white border-4 border-[#141414] p-6 text-center space-y-4 brutalist-shadow">
          <div className="p-3 bg-rose-200 border-2 border-[#141414] text-[#141414] rounded-none inline-block">
            <AlertCircle className="w-8 h-8 stroke-[2.5px]" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-base font-black uppercase tracking-wider text-[#141414]">Task Not Found</h3>
            <p className="text-xs text-[#141414]/70 font-mono">
              The task ID you are attempting to edit does not exist or may have been deleted in another session.
            </p>
          </div>
          <Link
            id="btn-edit-not-found-home"
            to="/"
            className="inline-flex items-center justify-center gap-1.5 w-full py-3 bg-white hover:bg-yellow-200 border-2 border-[#141414] text-[#141414] text-xs font-black uppercase tracking-wider rounded-none transition duration-150 brutalist-shadow-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.5px]" />
            <span>Return to Workspace</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      id="edit-task-view"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.22 }}
      className="min-h-screen bg-[#E4E3E0] py-10 px-4 sm:px-6 lg:px-8 text-[#141414]"
    >
      <div className="max-w-2xl mx-auto mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-[#FFE5B4] border-2 border-[#141414] px-3.5 py-1.5 shadow-[2px_2px_0px_#141414] select-none">
          <span className="text-[10px] font-black tracking-widest uppercase font-mono text-[#141414]">
            Edit Mode
          </span>
        </div>
      </div>

      <TaskForm
        initialValues={task}
        titleText="Update Task Details"
        submitButtonText="Save Changes"
        onSubmit={handleEditSubmit}
      />
    </motion.div>
  );
}
