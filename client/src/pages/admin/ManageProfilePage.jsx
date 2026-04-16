import { useEffect, useState } from "react";
import api from "../../api/axios";

const emptyProfile = {
  fullName: "",
  headline: "",
  about: "",
  resumeUrl: "",
  location: "",
  socialLinks: {
    github: "",
    linkedin: "",
    twitter: "",
    website: ""
  }
};

const ManageProfilePage = () => {
  const [form, setForm] = useState(emptyProfile);
  const [status, setStatus] = useState("");

  useEffect(() => {
    api.get("/profile").then(({ data }) => {
      setForm({ ...emptyProfile, ...data, socialLinks: { ...emptyProfile.socialLinks, ...(data.socialLinks || {}) } });
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await api.put("/profile", form);
    setStatus("Profile updated");
  };

  return (
    <section className="card">
      <h2>Manage Profile</h2>
      <form className="grid" onSubmit={onSubmit}>
        <input placeholder="Full Name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
        <input placeholder="Headline" value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })} />
        <textarea placeholder="About" value={form.about} onChange={(e) => setForm({ ...form, about: e.target.value })} />
        <input placeholder="Resume URL" value={form.resumeUrl} onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })} />
        <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
        <input placeholder="GitHub" value={form.socialLinks.github} onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, github: e.target.value } })} />
        <input placeholder="LinkedIn" value={form.socialLinks.linkedin} onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, linkedin: e.target.value } })} />
        <input placeholder="Twitter" value={form.socialLinks.twitter} onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, twitter: e.target.value } })} />
        <input placeholder="Website" value={form.socialLinks.website} onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, website: e.target.value } })} />
        <button className="btn" type="submit">Update Profile</button>
      </form>
      <p>{status}</p>
    </section>
  );
};

export default ManageProfilePage;
