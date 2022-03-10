import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import { isAuthenticated } from "../services/auth";
import HomePage from '../components/HomePage';
import LoginPage from "../components/LoginPage";
import RegisterPage from "../components/RegisterPage";
import ListUrlPage from "../components/ListUrlPage";

const PrivateRoute = ({ component: Component, ...rest }) => {
    if(!isAuthenticated){
        return <Navigate to="/" replace />;
    }
};

const RoutesApp = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<HomePage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/url/views" element={<ListUrlPage/>} />
      <Route path="/url" element={
            <PrivateRoute>
              <h1>a</h1>
            </PrivateRoute>} />
    </Routes>
  </Router>
);

export default RoutesApp;