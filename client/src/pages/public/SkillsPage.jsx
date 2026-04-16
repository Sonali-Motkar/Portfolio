import { useEffect, useState } from "react";
import PublicLayout from "../../layouts/PublicLayout";
import api from "../../api/axios";

const SkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/skills")
      .then((res) => setSkills(res.data))
      .catch(() => setError("Unable to load skills right now."))
      .finally(() => setLoading(false));
  }, []);

  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || "General";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});

  const categoryOrder = [
    "Programming",
    "Frontend",
    "Backend",
    "Database",
    "Cloud",
    "Tools",
    "Authentication",
    "Framework",
    "General"
  ];

  const sortedCategories = Object.keys(groupedSkills).sort((a, b) => {
    const aIndex = categoryOrder.indexOf(a);
    const bIndex = categoryOrder.indexOf(b);
    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  return (
    <PublicLayout>
      <section className="card skills-section">
        <div className="skills-head">
          <h2>Skills</h2>
          <p>Core technologies and tools I use to build modern full stack applications.</p>
        </div>

        {loading ? <div className="skills-state">Loading skills...</div> : null}
        {error ? <div className="skills-state error">{error}</div> : null}

        {!loading && !error ? (
          <div className="skills-category-grid">
            {sortedCategories.map((category) => (
              <article key={category} className="skills-category-card">
                <div className="skills-category-head">
                  <h3>{category}</h3>
                  <span>{groupedSkills[category].length}</span>
                </div>

                <div className="skills-chip-grid">
                  {groupedSkills[category].map((skill) => (
                    <div key={skill._id} className="skills-chip">
                      <span className="skills-chip-name">{skill.name}</span>
                      <span className="skills-chip-level">{skill.level || "Intermediate"}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        ) : null}

        {!loading && !error && skills.length === 0 ? (
          <div className="skills-state">No skills added yet.</div>
        ) : null}
      </section>
    </PublicLayout>
  );
};

export default SkillsPage;
