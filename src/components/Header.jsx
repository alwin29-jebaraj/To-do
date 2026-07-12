import { Link } from 'react-router-dom';
import { LayoutDashboard, CheckCircle2, CircleDot, ClipboardList, PlusCircle } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

export default function Header() {
  const { tasks } = useTasks();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'completed').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'in-progress').length;
  const todoTasks = tasks.filter((t) => t.status === 'todo').length;

  return (
    <header id="app-header" className="bg-[#DCDAD7] border-b-4 border-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#141414]"></div>
              <span className="text-xs uppercase tracking-widest font-black opacity-60">System Module 01</span>
            </div>
            <div>
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] font-display text-[#141414] select-none">
                Tasks
                <span className="font-serif italic text-2xl sm:text-3xl font-normal lowercase tracking-normal ml-3 select-none text-[#141414]/75">
                  workspace
                </span>
              </h1>
              <p className="text-xs font-mono uppercase text-[#141414]/60 mt-3.5 tracking-wider">
                Manage, organize, and execute team milestones with maximum precision.
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <Link
              id="btn-create-task-header"
              to="/create"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#141414] text-white hover:bg-white hover:text-[#141414] border-2 border-[#141414] font-black text-xs uppercase tracking-wider rounded-none transition duration-150 brutalist-shadow-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Task</span>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#CAC8C4] border-2 border-[#141414] rounded-none p-4 flex items-center justify-between brutalist-shadow-sm">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-[#141414] uppercase tracking-wider opacity-60">Total Tasks</span>
              <p className="text-3xl font-black text-[#141414] font-display leading-tight">{totalTasks}</p>
            </div>
            <div className="p-2 bg-white border border-[#141414] text-[#141414] rounded-none">
              <ClipboardList className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-[#FFE5B4] border-2 border-[#141414] rounded-none p-4 flex items-center justify-between brutalist-shadow-sm">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-[#141414] uppercase tracking-wider opacity-60">To Do</span>
              <p className="text-3xl font-black text-[#141414] font-display leading-tight">{todoTasks}</p>
            </div>
            <div className="p-2 bg-white border border-[#141414] text-[#141414] rounded-none">
              <CircleDot className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-[#D2E7FC] border-2 border-[#141414] rounded-none p-4 flex items-center justify-between brutalist-shadow-sm">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-[#141414] uppercase tracking-wider opacity-60">In Progress</span>
              <p className="text-3xl font-black text-[#141414] font-display leading-tight">{inProgressTasks}</p>
            </div>
            <div className="p-2 bg-white border border-[#141414] text-[#141414] rounded-none">
              <div className="w-5 h-5 border-2 border-[#141414] border-t-transparent animate-spin" />
            </div>
          </div>

          <div className="bg-[#D1F2D9] border-2 border-[#141414] rounded-none p-4 flex items-center justify-between brutalist-shadow-sm">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-[#141414] uppercase tracking-wider opacity-60">Completed</span>
              <p className="text-3xl font-black text-[#141414] font-display leading-tight">{completedTasks}</p>
            </div>
            <div className="p-2 bg-white border border-[#141414] text-[#141414] rounded-none">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
