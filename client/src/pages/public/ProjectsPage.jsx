import { useEffect, useState } from "react";
import PublicLayout from "../../layouts/PublicLayout";
import api from "../../api/axios";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/projects")
      .then((res) => setProjects(res.data))
      .catch(() => setError("Unable to load projects right now."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PublicLayout>
      <section className="card">
        <h2>Projects</h2>
        {loading ? <div className="skills-state">Loading projects...</div> : null}
        {error ? <div className="skills-state error">{error}</div> : null}

        {!loading && !error && projects.length === 0 ? (
          <div className="skills-state">No projects added yet.</div>
        ) : null}

        {projects.map((project) => (
          <article key={project._id} className="item">
            <h3>
              {project.title}
              {project.featured ? <span className="cert-chip" style={{ marginLeft: "0.5rem" }}>Featured</span> : null}
            </h3>
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
