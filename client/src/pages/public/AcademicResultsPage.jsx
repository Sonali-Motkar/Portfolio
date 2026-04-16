import { useEffect, useState } from "react";
import PublicLayout from "../../layouts/PublicLayout";

const academicRows = [
  {
    level: "Secondary School (SSC - 10th)",
    boardOrUniversity: "Maharashtra State Board",
    year: "March 2019",
    score: "74.00%",
    marks: "370 / 500",
    result: "Pass (First Class)"
  },
  {
    level: "Higher Secondary (HSC - 12th)",
    boardOrUniversity: "Maharashtra State Board",
    year: "2021",
    score: "76.67%",
    marks: "460 / 600",
    result: "Pass"
  },
  {
    level: "Graduation (BBA - Computer Applications)",
    boardOrUniversity: "Savitribai Phule Pune University",
    year: "2024",
    score: "CGPA: 7.69 | Grade: A",
    marks: "Total Credits: 90",
    result: "Pass"
  },
  {
    level: "Post Graduation (MCA - Semester I)",
    boardOrUniversity: "Dnyan Prasad Global University",
    year: "December 2025",
    score: "75.00% | SGPA: 8.18",
    marks: "Semester: I",
    result: "Pass",
    isPostGrad: true
  }
];

const postGradSubjects = [
  "Python Programming",
  "Data Communication & Computer Network",
  "Software Engineering (UML)",
  "Data Science",
  "Web Development",
  "Software Testing"
];

const AcademicResultsPage = () => {
  const [showMcaSubjects, setShowMcaSubjects] = useState(false);

  useEffect(() => {
    const onEsc = (event) => {
      if (event.key === "Escape") {
        setShowMcaSubjects(false);
      }
    };

    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  return (
    <PublicLayout>
      <section className="card cert-section">
        <div className="cert-section-head">
          <h2>Academic Results</h2>
          <p>Educational performance summary and key milestones.</p>
        </div>

        <div className="about-grid" style={{ marginTop: "0.9rem" }}>
          {academicRows.map((row) => (
            <article key={row.level} className="about-panel result-card">
              <h3>{row.level}</h3>
              <p><strong>Board / University:</strong> {row.boardOrUniversity}</p>
              <p><strong>Year of Passing:</strong> {row.year}</p>
              <p><strong>Percentage / CGPA:</strong> {row.score}</p>
              <p><strong>Marks / Credits:</strong> {row.marks}</p>
              <p><strong>Result:</strong> {row.result}</p>
              {row.isPostGrad ? (
                <button
                  type="button"
                  className="laptop-toggle"
                  onClick={() => setShowMcaSubjects(true)}
                  aria-expanded={showMcaSubjects}
                  aria-label="Open MCA Semester I Subjects"
                >
                  {"\u{1F4BB}"}
                </button>
              ) : null}
            </article>
          ))}
        </div>

        {showMcaSubjects ? (
          <div className="mca-modal-backdrop" onClick={() => setShowMcaSubjects(false)}>
            <article className="mca-modal result-card" onClick={(event) => event.stopPropagation()}>
              <div className="mca-modal-head">
                <h3>MCA Semester I Subjects</h3>
                <button type="button" className="mca-modal-close" onClick={() => setShowMcaSubjects(false)}>
                  X
                </button>
              </div>
              <ul className="about-list">
                {postGradSubjects.map((subject) => (
                  <li key={subject}>{subject}</li>
                ))}
              </ul>
            </article>
          </div>
        ) : null}
      </section>
    </PublicLayout>
  );
};

export default AcademicResultsPage;
