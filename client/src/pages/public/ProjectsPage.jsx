import { useEffect, useState } from "react";
import PublicLayout from "../../layouts/PublicLayout";
import api from "../../api/axios";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getProjectThemeClass = (project) => {
    const content = `${project?.title || ""} ${project?.description || ""}`.toLowerCase();
    if (content.includes("weather")) return "project-theme-weather";
    if (content.includes("trello")) return "project-theme-trello";
    return "";
  };

  useEffect(() => {
    api
      .get("/projects")
      .then((res) => setProjects(res.data))
      .catch(() => setError("Unable to load projects right now."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PublicLayout>
      <section className="card projects-section">
        <h2>Projects</h2>
        {loading ? <div className="skills-state">Loading projects...</div> : null}
        {error ? <div className="skills-state error">{error}</div> : null}

        {!loading && !error && projects.length === 0 ? (
          <div className="skills-state">No projects added yet.</div>
        ) : null}

        {projects.map((project) => (
          <article
            key={project._id}
            className={`item project-card animate-rise ${getProjectThemeClass(project)}`.trim()}
            style={{
              "--project-bg-image": project.imageUrl ? `url("${encodeURI(project.imageUrl)}")` : "none"
            }}
          >
            <span className="project-fx project-fx-a" aria-hidden="true" />
            <span className="project-fx project-fx-b" aria-hidden="true" />
            <div className="project-card-head">
              <h3>{project.title}</h3>
              {project.featured ? <span className="cert-chip">Featured</span> : null}
            </div>
            <p className="project-description">{project.description}</p>
            <p><strong>Tech:</strong> {(project.techStack || []).join(", ")}</p>
            {project.keyFeatures?.length ? (
              <div className="project-feature-block">
                <p><strong>Key Features:</strong></p>
                <ul className="project-feature-list">
                  {project.keyFeatures.map((feature, index) => (
                    <li key={`${project._id}-feature-${index}`}>{feature}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {project.outcome ? (
              <p className="project-outcome"><strong>Outcome:</strong> {project.outcome}</p>
            ) : null}
            <div className="row">
              {project.githubUrl ? (
                <a className="btn" href={project.githubUrl} target="_blank" rel="noreferrer">GitHub</a>
              ) : null}
              {project.liveUrl ? (
                <a className="btn secondary" href={project.liveUrl} target="_blank" rel="noreferrer">Live Demo</a>
              ) : null}
            </div>
          </article>
        ))}
      </section>
    </PublicLayout>
  );
};

export default ProjectsPage;
