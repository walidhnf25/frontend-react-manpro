import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Produk.css";

const Product = () => {
  const navigate = useNavigate();

  // STATE
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", amount: "" });

  const [showEditModal, setShowEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  // TOGGLE MENU
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // FETCH USER PROFILE
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    axios
      .get("https://manpro-api.teluapp.org/api/profile", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  // FETCH PRODUCTS
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    axios
      .get("https://manpro-api.teluapp.org/api/products", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setProducts(res.data))
      .catch(() => showMessage("Gagal mengambil data produk!", "error"));
  }, [navigate]);

  // HANDLER MESSAGE
  const showMessage = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(""), 3000);
  };

  // CRUD HANDLER
  const handleAddProduct = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "https://manpro-api.teluapp.org/api/products",
        { name: newProduct.name, price: Number(newProduct.price), amount: Number(newProduct.amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts(prev => [...prev, res.data.data]);
      showMessage("Produk berhasil ditambahkan!", "success");
      setShowModal(false);
      setNewProduct({ name: "", price: "", amount: "" });
    } catch (err) {
      console.error(err);
      showMessage("Gagal menambahkan produk!", "error");
    }
  };

  const handleUpdateProduct = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `https://manpro-api.teluapp.org/api/products/${editProduct.id}`,
        { name: editProduct.name, price: Number(editProduct.price), amount: Number(editProduct.amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts(prev => prev.map(p => (p.id === editProduct.id ? { ...p, ...editProduct } : p)));
      showMessage("Produk berhasil diperbarui!", "success");
      setShowEditModal(false);
      setEditProduct(null);
    } catch (err) {
      console.error(err);
      showMessage("Gagal memperbarui produk!", "error");
    }
  };

  const handleDeleteProduct = async id => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`https://manpro-api.teluapp.org/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(prev => prev.filter(p => p.id !== id));
      showMessage("Produk berhasil dihapus!", "success");
      setShowDeleteModal(false);
      setDeleteProductId(null);
    } catch (err) {
      console.error(err);
      showMessage("Gagal menghapus produk!", "error");
    }
  };

  const confirmDeleteProduct = id => {
    setDeleteProductId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (deleteProductId) handleDeleteProduct(deleteProductId);
  };

  return (
    <div className="product-container">
      <div className="main-content">
        <header className="navbar">
          {/* Navbar kiri */}
          <div className="navbar-left">
            <div className="logo" onClick={() => navigate("/dashboard")}>MANPRO</div>
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

          {/* Navbar kanan */}
          <div className="navbar-right" onClick={() => navigate("/profile")} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <svg xmlns="https://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/>
              <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/>
              <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"/>
            </svg>
            <span className="user-name">{user?.name || "Loading..."}</span>
          </div>
        </header>

        <main className="content">
          <div className="card">
            {/* Tombol tambah & message */}
            <div style={{ width: "100%", marginBottom: "15px", textAlign: "left" }}>
              <button
                style={{ display: "flex", alignItems: "center", gap: "5px", padding: "8px 15px", backgroundColor: "#1e3a8a", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                onClick={() => setShowModal(true)}
              >
                <svg xmlns="https://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M12 5v14"/>
                  <path d="M5 12h14"/>
                </svg>
                Tambah Produk
              </button>

              {message && (
                <div style={{
                  marginTop: "10px",
                  padding: "8px 12px",
                  backgroundColor: messageType === "success" ? "#d1fae5" : "#fee2e2",
                  color: messageType === "success" ? "#065f46" : "#b91c1c",
                  borderRadius: "6px",
                  textAlign: "center",
                  fontWeight: "500"
                }}>
                  {message}
                </div>
              )}
            </div>

            {/* Modal Tambah */}
            {showModal && (
              <div className="modal-overlay" onClick={() => setShowModal(false)}>
                <div className="modal" onClick={e => e.stopPropagation()}>
                  <h2>Tambah Produk</h2>
                  <div className="modal-group">
                    <label>Nama Produk</label>
                    <input type="text" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
                  </div>
                  <div className="modal-group">
                    <label>Harga</label>
                    <input type="number" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
                  </div>
                  <div className="modal-group">
                    <label>Jumlah</label>
                    <input type="number" value={newProduct.amount} onChange={e => setNewProduct({ ...newProduct, amount: e.target.value })} />
                  </div>
                  <div className="modal-actions">
                    <button className="btn-save" onClick={handleAddProduct}>Simpan</button>
                    <button className="btn-cancel" onClick={() => setShowModal(false)}>Batal</button>
                  </div>
                </div>
              </div>
            )}

            {/* Tabel Produk */}
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
                      <td style={{ padding: "10px", border: "1px solid #ddd" }}>Rp {product.price?.toLocaleString() || 0}</td>
                      <td style={{ padding: "10px", border: "1px solid #ddd" }}>{product.amount}</td>
                      <td style={{ padding: "10px", border: "1px solid #ddd", display: "flex", justifyContent: "center", gap: "5px" }}>
                        {/* Edit */}
                        <button style={{ display: "flex", alignItems: "center", gap: "3px", padding: "5px 8px", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                          onClick={() => { setEditProduct({ ...product }); setShowEditModal(true); }}
                        >
                          <svg xmlns="https://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                            <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                            <path d="M16 5l3 3" />
                          </svg>
                        </button>

                        {/* Delete */}
                        <button style={{ display: "flex", alignItems: "center", gap: "3px", padding: "5px 8px", backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                          onClick={() => confirmDeleteProduct(product.id)}
                        >
                          <svg xmlns="https://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

            {/* Modal Edit */}
            {showEditModal && editProduct && (
              <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
                <div className="modal" onClick={e => e.stopPropagation()}>
                  <h2>Edit Produk</h2>
                  <div className="modal-group">
                    <label>Nama Produk</label>
                    <input type="text" value={editProduct.name} onChange={e => setEditProduct({ ...editProduct, name: e.target.value })} />
                  </div>
                  <div className="modal-group">
                    <label>Harga</label>
                    <input type="number" value={editProduct.price} onChange={e => setEditProduct({ ...editProduct, price: e.target.value })} />
                  </div>
                  <div className="modal-group">
                    <label>Jumlah</label>
                    <input type="number" value={editProduct.amount} onChange={e => setEditProduct({ ...editProduct, amount: e.target.value })} />
                  </div>
                  <div className="modal-actions">
                    <button className="btn-save" onClick={handleUpdateProduct}>Simpan</button>
                    <button className="btn-cancel" onClick={() => setShowEditModal(false)}>Batal</button>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Delete */}
            {showDeleteModal && (
              <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
                <div className="modal" onClick={e => e.stopPropagation()}>
                  <h2>Konfirmasi Hapus</h2>
                  <p>Apakah Anda yakin ingin menghapus produk ini?</p>
                  <div className="modal-actions">
                    <button className="btn-delete" onClick={handleConfirmDelete}>Hapus</button>
                    <button className="btn-cancel" onClick={() => setShowDeleteModal(false)}>Batal</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        <footer className="footer">© 2025 MANPRO. All rights reserved.</footer>
      </div>
    </div>
  );
};

export default Product;