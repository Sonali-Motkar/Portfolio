import { useEffect, useState } from "react";
import PublicLayout from "../../layouts/PublicLayout";
import api from "../../api/axios";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState({ show: false, type: "", title: "", message: "" });
  const [loading, setLoading] = useState(false);
  const links = {
    linkedin: "https://linkedin.com/in/sonali-motkar-48002a2b8",
    github: "https://github.com/Sonali-Motkar",
    email: "sonalimotkar4@gmail.com"
  };

  useEffect(() => {
    if (!status.show) return undefined;
    const timer = setTimeout(() => {
      setStatus((prev) => ({ ...prev, show: false }));
    }, 4500);

    return () => clearTimeout(timer);
  }, [status.show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ show: false, type: "", title: "", message: "" });
    try {
      await api.post("/messages", form);
      setStatus({
        show: true,
        type: "success",
        title: "Message Sent Successfully",
        message: "Thank you so much for your message. I truly appreciate your time and will reply soon."
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus({
        show: true,
        type: "error",
        title: "Message Not Sent",
        message: "Sorry, something went wrong while sending your message. Please try again in a moment."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <section className="card contact-section">
        <div className="cert-section-head contact-head">
          <h2>Contact</h2>
          <p>Open to internships, collaborations, freelance projects, and tech discussions.</p>
        </div>

        <div className="contact-layout">
          <aside className="contact-side">
            <article className="contact-mini-card">
              <h3>Get In Touch</h3>
              <p>Connect with me through these profiles and I will respond quickly.</p>
              <div className="quick-links">
                <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn Profile</a>
                <a href={links.github} target="_blank" rel="noreferrer">GitHub Profile</a>
                <a href={`mailto:${links.email}`}>{links.email}</a>
              </div>
            </article>

            <div className="contact-stats">
              <article className="contact-stat">
                <p className="contact-stat-label">Location</p>
                <p className="contact-stat-value">Pune, Maharashtra</p>
              </article>
              <article className="contact-stat">
                <p className="contact-stat-label">Response Time</p>
                <p className="contact-stat-value">Within 24 hours</p>
              </article>
              <article className="contact-stat">
                <p className="contact-stat-label">Preferred Mode</p>
                <p className="contact-stat-value">Email / LinkedIn</p>
              </article>
            </div>

          </aside>

          <article className="contact-form-card">
            <h3>Send a Message</h3>
            <p className="contact-form-subtext">Share your requirements and I will get back with a clear response.</p>
            <form onSubmit={handleSubmit} className="contact-form-grid">
              <label>
                Name
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter your full name"
                  required
                />
              </label>

              <label>
                Email
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Enter your email address"
                  type="email"
                  required
                />
              </label>

              <label className="contact-full">
                Subject
                <input
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="What is this about?"
                />
              </label>

              <label className="contact-full">
                Message
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Write your message here..."
                  required
                />
              </label>

              <button className="btn contact-submit contact-full" type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </article>
        </div>

        {status.show ? (
          <aside className={`contact-toast ${status.type}`} role="status" aria-live="polite">
            <div className="contact-toast-head">
              <h4>{status.title}</h4>
              <button
                type="button"
                className="contact-toast-close"
                onClick={() => setStatus((prev) => ({ ...prev, show: false }))}
                aria-label="Close notification"
              >
                x
              </button>
            </div>
            <p>{status.message}</p>
          </aside>
        ) : null}
      </section>
    </PublicLayout>
  );
};

export default ContactPage;
