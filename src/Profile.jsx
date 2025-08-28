import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [name, setName] = useState("Manager");
  const [email, setEmail] = useState("manager@example.com");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Nama: ${name}\nEmail: ${email}\nPassword: (dummy, tidak diubah)`);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Profile</h2>
        <form onSubmit={handleSubmit} className="profile-form">
          <label>
            Nama:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Password:
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value="password123"
                disabled
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              >
                {showPassword ? "🙉" : "🙈"}
              </span>
            </div>
          </label>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "10px",
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
            <button
              type="button"
              className="back-btn"
              onClick={() => window.history.back()}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;