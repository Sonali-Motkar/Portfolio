import { Navigate, Route, Routes } from "react-router-dom";
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./layouts/AdminLayout";
import HomePage from "./pages/public/HomePage";
import AboutPage from "./pages/public/AboutPage";
import SkillsPage from "./pages/public/SkillsPage";
import ProjectsPage from "./pages/public/ProjectsPage";
import AcademicResultsPage from "./pages/public/AcademicResultsPage";
import CertificationsPage from "./pages/public/CertificationsPage";
import ContactPage from "./pages/public/ContactPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import ManageProjectsPage from "./pages/admin/ManageProjectsPage";
import ManageSkillsPage from "./pages/admin/ManageSkillsPage";
import ManageCertificatesPage from "./pages/admin/ManageCertificatesPage";
import ManageMessagesPage from "./pages/admin/ManageMessagesPage";
import ManageProfilePage from "./pages/admin/ManageProfilePage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/skills" element={<SkillsPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/academic-results" element={<AcademicResultsPage />} />
      <Route path="/certifications" element={<CertificationsPage />} />
      <Route path="/contact" element={<ContactPage />} />

      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="projects" element={<ManageProjectsPage />} />
          <Route path="skills" element={<ManageSkillsPage />} />
          <Route path="certificates" element={<ManageCertificatesPage />} />
          <Route path="messages" element={<ManageMessagesPage />} />
          <Route path="profile" element={<ManageProfilePage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
