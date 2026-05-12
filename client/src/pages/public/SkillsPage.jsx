import { useEffect, useState } from "react";
import PublicLayout from "../../layouts/PublicLayout";
import api from "../../api/axios";

const fallbackSkills = [
  { _id: "fallback-javascript", name: "JavaScript", category: "Programming", level: "Advanced" },
  { _id: "fallback-typescript", name: "TypeScript", category: "Programming", level: "Intermediate" },
  { _id: "fallback-java", name: "Java", category: "Programming", level: "Intermediate" },
  { _id: "fallback-cpp", name: "C++", category: "Programming", level: "Intermediate" },
  { _id: "fallback-python", name: "Python", category: "Programming", level: "Intermediate" },
  { _id: "fallback-html5", name: "HTML5", category: "Frontend", level: "Advanced" },
  { _id: "fallback-css3", name: "CSS3", category: "Frontend", level: "Advanced" },
  { _id: "fallback-react", name: "React", category: "Frontend", level: "Intermediate" },
  { _id: "fallback-tailwind", name: "Tailwind CSS", category: "Frontend", level: "Advanced" },
  { _id: "fallback-next", name: "Next.js", category: "Frontend", level: "Intermediate" },
  { _id: "fallback-dnd-kit", name: "dnd-kit", category: "Frontend", level: "Intermediate" },
  { _id: "fallback-vite", name: "Vite", category: "Frontend", level: "Intermediate" },
  { _id: "fallback-node", name: "Node.js", category: "Backend", level: "Intermediate" },
  { _id: "fallback-express", name: "Express.js", category: "Backend", level: "Intermediate" },
  { _id: "fallback-rest", name: "REST APIs", category: "Backend", level: "Intermediate" },
  { _id: "fallback-spring", name: "Spring", category: "Framework", level: "Beginner" },
  { _id: "fallback-mongodb", name: "MongoDB", category: "Database", level: "Intermediate" },
  { _id: "fallback-mysql", name: "MySQL", category: "Database", level: "Intermediate" },
  { _id: "fallback-supabase", name: "Supabase", category: "Database", level: "Intermediate" },
  { _id: "fallback-aws", name: "AWS", category: "Cloud", level: "Beginner" },
  { _id: "fallback-vercel", name: "Vercel", category: "Cloud", level: "Intermediate" },
  { _id: "fallback-render", name: "Render", category: "Cloud", level: "Intermediate" },
  { _id: "fallback-git", name: "Git", category: "Tools", level: "Intermediate" },
  { _id: "fallback-github", name: "GitHub", category: "Tools", level: "Intermediate" },
  { _id: "fallback-postman", name: "Postman", category: "Tools", level: "Intermediate" },
  { _id: "fallback-clerk", name: "Clerk", category: "Authentication", level: "Intermediate" },
  { _id: "fallback-jwt", name: "JWT", category: "Authentication", level: "Intermediate" }
];

const SkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/skills")
      .then((res) => {
        setSkills(Array.isArray(res.data) ? res.data : fallbackSkills);
      })
      .catch(() => setSkills(fallbackSkills))
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
      <section className="card skills-section page-animate-in">
        <div className="skills-head animate-rise delay-1">
          <h2>Skills</h2>
          <p>Core technologies and tools I use to build modern full stack applications.</p>
        </div>

        {loading ? <div className="skills-state">Loading skills...</div> : null}

        {!loading ? (
          <div className="skills-category-grid">
            {sortedCategories.map((category, categoryIndex) => (
              <article
                key={category}
                className="skills-category-card"
                style={{ "--reveal-index": categoryIndex }}
              >
                <div className="skills-category-head">
                  <h3>{category}</h3>
                  <span>{groupedSkills[category].length}</span>
                </div>

                <div className="skills-chip-grid">
                  {groupedSkills[category].map((skill, skillIndex) => (
                    <div
                      key={skill._id}
                      className="skills-chip"
                      style={{ "--reveal-index": skillIndex }}
                    >
                      <span className="skills-chip-name">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        ) : null}

        {!loading && skills.length === 0 ? (
          <div className="skills-state">No skills added yet.</div>
        ) : null}
      </section>
    </PublicLayout>
  );
};

export default SkillsPage;
