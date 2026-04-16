import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminLoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/admin");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="centered">
      <form onSubmit={handleSubmit} className="card grid auth">
        <h2>Admin Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn" type="submit">Login</button>
        <p>{error}</p>
      </form>
    </div>
  );
};

export default AdminLoginPage;
