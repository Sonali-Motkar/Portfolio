import { useEffect, useState } from "react";
import api from "../../api/axios";

const emptySkill = { name: "", category: "", level: "", icon: "" };

const ManageSkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState(emptySkill);
  const [editingId, setEditingId] = useState(null);

  const loadSkills = async () => {
    const { data } = await api.get("/skills");
    setSkills(data);
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/skills/${editingId}`, form);
    } else {
      await api.post("/skills", form);
    }
    setForm(emptySkill);
    setEditingId(null);
    loadSkills();
  };

  const onEdit = (skill) => {
    setEditingId(skill._id);
    setForm({
      name: skill.name,
      category: skill.category || "",
      level: skill.level || "",
      icon: skill.icon || ""
    });
  };

  const onDelete = async (id) => {
    await api.delete(`/skills/${id}`);
    loadSkills();
  };

  return (
    <section className="card">
      <h2>Manage Skills</h2>
      <form className="grid" onSubmit={onSubmit}>
        <input placeholder="Skill" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <input placeholder="Level" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} />
        <input placeholder="Icon URL" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
        <button className="btn" type="submit">{editingId ? "Update" : "Add"} Skill</button>
      </form>

      {skills.map((skill) => (
        <article key={skill._id} className="item row between">
          <span>{skill.name} - {skill.category} - {skill.level}</span>
          <div className="row">
            <button className="btn" onClick={() => onEdit(skill)}>Edit</button>
            <button className="btn danger" onClick={() => onDelete(skill._id)}>Delete</button>
          </div>
        </article>
      ))}
    </section>
  );
};

export default ManageSkillsPage;
