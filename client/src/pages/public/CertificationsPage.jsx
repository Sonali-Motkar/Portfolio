import { useEffect, useState } from "react";
import PublicLayout from "../../layouts/PublicLayout";
import api from "../../api/axios";

const CertificationsPage = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/certificates")
      .then((res) => {
        const sorted = [...res.data].sort(
          (a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
        );
        setCertificates(sorted);
      })
      .catch(() => {
        setError("Unable to load certifications right now.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <PublicLayout>
      <section className="card cert-section">
        <div className="cert-section-head">
          <h2>Certifications</h2>
          <p>Verified achievements and training credentials.</p>
        </div>

        {loading ? <div className="cert-state">Loading certifications...</div> : null}
        {error ? <div className="cert-state error">{error}</div> : null}

        {!loading && !error ? (
          <div className="cert-grid">
            {certificates.map((cert) => (
              <article className="cert-card" key={cert._id}>
                {cert.imageUrl ? (
                  <a
                    className="cert-image-link"
                    href={encodeURI(cert.imageUrl)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img className="cert-image" src={encodeURI(cert.imageUrl)} alt={`${cert.title} certificate`} />
                    <span className="cert-image-badge">Tap to View</span>
                  </a>
                ) : (
                  <div className="cert-image cert-image-fallback">No Certificate Image</div>
                )}
                <h3>{cert.title}</h3>
                <div className="cert-meta">
                  <span className="cert-chip">{cert.issuer}</span>
                  <span className="cert-chip">
                    {new Date(cert.issueDate).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric"
                    })}
                  </span>
                </div>
                {cert.description ? <p>{cert.description}</p> : null}
              </article>
            ))}
          </div>
        ) : null}

        {!loading && !error && certificates.length === 0 ? (
          <div className="cert-state">No certifications added yet.</div>
        ) : null}
      </section>
    </PublicLayout>
  );
};

export default CertificationsPage;
