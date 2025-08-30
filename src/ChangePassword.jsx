import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ChangePassword.css";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const apiUrl = "https://manpro-api.teluapp.org/api/profile"; // gunakan API produksi

    axios
      .get(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data && res.data.email) setEmail(res.data.email);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "https://manpro-api.teluapp.org/api/changepassword",
        {
          old_password: oldPassword,
          new_password: newPassword,
          new_password_confirmation: newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(res.data.message + " Silakan login ulang.");
      setMessageType("success");

      setTimeout(() => {
        localStorage.removeItem("token");
        navigate("/login");
      }, 1500);

      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Gagal mengubah password!");
      setMessageType("error");
    }
  };

  return (
    <div className="change-container">
      <div className="change-card">
        <h2>Ubah Password</h2>

        {message && (
          <div className={`alert-message ${messageType}`}>
            {message}
          </div>
        )}
        
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