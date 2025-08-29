import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "", role: "manager" });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      axios
        .get("http://manpro-api/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem("token");
          navigate("/login");
        });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await axios.put(
        "http://manpro-api/api/profile",
        { name: user.name, email: user.email, role: user.role },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(res.data.message);
      setMessageType("success");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage("Gagal update profil!");
      setMessageType("error");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // 🔹 Tambahkan fungsi logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // hapus token
    window.location.reload(); // refresh halaman untuk reset state
    navigate("/login"); // redirect ke login
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Profile</h2>

        {/* Alert Message */}
        {message && <div className={`alert-message ${messageType}`}>{message}</div>}

        <form onSubmit={handleSubmit} className="profile-form">
          <label>
            Nama:
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              required
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
          </label>

          <div className="form-group">
            <label>Pilih Role</label>
            <div className="role-options">
              <input
                type="radio"
                id="manager"
                name="role"
                value="manager"
                checked={user.role === "manager"}
                onChange={handleChange}
              />
              <label htmlFor="manager">Manager</label>

              <input
                type="radio"
                id="karyawan"
                name="role"
                value="karyawan"
                checked={user.role === "karyawan"}
                onChange={handleChange}
              />
              <label htmlFor="karyawan">Karyawan</label>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <button type="submit" className="save-btn">
              Simpan
            </button>

            <button
              type="button"
              className="save-btn"
              onClick={() => navigate("/changepassword")}
            >
              Ubah Password
            </button>

            <button type="button" className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;