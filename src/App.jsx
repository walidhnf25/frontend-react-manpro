import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Produk from "./Produk";
import PrivateRoute from "./PrivateRoute";

export default function App() {
  return (
    <Routes>
      {/* default route */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />
      
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/produk"
        element={
          <PrivateRoute>
            <Produk />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}