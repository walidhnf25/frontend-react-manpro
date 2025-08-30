import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [totalProduk, setTotalProduk] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // ambil profile
    axios.get("https://manpro-api.teluapp.org/api/profile")
      .then(res => {
        setUser(res.data.user || res.data); // sesuaikan dengan response API
      })
      .catch(err => {
        console.error("Profile API error:", err.response);
        localStorage.removeItem("token");
        navigate("/login");
      });

    // ambil jumlah produk
    axios.get("https://manpro-api.teluapp.org/api/products/count")
      .then(res => setTotalProduk(res.data.total))
      .catch(err => console.error(err));
  }, [navigate]);

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <header className="navbar">
        <div className="navbar-left">
          <div className="logo" onClick={() => navigate("/dashboard")}>
            MANPRO
          </div>

          <div className="hamburger" onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>

          <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
            <a href="/dashboard">Dashboard</a>
            {user?.role === "manager" && <a href="/produk">Produk</a>}
          </nav>
        </div>

        <div className="navbar-right">
          <div
            className="profile-icon"
            onClick={() => navigate("/Profile")}
            style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
          >
            <svg
              xmlns="https://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
            </svg>
            <span className="user-name">{user?.name || "Loading..."}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="content">
        <div className="card">
          <h2>Selamat Datang, {user?.name || "..."}</h2>
          <p>
            Jumlah Total Produk Saat Ini: <strong>{totalProduk} Produk</strong>
          </p>
        </div>
      </main>

      <footer className="footer">© 2025 MANPRO. All rights reserved.</footer>
    </div>
  );
};

export default Dashboard;
