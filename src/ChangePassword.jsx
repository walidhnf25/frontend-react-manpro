// ChangePassword.jsx
import React, { useState } from "react";
import "./ChangePassword.css";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const email = "manager@example.com"; // contoh email user

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Email: ${email}\nPassword Lama: ${oldPassword}\nPassword Baru: ${newPassword}`);
    setOldPassword("");
    setNewPassword("");
  };

  return (
    <div className="change-container">
      <div className="change-card">
        <h2>Ubah Password</h2>
        <form className="change-form" onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" value={email} disabled />
          </label>

          <label>
            Password Lama:
            <div className="password-wrapper">
              <input
                type={showOld ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              <span className="toggle-password" onClick={() => setShowOld(!showOld)}>
                {showOld ? "🙉" : "🙈"}
              </span>
            </div>
          </label>

          <label>
            Password Baru:
            <div className="password-wrapper">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <span className="toggle-password" onClick={() => setShowNew(!showNew)}>
                {showNew ? "🙉" : "🙈"}
              </span>
            </div>
          </label>

          <div className="button-group">
            <button type="submit" className="save-btn">Simpan</button>
            <button type="button" className="back-btn" onClick={() => window.history.back()}>Back</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;