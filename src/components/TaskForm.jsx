import { useNavigate, Link } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { CATEGORIES } from '../data/initialTasks';
import { ChevronLeft, Info, HelpCircle, Save } from 'lucide-react';
import { useState } from 'react';

export default function TaskForm({
  initialValues,
  submitButtonText,
  titleText,
  onSubmit,
}) {
  const navigate = useNavigate();
  const [customCategoryMode, setCustomCategoryMode] = useState(false);
  const [customCategoryInput, setCustomCategoryInput] = useState('');

  // Default values
  const defaultInitialValues = {
    title: initialValues?.title || '',
    description: initialValues?.description || '',
    status: initialValues?.status || 'todo',
    priority: initialValues?.priority || 'medium',
    category: initialValues?.category || CATEGORIES[0],
    dueDate: initialValues?.dueDate || new Date().toISOString().split('T')[0],
  };

  // Validation function
  const validate = (values) => {
    const errors = {};

    if (!values.title.trim()) {
      errors.title = 'Task title is required.';
    } else if (values.title.length < 3) {
      errors.title = 'Title must be at least 3 characters.';
    } else if (values.title.length > 80) {
      errors.title = 'Title must be under 80 characters.';
    }

    if (!values.description.trim()) {
      errors.description = 'Description is required.';
    } else if (values.description.length < 10) {
      errors.description = 'Description must be at least 10 characters.';
    }

    if (!values.dueDate) {
      errors.dueDate = 'Due date is required.';
    } else {
      const selectedDate = new Date(values.dueDate);
      if (isNaN(selectedDate.getTime())) {
        errors.dueDate = 'Please select a valid date.';
      }
    }

    if (!values.category.trim()) {
      errors.category = 'Category is required.';
    }

    return errors;
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useForm({
    initialValues: defaultInitialValues,
    validate,
    onSubmit: (formValues) => {
      onSubmit(formValues);
    },
  });

  return (
    <div id="task-form-wrapper" className="max-w-2xl mx-auto">
      {/* Back to Home Link */}
      <Link
        id="link-back-to-home"
        to="/"
        className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-[#141414] border-b-2 border-[#141414] pb-0.5 mb-6 hover:opacity-80 transition"
      >
        <ChevronLeft className="w-4 h-4 stroke-[2.5px]" />
        <span>Back to workspace</span>
      </Link>

      <div className="bg-white border-4 border-[#141414] rounded-none brutalist-shadow">
        {/* Form Header */}
        <div className="bg-[#DCDAD7] border-b-4 border-[#141414] px-6 py-5">
          <h2 className="text-xl font-black text-[#141414] uppercase tracking-wider font-display">
            {titleText}
          </h2>
          <p className="text-xs text-[#141414]/85 font-mono uppercase tracking-wider mt-1.5">
            Define the workspace parameters for this item.
          </p>
        </div>

        {/* Form Body */}
        <form id="task-form" onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Task Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="text-xs font-black text-[#141414] block uppercase tracking-wider">
              Task Title <span className="text-rose-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g., Conduct user research sessions"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3.5 py-2.5 bg-white text-[#141414] border-2 border-[#141414] rounded-none text-sm font-bold tracking-wide transition outline-none focus:bg-amber-50/40 ${
                touched.title && errors.title
                  ? 'bg-rose-50 border-rose-500'
                  : 'focus:border-[#141414]'
              }`}
            />
            {touched.title && errors.title && (
              <p id="error-title" className="text-xs font-black uppercase tracking-wider text-rose-600 mt-1">
                {errors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="text-xs font-black text-[#141414] block uppercase tracking-wider">
              Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Provide a thorough, action-oriented outline of this task's scope and objectives..."
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3.5 py-2.5 bg-white text-[#141414] border-2 border-[#141414] rounded-none text-sm font-bold tracking-wide transition outline-none focus:bg-amber-50/40 resize-none ${
                touched.description && errors.description
                  ? 'bg-rose-50 border-rose-500'
                  : 'focus:border-[#141414]'
              }`}
            />
            {touched.description && errors.description ? (
              <p id="error-description" className="text-xs font-black uppercase tracking-wider text-rose-600 mt-1">
                {errors.description}
              </p>
            ) : (
              <p className="text-[10px] text-[#141414]/60 flex items-center gap-1 font-mono uppercase tracking-wide mt-1">
                <Info className="w-3.5 h-3.5 text-[#141414]" />
                Minimum 10 characters required.
              </p>
            )}
          </div>

          {/* Double Column Grid: Due Date & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Due Date */}
            <div className="space-y-2">
              <label htmlFor="dueDate" className="text-xs font-black text-[#141414] block uppercase tracking-wider">
                Due Date <span className="text-rose-500">*</span>
              </label>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                value={values.dueDate}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-3.5 py-2.5 bg-white text-[#141414] border-2 border-[#141414] rounded-none text-sm font-bold tracking-wide transition outline-none focus:bg-amber-50/40 ${
                  touched.dueDate && errors.dueDate
                    ? 'bg-rose-50 border-rose-500'
                    : 'focus:border-[#141414]'
                }`}
              />
              {touched.dueDate && errors.dueDate && (
                <p id="error-dueDate" className="text-xs font-black uppercase tracking-wider text-rose-600 mt-1">
                  {errors.dueDate}
                </p>
              )}
            </div>

            {/* Category selection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="category" className="text-xs font-black text-[#141414] block uppercase tracking-wider">
                  Category <span className="text-rose-500">*</span>
                </label>
                <button
                  id="btn-toggle-custom-category"
                  type="button"
                  onClick={() => {
                    setCustomCategoryMode(!customCategoryMode);
                    if (customCategoryMode) {
                      setFieldValue('category', CATEGORIES[0]);
                    } else {
                      setFieldValue('category', '');
                    }
                  }}
                  className="text-[10px] font-black text-[#141414] bg-yellow-200 hover:bg-yellow-300 border-2 border-[#141414] px-2.5 py-1 rounded-none transition uppercase tracking-wider cursor-pointer shadow-[1px_1px_0px_#141414]"
                >
                  {customCategoryMode ? 'Existing' : '+ Custom'}
                </button>
              </div>

              {customCategoryMode ? (
                <div className="flex gap-2">
                  <input
                    id="custom-category-input"
                    type="text"
                    placeholder="Type new category..."
                    value={customCategoryInput}
                    onChange={(e) => {
                      setCustomCategoryInput(e.target.value);
                      setFieldValue('category', e.target.value);
                    }}
                    onBlur={handleBlur}
                    className={`w-full px-3.5 py-2.5 bg-white text-[#141414] border-2 border-[#141414] rounded-none text-sm font-bold tracking-wide transition outline-none focus:bg-amber-50/40 ${
                      touched.category && errors.category
                        ? 'bg-rose-50 border-rose-500'
                        : 'focus:border-[#141414]'
                    }`}
                  />
                </div>
              ) : (
                <select
                  id="category"
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-3.5 py-2.5 bg-white text-[#141414] border-2 border-[#141414] rounded-none text-sm font-bold tracking-wide transition outline-none cursor-pointer focus:bg-amber-50/40 ${
                    touched.category && errors.category
                      ? 'bg-rose-50 border-rose-500'
                      : 'focus:border-[#141414]'
                  }`}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              )}

              {touched.category && errors.category && (
                <p id="error-category" className="text-xs font-black uppercase tracking-wider text-rose-600 mt-1">
                  {errors.category}
                </p>
              )}
            </div>
          </div>

          {/* Two Fields Grid: Priority Selector & Status Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1.5">
            {/* Priority Option Cards */}
            <div className="space-y-2">
              <span className="text-xs font-black text-[#141414] block uppercase tracking-wider">
                Priority Level <span className="text-rose-500">*</span>
              </span>
              <div className="grid grid-cols-3 gap-2">
                {['low', 'medium', 'high'].map((prio) => {
                  const isActive = values.priority === prio;
                  const getCardStyles = () => {
                    if (!isActive) return 'border-[#141414] text-[#141414] bg-white opacity-50 hover:opacity-100';
                    switch (prio) {
                      case 'low':
                        return 'border-[#141414] bg-[#D1F2D9] text-[#141414] shadow-[3px_3px_0px_#141414] translate-x-[-1px] translate-y-[-1px]';
                      case 'medium':
                        return 'border-[#141414] bg-[#FFE5B4] text-[#141414] shadow-[3px_3px_0px_#141414] translate-x-[-1px] translate-y-[-1px]';
                      case 'high':
                        return 'border-[#141414] bg-rose-400 text-[#141414] shadow-[3px_3px_0px_#141414] translate-x-[-1px] translate-y-[-1px]';
                    }
                  };

                  return (
                    <button
                      key={prio}
                      id={`prio-btn-${prio}`}
                      type="button"
                      onClick={() => setFieldValue('priority', prio)}
                      className={`py-2.5 px-3 border-2 rounded-none text-xs font-black uppercase tracking-wider transition text-center cursor-pointer ${getCardStyles()}`}
                    >
                      {prio}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Status Selector */}
            <div className="space-y-2">
              <label htmlFor="status" className="text-xs font-black text-[#141414] block uppercase tracking-wider">
                Lifecycle Status <span className="text-rose-500">*</span>
              </label>
              <select
                id="status"
                name="status"
                value={values.status}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-3.5 py-2.5 bg-white text-[#141414] border-2 border-[#141414] rounded-none text-sm font-bold tracking-wide transition outline-none cursor-pointer focus:bg-amber-50/40"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Form Actions footer */}
          <div className="flex items-center justify-end gap-2 pt-6 border-t-2 border-[#141414]">
            <Link
              id="btn-cancel-form"
              to="/"
              className="px-5 py-3 text-xs font-black uppercase tracking-wider text-[#141414] hover:bg-[#DCDAD7] border-2 border-transparent rounded-none transition cursor-pointer"
            >
              Cancel
            </Link>
            <button
              id="btn-submit-task"
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 bg-[#141414] text-white hover:bg-white hover:text-[#141414] border-2 border-[#141414] text-xs font-black uppercase tracking-wider rounded-none transition duration-150 brutalist-shadow-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
            >
              <Save className="w-4 h-4 stroke-[2.5px]" />
              <span>{submitButtonText}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
