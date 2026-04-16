import { useEffect, useState } from "react";
import api from "../../api/axios";

const emptyCertificate = {
  title: "",
  issuer: "",
  issueDate: "",
  description: "",
  credentialUrl: "",
  imageUrl: ""
};

const ManageCertificatesPage = () => {
  const [certificates, setCertificates] = useState([]);
  const [form, setForm] = useState(emptyCertificate);
  const [editingId, setEditingId] = useState(null);

  const loadCertificates = async () => {
    const { data } = await api.get("/certificates");
    setCertificates(data);
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/certificates/${editingId}`, form);
    } else {
      await api.post("/certificates", form);
    }

    setForm(emptyCertificate);
    setEditingId(null);
    loadCertificates();
  };

  const onEdit = (certificate) => {
    setEditingId(certificate._id);
    setForm({
      title: certificate.title,
      issuer: certificate.issuer,
      issueDate: certificate.issueDate ? new Date(certificate.issueDate).toISOString().slice(0, 10) : "",
      description: certificate.description || "",
      credentialUrl: certificate.credentialUrl || "",
      imageUrl: certificate.imageUrl || ""
    });
  };

  const onDelete = async (id) => {
    await api.delete(`/certificates/${id}`);
    loadCertificates();
  };

  return (
    <section className="card">
      <h2>Manage Certificates</h2>
      <form className="grid" onSubmit={onSubmit}>
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <input placeholder="Issuer" value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })} required />
        <input type="date" value={form.issueDate} onChange={(e) => setForm({ ...form, issueDate: e.target.value })} required />
        <textarea placeholder="What this certificate covers" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input placeholder="Credential URL" value={form.credentialUrl} onChange={(e) => setForm({ ...form, credentialUrl: e.target.value })} />
        <input placeholder="Image URL" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
        <button className="btn" type="submit">{editingId ? "Update" : "Add"} Certificate</button>
      </form>

      {certificates.map((certificate) => (
        <article key={certificate._id} className="item row between">
          <span>{certificate.title} - {certificate.issuer}{certificate.description ? ` | ${certificate.description}` : ""}</span>
          <div className="row">
            <button className="btn" onClick={() => onEdit(certificate)}>Edit</button>
            <button className="btn danger" onClick={() => onDelete(certificate._id)}>Delete</button>
          </div>
        </article>
      ))}
    </section>
  );
};

export default ManageCertificatesPage;
