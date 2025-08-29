import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Produk from "./Produk";
import PrivateRoute from "./PrivateRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rute untuk login */}
        <Route path="/login" element={<Login />} />

        {/* Rute untuk dashboard yang dilindungi */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>   {/* <-- di sini dicek apakah user sudah login */}
              <Dashboard />  {/* Kalau sudah login, baru bisa masuk */}
            </PrivateRoute>
          }
        />
        <Route
          path="/produk"
          element={
            <PrivateRoute>   {/* <-- di sini dicek apakah user sudah login */}
              <Produk />  {/* Kalau sudah login, baru bisa masuk */}
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}