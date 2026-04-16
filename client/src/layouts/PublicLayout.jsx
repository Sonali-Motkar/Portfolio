import { NavLink } from "react-router-dom";

const PublicLayout = ({ children }) => {
  return (
    <div className="container">
      <header className="header">
        <NavLink to="/" className="brand">
          Portfolio
        </NavLink>
        <nav>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/skills">Skills</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/academic-results">Academic Results</NavLink>
          <NavLink to="/certifications">Certifications</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default PublicLayout;
