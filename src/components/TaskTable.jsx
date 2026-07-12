import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  X,
  Edit2,
  Trash2,
  Calendar,
  AlertCircle,
  Tag,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { CATEGORIES } from '../data/initialTasks';
import { useTasks } from '../context/TaskContext';
import { motion, AnimatePresence } from 'motion/react';

export default function TaskTable() {
  const { tasks } = useTasks();

  // Filters state
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    priority: 'all',
    category: 'all',
    sortBy: 'dueDate',
    sortOrder: 'asc',
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Categories extracted from current tasks to ensure we cover all of them
  const dynamicCategories = useMemo(() => {
    const cats = new Set(CATEGORIES);
    tasks.forEach((task) => {
      if (task.category) cats.add(task.category);
    });
    return Array.from(cats).sort();
  }, [tasks]);

  // Handle changes
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(1); // Reset page on filter change
  };

  const handleSort = (field) => {
    setFilters((prev) => {
      const isSameField = prev.sortBy === field;
      const nextOrder = isSameField && prev.sortOrder === 'asc' ? 'desc' : 'asc';
      return {
        ...prev,
        sortBy: field,
        sortOrder: nextOrder,
      };
    });
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      priority: 'all',
      category: 'all',
      sortBy: 'dueDate',
      sortOrder: 'asc',
    });
    setCurrentPage(1);
  };

  // Sort and Filter Logic
  const filteredAndSortedTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        const matchesSearch =
          task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          task.description.toLowerCase().includes(filters.search.toLowerCase());

        const matchesStatus = filters.status === 'all' || task.status === filters.status;
        const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
        const matchesCategory = filters.category === 'all' || task.category === filters.category;

        return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
      })
      .sort((a, b) => {
        let fieldA = a[filters.sortBy];
        let fieldB = b[filters.sortBy];

        if (filters.sortBy === 'title') {
          fieldA = fieldA.toLowerCase();
          fieldB = fieldB.toLowerCase();
        }

        // Handle priority weights for semantic sorting
        if (filters.sortBy === 'priority') {
          const weights = { high: 3, medium: 2, low: 1 };
          fieldA = weights[a.priority] || 0;
          fieldB = weights[b.priority] || 0;
        }

        // Handle status weights for semantic sorting
        if (filters.sortBy === 'status') {
          const weights = { todo: 1, 'in-progress': 2, completed: 3 };
          fieldA = weights[a.status] || 0;
          fieldB = weights[b.status] || 0;
        }

        if (fieldA < fieldB) return filters.sortOrder === 'asc' ? -1 : 1;
        if (fieldA > fieldB) return filters.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [tasks, filters]);

  // Pagination Logic
  const totalItems = filteredAndSortedTasks.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  
  // Guard current page range
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const paginatedTasks = useMemo(() => {
    const startIndex = (validCurrentPage - 1) * pageSize;
    return filteredAndSortedTasks.slice(startIndex, startIndex + pageSize);
  }, [filteredAndSortedTasks, validCurrentPage, pageSize]);

  // Render Sort Icon
  const renderSortIcon = (field) => {
    if (filters.sortBy !== field) {
      return <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400 opacity-40 group-hover:opacity-100 transition-opacity" />;
    }
    return filters.sortOrder === 'asc' ? (
      <ChevronUp className="w-3.5 h-3.5 text-indigo-600" />
    ) : (
      <ChevronDown className="w-3.5 h-3.5 text-indigo-600" />
    );
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-rose-400 text-[#141414] border-2 border-[#141414] rounded-none font-bold shadow-[1px_1px_0px_#141414]';
      case 'medium':
        return 'bg-[#FFE5B4] text-[#141414] border-2 border-[#141414] rounded-none font-bold shadow-[1px_1px_0px_#141414]';
      case 'low':
        return 'bg-[#D1F2D9] text-[#141414] border-2 border-[#141414] rounded-none font-bold shadow-[1px_1px_0px_#141414]';
      default:
        return 'bg-white text-[#141414] border-2 border-[#141414] rounded-none font-bold shadow-[1px_1px_0px_#141414]';
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-400 text-[#141414] border-2 border-[#141414] rounded-none font-black shadow-[1px_1px_0px_#141414]';
      case 'in-progress':
        return 'bg-[#D2E7FC] text-[#141414] border-2 border-[#141414] rounded-none font-black shadow-[1px_1px_0px_#141414]';
      case 'todo':
        return 'bg-zinc-300 text-[#141414] border-2 border-[#141414] rounded-none font-black shadow-[1px_1px_0px_#141414]';
      default:
        return 'bg-zinc-300 text-[#141414] border-2 border-[#141414] rounded-none font-black shadow-[1px_1px_0px_#141414]';
    }
  };

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const hasActiveFilters = 
    filters.search !== '' || 
    filters.status !== 'all' || 
    filters.priority !== 'all' || 
    filters.category !== 'all';

  return (
    <div id="task-table-section" className="space-y-6">
      {/* Search and Filters panel */}
      <div className="bg-[#DCDAD7] border-4 border-[#141414] rounded-none p-5 brutalist-shadow">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#141414] opacity-80 pointer-events-none" />
              <input
                id="search-input"
                type="text"
                placeholder="Search by title or description..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 bg-white text-[#141414] border-2 border-[#141414] rounded-none transition text-sm font-black tracking-wide outline-none focus:bg-amber-50/40"
              />
              {filters.search && (
                <button
                  id="btn-clear-search"
                  onClick={() => handleFilterChange('search', '')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#141414] hover:bg-zinc-200 border border-[#141414] p-1 rounded-none transition bg-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Status Filter */}
              <div className="relative">
                <select
                  id="filter-status"
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full pl-3.5 pr-10 py-2.5 bg-white text-[#141414] border-2 border-[#141414] rounded-none transition text-sm font-black tracking-wide outline-none appearance-none cursor-pointer focus:bg-amber-50/40"
                >
                  <option value="all">All Statuses</option>
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#141414] pointer-events-none" />
              </div>

              {/* Priority Filter */}
              <div className="relative">
                <select
                  id="filter-priority"
                  value={filters.priority}
                  onChange={(e) => handleFilterChange('priority', e.target.value)}
                  className="w-full pl-3.5 pr-10 py-2.5 bg-white text-[#141414] border-2 border-[#141414] rounded-none transition text-sm font-black tracking-wide outline-none appearance-none cursor-pointer focus:bg-amber-50/40"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#141414] pointer-events-none" />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <select
                  id="filter-category"
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full pl-3.5 pr-10 py-2.5 bg-white text-[#141414] border-2 border-[#141414] rounded-none transition text-sm font-black tracking-wide outline-none appearance-none cursor-pointer focus:bg-amber-50/40"
                >
                  <option value="all">All Categories</option>
                  {dynamicCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#141414] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active Filter Badges */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t-2 border-[#141414]">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-[#141414] font-black uppercase tracking-widest text-[10px] mr-1 inline-flex items-center gap-1 select-none">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#141414]" />
                  Active Filters:
                </span>
                {filters.search && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-200 text-[#141414] border-2 border-[#141414] rounded-none font-bold text-xs shadow-[2px_2px_0px_#141414]">
                    Search: "{filters.search}"
                    <button onClick={() => handleFilterChange('search', '')} className="hover:bg-yellow-300 rounded-none p-0.5 text-[#141414] cursor-pointer">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.status !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-200 text-[#141414] border-2 border-[#141414] rounded-none font-bold text-xs shadow-[2px_2px_0px_#141414]">
                    Status: {filters.status}
                    <button onClick={() => handleFilterChange('status', 'all')} className="hover:bg-yellow-300 rounded-none p-0.5 text-[#141414] cursor-pointer">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.priority !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-200 text-[#141414] border-2 border-[#141414] rounded-none font-bold text-xs shadow-[2px_2px_0px_#141414]">
                    Priority: {filters.priority}
                    <button onClick={() => handleFilterChange('priority', 'all')} className="hover:bg-yellow-300 rounded-none p-0.5 text-[#141414] cursor-pointer">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.category !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-200 text-[#141414] border-2 border-[#141414] rounded-none font-bold text-xs shadow-[2px_2px_0px_#141414]">
                    Category: {filters.category}
                    <button onClick={() => handleFilterChange('category', 'all')} className="hover:bg-yellow-300 rounded-none p-0.5 text-[#141414] cursor-pointer">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
              <button
                id="btn-clear-all-filters"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-white bg-rose-500 hover:bg-rose-600 border-2 border-[#141414] px-4 py-1.5 rounded-none transition cursor-pointer brutalist-shadow-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Table Layout */}
      <div className="bg-white border-4 border-[#141414] rounded-none overflow-hidden brutalist-shadow">
        {/* Responsive Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#CAC8C4] border-b-4 border-[#141414]">
                <th
                  onClick={() => handleSort('title')}
                  className="px-6 py-4 text-xs font-black text-[#141414] uppercase tracking-wider cursor-pointer group hover:bg-[#DCDAD7] select-none border-r-2 border-[#141414]"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Task Name</span>
                    {renderSortIcon('title')}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('category')}
                  className="px-6 py-4 text-xs font-black text-[#141414] uppercase tracking-wider cursor-pointer group hover:bg-[#DCDAD7] select-none border-r-2 border-[#141414]"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Category</span>
                    {renderSortIcon('category')}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('status')}
                  className="px-6 py-4 text-xs font-black text-[#141414] uppercase tracking-wider cursor-pointer group hover:bg-[#DCDAD7] select-none border-r-2 border-[#141414]"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Status</span>
                    {renderSortIcon('status')}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('priority')}
                  className="px-6 py-4 text-xs font-black text-[#141414] uppercase tracking-wider cursor-pointer group hover:bg-[#DCDAD7] select-none border-r-2 border-[#141414]"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Priority</span>
                    {renderSortIcon('priority')}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('dueDate')}
                  className="px-6 py-4 text-xs font-black text-[#141414] uppercase tracking-wider cursor-pointer group hover:bg-[#DCDAD7] select-none border-r-2 border-[#141414]"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Due Date</span>
                    {renderSortIcon('dueDate')}
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-black text-[#141414] uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-[#141414]">
              <AnimatePresence mode="popLayout">
                {paginatedTasks.length > 0 ? (
                  paginatedTasks.map((task) => (
                    <motion.tr
                      key={task.id}
                      layoutId={task.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.18 }}
                      className="hover:bg-[#DCDAD7]/30 group"
                    >
                      <td className="px-6 py-4.5 max-w-sm border-r-2 border-[#141414]">
                        <div className="space-y-1">
                          <h4 className="text-sm font-black text-[#141414] leading-tight">
                            {task.title}
                          </h4>
                          <p className="text-xs text-[#141414]/75 font-serif italic line-clamp-1 group-hover:line-clamp-none transition-all duration-300">
                            {task.description}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4.5 whitespace-nowrap border-r-2 border-[#141414]">
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#141414] bg-[#FFE5B4] px-2.5 py-1 rounded-none border-2 border-[#141414] font-black uppercase tracking-wider shadow-[1px_1px_0px_#141414]">
                          <Tag className="w-3 h-3 text-[#141414]" />
                          {task.category || 'General'}
                        </span>
                      </td>
                      <td className="px-6 py-4.5 whitespace-nowrap border-r-2 border-[#141414]">
                        <span className={`inline-flex items-center px-2.5 py-0.5 text-xs uppercase tracking-wider ${getStatusStyles(task.status)}`}>
                          {task.status.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4.5 whitespace-nowrap border-r-2 border-[#141414]">
                        <span className={`inline-flex items-center px-2 py-0.5 text-xs uppercase tracking-wider ${getPriorityStyles(task.priority)}`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4.5 whitespace-nowrap border-r-2 border-[#141414]">
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold font-mono text-[#141414] bg-[#D2E7FC] px-2.5 py-1 rounded-none border-2 border-[#141414] shadow-[1px_1px_0px_#141414]">
                          <Calendar className="w-3.5 h-3.5 text-[#141414]" />
                          <span>{formatDate(task.dueDate)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4.5 whitespace-nowrap text-right">
                        <div className="inline-flex items-center justify-end gap-2">
                          <Link
                            id={`btn-edit-${task.id}`}
                            to={`/edit/${task.id}`}
                            className="p-1.5 bg-white hover:bg-yellow-200 border-2 border-[#141414] text-[#141414] rounded-none transition shadow-[2px_2px_0px_#141414] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-0 active:translate-y-0 cursor-pointer"
                            title="Edit Task"
                          >
                            <Edit2 className="w-3.5 h-3.5 stroke-[2.5px]" />
                          </Link>
                          <Link
                            id={`btn-delete-${task.id}`}
                            to={`/delete/${task.id}`}
                            className="p-1.5 bg-white hover:bg-rose-400 border-2 border-[#141414] text-[#141414] rounded-none transition shadow-[2px_2px_0px_#141414] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-0 active:translate-y-0 cursor-pointer"
                            title="Delete Task"
                          >
                            <Trash2 className="w-3.5 h-3.5 stroke-[2.5px]" />
                          </Link>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center bg-[#DCDAD7]/10">
                      <div className="max-w-md mx-auto flex flex-col items-center justify-center p-6 bg-white rounded-none border-4 border-[#141414] brutalist-shadow text-[#141414] space-y-3">
                        <div className="p-3 bg-rose-200 border-2 border-[#141414] text-[#141414] rounded-none">
                          <AlertCircle className="w-6 h-6 stroke-[2.5px]" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-black uppercase tracking-wider text-sm text-[#141414]">No matching tasks found</p>
                          <p className="text-xs text-[#141414]/70 font-mono">
                            We couldn't find any tasks matching your active query or selected filters.
                          </p>
                        </div>
                        {hasActiveFilters && (
                          <button
                            onClick={resetFilters}
                            className="text-xs font-black uppercase bg-[#141414] text-white hover:bg-white hover:text-[#141414] border-2 border-[#141414] px-4 py-2 rounded-none transition cursor-pointer brutalist-shadow-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                          >
                            Reset filters
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Responsive Mobile Layout (Card Stack) */}
        <div className="block md:hidden divide-y-2 divide-[#141414] bg-white">
          <AnimatePresence mode="popLayout">
            {paginatedTasks.length > 0 ? (
              paginatedTasks.map((task) => (
                <motion.div
                  key={`mob-${task.id}`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                  className="p-4 space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1.5">
                      <h4 className="text-sm font-black text-[#141414] leading-snug">
                        {task.title}
                      </h4>
                      <p className="text-xs text-[#141414]/75 font-serif italic">
                        {task.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[10px] text-[#141414] bg-[#FFE5B4] px-2 py-0.5 rounded-none border border-[#141414] font-black uppercase tracking-wider">
                      <Tag className="w-2.5 h-2.5 text-[#141414]" />
                      {task.category || 'General'}
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 text-[10px] uppercase tracking-wider ${getStatusStyles(task.status)}`}>
                      {task.status.replace('-', ' ')}
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 text-[10px] uppercase tracking-wider ${getPriorityStyles(task.priority)}`}>
                      {task.priority}
                    </span>
                    <div className="inline-flex items-center gap-1 text-[10px] font-bold font-mono text-[#141414] ml-auto">
                      <Calendar className="w-3 h-3 text-[#141414]" />
                      <span>{formatDate(task.dueDate)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-200">
                    <Link
                      id={`mob-btn-edit-${task.id}`}
                      to={`/edit/${task.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-[#141414] bg-[#FFE5B4] hover:bg-yellow-200 border-2 border-[#141414] rounded-none transition cursor-pointer brutalist-shadow-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                    >
                      <Edit2 className="w-3 h-3 stroke-[2.5px]" />
                      <span>Edit</span>
                    </Link>
                    <Link
                      id={`mob-btn-delete-${task.id}`}
                      to={`/delete/${task.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-white bg-rose-500 hover:bg-rose-600 border-2 border-[#141414] rounded-none transition cursor-pointer brutalist-shadow-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                    >
                      <Trash2 className="w-3 h-3 stroke-[2.5px]" />
                      <span>Delete</span>
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="py-12 text-center p-4 bg-zinc-100 text-[#141414] space-y-3">
                <div className="p-3 bg-rose-200 border-2 border-[#141414] text-[#141414] rounded-none inline-block">
                  <AlertCircle className="w-6 h-6 stroke-[2.5px]" />
                </div>
                <div className="space-y-1">
                  <p className="font-black uppercase tracking-wider text-sm text-[#141414]">No matching tasks found</p>
                  <p className="text-xs text-[#141414]/70 font-mono max-w-xs mx-auto">
                    We couldn't find any tasks matching your active query or selected filters.
                  </p>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-xs font-black uppercase bg-[#141414] text-white hover:bg-white hover:text-[#141414] border-2 border-[#141414] px-4 py-2 rounded-none transition cursor-pointer brutalist-shadow-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                  >
                    Reset filters
                  </button>
                )}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer with Pagination */}
        {totalItems > 0 && (
          <div className="bg-[#DCDAD7] border-t-4 border-[#141414] px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs font-black text-[#141414]">
              <span>
                Showing <strong className="text-[#141414] underline">{(validCurrentPage - 1) * pageSize + 1}</strong> to{' '}
                <strong className="text-[#141414] underline">{Math.min(validCurrentPage * pageSize, totalItems)}</strong> of{' '}
                <strong className="text-[#141414] underline">{totalItems}</strong> tasks
              </span>

              <div className="hidden sm:flex items-center gap-2 border-l-2 border-[#141414] pl-4">
                <span className="uppercase tracking-wider text-[10px]">Show:</span>
                <select
                  id="page-size-select"
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="bg-white border-2 border-[#141414] rounded-none px-1.5 py-0.5 text-[#141414] font-mono font-bold outline-none cursor-pointer"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1.5">
              <button
                id="btn-prev-page"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={validCurrentPage === 1}
                className="inline-flex items-center justify-center w-9 h-9 text-[#141414] bg-white hover:bg-yellow-200 border-2 border-[#141414] disabled:opacity-30 disabled:hover:bg-white rounded-none transition disabled:cursor-not-allowed cursor-pointer shadow-[1px_1px_0px_#141414]"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5px]" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                // Limit numbers shown for responsive pagination
                if (totalPages > 5) {
                  if (p !== 1 && p !== totalPages && Math.abs(p - validCurrentPage) > 1) {
                     if (p === 2 && validCurrentPage > 3) {
                       return <span key="dots-start" className="px-1.5 text-xs text-[#141414] font-bold select-none">...</span>;
                     }
                     if (p === totalPages - 1 && validCurrentPage < totalPages - 2) {
                       return <span key="dots-end" className="px-1.5 text-xs text-[#141414] font-bold select-none">...</span>;
                     }
                     return null;
                  }
                }

                return (
                  <button
                    key={p}
                    id={`btn-page-${p}`}
                    onClick={() => setCurrentPage(p)}
                    className={`w-9 h-9 text-xs font-black rounded-none border-2 border-[#141414] transition cursor-pointer ${
                      validCurrentPage === p
                        ? 'bg-[#141414] border-[#141414] text-white'
                        : 'bg-white border-[#141414] text-[#141414] hover:bg-yellow-200 brutalist-shadow-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none'
                    }`}
                  >
                    {p}
                  </button>
                );
              })}

              <button
                id="btn-next-page"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={validCurrentPage === totalPages}
                className="inline-flex items-center justify-center w-9 h-9 text-[#141414] bg-white hover:bg-yellow-200 border-2 border-[#141414] disabled:opacity-30 disabled:hover:bg-white rounded-none transition disabled:cursor-not-allowed cursor-pointer shadow-[1px_1px_0px_#141414]"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.5px]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
