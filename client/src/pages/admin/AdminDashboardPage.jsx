import { Link } from "react-router-dom";

const AdminDashboardPage = () => {
  return (
    <section className="card">
      <h2>Admin Dashboard</h2>
      <div className="grid">
        <Link to="/admin/projects" className="btn">Manage Projects</Link>
        <Link to="/admin/skills" className="btn">Manage Skills</Link>
        <Link to="/admin/certificates" className="btn">Manage Certificates</Link>
        <Link to="/admin/messages" className="btn">View Messages</Link>
        <Link to="/admin/profile" className="btn">Update Profile</Link>
      </div>
    </section>
  );
};

export default AdminDashboardPage;
