import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { isAuthenticated } from "../services/auth";
import HomePage from "../components/HomePage";
import LoginPage from "../components/LoginPage";
import RegisterPage from "../components/RegisterPage";
import ListUrlPage from "../components/ListUrlPage";
import ListUrlPageUser from "../components/ListUrlPageUser";

const PrivateRoute = ({ children }) => {
  let auth = isAuthenticated;
  return !auth ? <Navigate to="/login" /> : children;
};

const RoutesApp = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/url/views" element={<ListUrlPage />} />
        <Route
          path="/url/views/user"
          element={
            <PrivateRoute>
              <ListUrlPageUser />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default RoutesApp;
