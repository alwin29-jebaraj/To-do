import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import { motion } from 'motion/react';
import { AlertTriangle, Trash2, ChevronLeft, Calendar, Tag, AlertCircle } from 'lucide-react';

export default function DeleteTask() {
  const { id } = useParams();
  const { getTaskById, deleteTask } = useTasks();
  const navigate = useNavigate();

  const task = id ? getTaskById(id) : undefined;

  const handleDeleteConfirm = () => {
    if (task) {
      deleteTask(task.id);
      navigate('/');
    }
  };

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (!task) {
    return (
      <div id="delete-task-not-found" className="min-h-screen bg-[#E4E3E0] flex items-center justify-center p-4 text-[#141414]">
        <div className="max-w-md w-full bg-white border-4 border-[#141414] p-6 text-center space-y-4 brutalist-shadow">
          <div className="p-3 bg-rose-200 border-2 border-[#141414] text-[#141414] rounded-none inline-block">
            <AlertCircle className="w-8 h-8 stroke-[2.5px]" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-base font-black uppercase tracking-wider text-[#141414]">Task Not Found</h3>
            <p className="text-xs text-[#141414]/70 font-mono">
              The task ID you are attempting to delete does not exist or may have already been removed.
            </p>
          </div>
          <Link
            id="btn-delete-not-found-home"
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
      id="delete-task-view"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen bg-[#E4E3E0] flex items-center justify-center p-4 sm:p-6 text-[#141414]"
    >
      <div className="max-w-md w-full bg-white border-4 border-[#141414] brutalist-shadow overflow-hidden">
        {/* Warning Banner */}
        <div className="bg-rose-400 border-b-4 border-[#141414] px-6 py-5 flex items-start gap-3">
          <div className="p-2 bg-white border-2 border-[#141414] text-[#141414] rounded-none shrink-0">
            <AlertTriangle className="w-5 h-5 stroke-[2.5px]" />
          </div>
          <div className="space-y-1">
            <h2 className="text-sm font-black uppercase tracking-wider font-display text-[#141414]">
              Confirm Task Deletion
            </h2>
            <p className="text-xs text-[#141414]/90 font-mono uppercase tracking-wide">
              This operation is irreversible.
            </p>
          </div>
        </div>

        {/* Task Details Info box */}
        <div className="p-6 space-y-5">
          <div className="space-y-2">
            <span className="text-[10px] font-black text-[#141414]/60 uppercase tracking-widest block">
              Item to be removed
            </span>
            <h3 className="text-lg font-black text-[#141414] leading-snug">
              {task.title}
            </h3>
            <p className="text-xs text-[#141414]/85 font-serif italic bg-zinc-150 p-4 border-2 border-[#141414] rounded-none">
              {task.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1 text-[11px] text-[#141414] bg-[#FFE5B4] px-2.5 py-1 rounded-none border-2 border-[#141414] font-black uppercase tracking-wider shadow-[1px_1px_0px_#141414]">
              <Tag className="w-3.5 h-3.5 text-[#141414]" />
              {task.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold font-mono text-[#141414] bg-[#D2E7FC] px-2.5 py-1 rounded-none border-2 border-[#141414] shadow-[1px_1px_0px_#141414] ml-auto">
              <Calendar className="w-3.5 h-3.5 text-[#141414]" />
              <span>Due {formatDate(task.dueDate)}</span>
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-5 border-t-2 border-[#141414]">
            <Link
              id="btn-cancel-delete"
              to="/"
              className="flex-1 inline-flex items-center justify-center py-3 bg-[#DCDAD7] hover:bg-zinc-300 border-2 border-[#141414] text-[#141414] text-xs font-black uppercase tracking-wider rounded-none transition duration-150 brutalist-shadow-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
            >
              Cancel
            </Link>
            <button
              id="btn-confirm-delete"
              onClick={handleDeleteConfirm}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 bg-rose-500 hover:bg-rose-600 border-2 border-[#141414] text-white text-xs font-black uppercase tracking-wider rounded-none transition duration-150 brutalist-shadow-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 stroke-[2.5px]" />
              <span>Delete Task</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
