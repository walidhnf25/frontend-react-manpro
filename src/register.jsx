import { useState } from "react";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "karyawan", // default
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Password dan konfirmasi password tidak sama!");
      return;
    }

    console.log("Nama:", form.name);
    console.log("Email:", form.email);
    console.log("Role:", form.role);
    console.log("Password:", form.password);
    alert("Form daftar dikirim (belum terhubung ke API)");
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Buat Akun Baru ✨</h2>
        <p className="register-subtitle">Silakan isi data untuk mendaftar</p>

        <form onSubmit={handleRegister}>
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
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Masukkan password"
              required
            />
          </div>

        {/* Pilih Role */}
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

          <button type="submit" className="register-button">
            Daftar
          </button>
        </form>

        <p className="register-footer">
          Sudah punya akun? <a href="/Login">Login</a>
        </p>
      </div>
    </div>
  );
}