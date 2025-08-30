import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null); 
  const [messageType, setMessageType] = useState("error"); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const res = await axios.post("https://manpro-api.teluapp.org/api/login", {
        email,
        password,
      });

      console.log("Response dari API:", res.data);

      const token = res.data.token || res.data.access_token;

      if (token) {
        localStorage.setItem("token", token);
        setMessage("Login berhasil, mengarahkan ke dashboard...");
        setMessageType("success");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        setMessage("Login gagal: Token tidak ditemukan di response API");
        setMessageType("error");
      }
    } catch (err) {
      console.error("Error login:", err);
      setMessage("Email atau password salah");
      setMessageType("error");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-card">
        <h2 className="login-title">Welcome Back 👋</h2>
        <p className="login-subtitle">Silakan login untuk melanjutkan</p>

        {message && (
          <div className={`alert ${messageType}`}>
            {message}
          </div>
        )}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

        <button type="submit" className="login-button">
          Login
        </button>

        <p className="login-footer">
          Belum punya akun? <a href="/register">Daftar</a>
        </p>
      </form>
    </div>
  );
}