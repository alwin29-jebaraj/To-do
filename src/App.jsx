/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Home from './views/Home';
import CreateTask from './views/CreateTask';
import EditTask from './views/EditTask';
import DeleteTask from './views/DeleteTask';

export default function App() {
  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="/edit/:id" element={<EditTask />} />
          <Route path="/delete/:id" element={<DeleteTask />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </TaskProvider>
  );
}

