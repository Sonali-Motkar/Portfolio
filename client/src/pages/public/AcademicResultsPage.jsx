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
    year: "2025 - 2027 (Pursuing)",
    score: "75.00% | SGPA: 8.18",
    marks: "Semester: I",
    result: "Pass"
  }
];

const AcademicResultsPage = () => {
  return (
    <PublicLayout>
      <section className="card cert-section page-animate-in">
        <div className="cert-section-head animate-rise delay-1">
          <h2>Academic Results</h2>
          <p>Educational performance summary and key milestones.</p>
        </div>

        <div className="about-grid stagger-grid" style={{ marginTop: "0.9rem" }}>
          {academicRows.map((row, index) => (
            <article
              key={row.level}
              className={`about-panel result-card animate-rise delay-${Math.min(index + 1, 4)}`}
            >
              <h3>{row.level}</h3>
              
              <p><strong>Board / University:</strong> {row.boardOrUniversity}</p>
              <p><strong>Year of Passing:</strong> {row.year}</p>
              <p><strong>Percentage / CGPA:</strong> {row.score}</p>
              <p><strong>Marks / Credits:</strong> {row.marks}</p>
              <p><strong>Result:</strong> {row.result}</p>
            </article>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
};

export default AcademicResultsPage;
