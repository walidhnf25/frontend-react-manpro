import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "karyawan",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetch("https://manpro-api.teluapp.org/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Registrasi berhasil! Mengarahkan ke login...");
        setMessageType("success");

        setTimeout(() => {
          setMessage("");
          navigate("/login");
        }, 2000);
      } else {
        setMessage(data.message || "Registrasi gagal!");
        setMessageType("error");

        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      setMessage("Gagal terhubung ke server");
      setMessageType("error");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Buat Akun Baru ✨</h2>
        <p className="register-subtitle">Silakan isi data untuk mendaftar</p>

        <form onSubmit={handleRegister}>
          {message && (
            <div className={`message ${messageType}`}>
              {message}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">Nama Lengkap</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Masukkan email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Masukkan password"
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙉" : "🙈"}
              </span>
            </div>
          </div>

          <div className="form-group">
            <label>Pilih Role</label>
            <div className="role-options">
              <input
                type="radio"
                id="manager"
                name="role"
                value="manager"
                checked={form.role === "manager"}
                onChange={handleChange}
              />
              <label htmlFor="manager">Manager</label>

              <input
                type="radio"
                id="karyawan"
                name="role"
                value="karyawan"
                checked={form.role === "karyawan"}
                onChange={handleChange}
              />
              <label htmlFor="karyawan">Karyawan</label>
            </div>
          </div>

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? "Mendaftar..." : "Daftar"}
          </button>
        </form>

        <p className="register-footer">
          Sudah punya akun? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}