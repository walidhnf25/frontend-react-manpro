import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './index.css';
import App from './App.jsx';
import Login from './Login.jsx';
import Register from './register.jsx';
import Dashboard from './Dashboard.jsx';
import Produk from './Produk.jsx';
import Profile from './Profile.jsx';
import ChangePassword from './ChangePassword.jsx';

// Buat router
const router = createBrowserRouter([
  { path: "/", element: <App /> },           // Bisa jadi landing page / redirect ke login
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/produk", element: <Produk /> },
  { path: "/profile", element: <Profile /> },
  { path: "/changepassword", element: <ChangePassword /> },
]);

// Render aplikasi
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);