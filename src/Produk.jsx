import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // contoh data produk
  const products = [
    { name: "Produk A", price: 10000, quantity: 50 },
    { name: "Produk B", price: 25000, quantity: 30 },
    { name: "Produk C", price: 15000, quantity: 70 },
    { name: "Produk D", price: 5000, quantity: 120 },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">MANPRO</div>
        <nav className="sidebar-menu">
            <a href="/Dashboard">
                {/* Icon Dashboard */}
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon"
                style={{ marginRight: "10px" }}
                >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                <path d="M10 12h4v4h-4z" />
                </svg>
                Dashboard
            </a>
            <a href="/Produk">
                {/* Icon Produk */}
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon"
                style={{ marginRight: "10px" }}
                >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 17h-11v-14h-2" />
                <path d="M6 5l14 1l-1 7h-13" />
                </svg>
                Produk
            </a>
          </nav>
        <div className="sidebar-footer">
          <button
            className="logout-btn"
            onClick={() => navigate("/login")}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay saat mobile */}
      {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content */}
      <div className="main-content">
        <header className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1>Produk</h1>

          {/* Profile */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
            onClick={() => navigate("/profile")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/>
              <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/>
              <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"/>
            </svg>
            <span style={{ fontWeight: "bold" }}>Manager</span>
          </div>
        </header>

        <main className="content">
          <div className="card">
            {/* Tombol Tambah Produk */}
            <div style={{ width: "100%", marginBottom: "15px", textAlign: "left" }}>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px", // jarak icon dan teks
                  padding: "8px 15px",
                  backgroundColor: "#1e3a8a",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={() => alert("Fungsi tambah produk akan ditambahkan")}
              >
                {/* Icon Plus */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
                Tambah Produk
              </button>
            </div>

            {/* Tabel Produk */}
            {/* Bungkus tabel dengan div responsif */}
            <div style={{ width: "100%", overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
                <thead>
                  <tr style={{ backgroundColor: "#1e3a8a", color: "white" }}>
                    <th style={{ padding: "10px", border: "1px solid #ddd" }}>Nama Produk</th>
                    <th style={{ padding: "10px", border: "1px solid #ddd" }}>Harga</th>
                    <th style={{ padding: "10px", border: "1px solid #ddd" }}>Jumlah</th>
                    <th style={{ padding: "10px", border: "1px solid #ddd" }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index} style={{ textAlign: "center" }}>
                      <td style={{ padding: "10px", border: "1px solid #ddd" }}>{product.name}</td>
                      <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                        Rp {product.price.toLocaleString()}
                      </td>
                      <td style={{ padding: "10px", border: "1px solid #ddd" }}>{product.quantity}</td>
                      <td style={{ padding: "10px", border: "1px solid #ddd", display: "flex", justifyContent: "center", gap: "5px" }}>
                        {/* Tombol Edit */}
                        <button style={{ display: "flex", alignItems: "center", gap: "3px", padding: "5px 8px", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                          onClick={() => alert(`Edit ${product.name}`)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                            <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                            <path d="M16 5l3 3" />
                          </svg>
                        </button>

                        {/* Tombol Delete */}
                        <button style={{ display: "flex", alignItems: "center", gap: "3px", padding: "5px 8px", backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                          onClick={() => alert(`Delete ${product.name}`)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M20 6a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-11l-5 -5a1.5 1.5 0 0 1 0 -2l5 -5z" />
                            <path d="M12 10l4 4m0 -4l-4 4" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        <footer className="footer">
          © 2025 MANPRO. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;