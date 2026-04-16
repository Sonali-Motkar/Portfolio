import { useEffect, useState } from "react";
import api from "../../api/axios";

const initialForm = {
  title: "",
  description: "",
  techStack: "",
  keyFeatures: "",
  outcome: "",
  githubUrl: "",
  liveUrl: "",
  imageUrl: "",
  featured: false
};

const ManageProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const loadProjects = async () => {
    const { data } = await api.get("/projects");
    setProjects(data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      techStack: form.techStack.split(",").map((item) => item.trim()).filter(Boolean),
      keyFeatures: form.keyFeatures
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean)
    };

    if (editingId) {
      await api.put(`/projects/${editingId}`, payload);
    } else {
      await api.post("/projects", payload);
    }

    setForm(initialForm);
    setEditingId(null);
    loadProjects();
  };

  const editProject = (project) => {
    setEditingId(project._id);
    setForm({
      title: project.title,
      description: project.description,
      techStack: (project.techStack || []).join(", "),
      keyFeatures: (project.keyFeatures || []).join("\n"),
      outcome: project.outcome || "",
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || "",
      imageUrl: project.imageUrl || "",
      featured: !!project.featured
    });
  };

  const deleteProject = async (id) => {
    await api.delete(`/projects/${id}`);
    loadProjects();
  };

  return (
    <section className="card">
      <h2>Manage Projects</h2>
      <form className="grid" onSubmit={handleSubmit}>
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        <input placeholder="Tech stack (comma separated)" value={form.techStack} onChange={(e) => setForm({ ...form, techStack: e.target.value })} />
        <textarea
          placeholder="Key features (one feature per line)"
          value={form.keyFeatures}
          onChange={(e) => setForm({ ...form, keyFeatures: e.target.value })}
        />
        <textarea
          placeholder="Outcome"
          value={form.outcome}
          onChange={(e) => setForm({ ...form, outcome: e.target.value })}
        />
        <input placeholder="GitHub URL" value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} />
        <input placeholder="Live URL" value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} />
        <input placeholder="Image URL" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
        <label>
          <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured
        </label>
        <button className="btn" type="submit">{editingId ? "Update" : "Add"} Project</button>
      </form>

      {projects.map((project) => (
        <article key={project._id} className="item">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="row">
            <button className="btn" onClick={() => editProject(project)}>Edit</button>
            <button className="btn danger" onClick={() => deleteProject(project._id)}>Delete</button>
          </div>
        </article>
      ))}
    </section>
  );
};

export default ManageProjectsPage;
