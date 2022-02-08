import React from 'react';
import { Routes, Route } from "react-router-dom";
import AnalysisLogs from '../pages/AnalysisLogs';
import AnalysisNew from '../pages/AnalysisNew';
import AnalysisReport from '../pages/AnalysisReport';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AuthRoute from './AuthRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<AuthRoute element={<Home />} />} />
      <Route path="/analysis/new" element={<AuthRoute element={<AnalysisNew />} />} />
      <Route path="/analysis/:id/logs" element={<AuthRoute element={<AnalysisLogs />} />} />
      <Route path="/analysis/:id/report" element={<AuthRoute element={<AnalysisReport />} />} />
    </Routes>
  );
}

export default AppRoutes;
