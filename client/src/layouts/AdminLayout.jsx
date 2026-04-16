import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="container">
      <header className="header">
        <Link to="/admin" className="brand">Admin Panel</Link>
        <nav>
          <NavLink to="/admin/projects">Projects</NavLink>
          <NavLink to="/admin/skills">Skills</NavLink>
          <NavLink to="/admin/certificates">Certificates</NavLink>
          <NavLink to="/admin/messages">Messages</NavLink>
          <NavLink to="/admin/profile">Profile</NavLink>
          <button onClick={logout}>Logout</button>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
