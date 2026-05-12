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
    hackerrank: "https://www.hackerrank.com/profile/sonalimotkar001",
    leetcode: "https://leetcode.com/u/Sonal_motkar/",
    resume: "/resume.pdf",
    email: "sonalimotkar4@gmail.com"
  };
  const profileLinks = [
    {
      key: "email",
      label: "Email",
      icons: ["https://api.iconify.design/logos:google-gmail.svg"]
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      icons: [
        "https://api.iconify.design/logos:linkedin-icon.svg",
        "https://cdn.simpleicons.org/linkedin/0A66C2"
      ]
    },
    {
      key: "github",
      label: "GitHub",
      icons: [
        "https://cdn.simpleicons.org/github/111111",
        "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/github.svg"
      ]
    },
    {
      key: "hackerrank",
      label: "HackerRank",
      icons: [
        "https://cdn.simpleicons.org/hackerrank/00EA64",
        "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/hackerrank.svg"
      ]
    },
    {
      key: "leetcode",
      label: "LeetCode",
      icons: [
        "https://cdn.simpleicons.org/leetcode/F89F1B",
        "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/leetcode.svg"
      ]
    },
    {
      key: "resume",
      label: "Download Resume",
      icons: ["https://api.iconify.design/bi:file-earmark-pdf-fill.svg?color=%230a4174"],
      download: true
    }
  ];

  const handleIconError = (event) => {
    const img = event.currentTarget;
    const sources = (img.dataset.sources || "").split("|").filter(Boolean);
    const nextIndex = Number(img.dataset.fallbackIndex || "0") + 1;

    if (nextIndex < sources.length) {
      img.dataset.fallbackIndex = String(nextIndex);
      img.src = sources[nextIndex];
      return;
    }

    img.style.display = "none";
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
      <section className="card contact-section page-animate-in">
        <div className="cert-section-head contact-head animate-rise delay-1">
          <h2>Contact</h2>
          <p>Open to internships, collaborations, freelance projects, and tech discussions.</p>
          <div className="contact-head-tags">
            <span>Internships</span>
            <span>Collaborations</span>
            <span>Freelance Projects</span>
          </div>
        </div>

        <div className="contact-layout">
          <aside className="contact-side">
            <article className="contact-mini-card animate-rise delay-1">
              <h3>Get In Touch</h3>
              <p>Connect with me through these profiles and I will respond quickly.</p>
              <div className="quick-links social-logo-links">
                {profileLinks.map((item) => (
                  <a
                    key={item.key}
                    href={links[item.key]}
                    target={item.download ? undefined : "_blank"}
                    rel={item.download ? undefined : "noreferrer"}
                    download={item.download || undefined}
                    aria-label={item.label}
                    title={item.label}
                    className="social-logo-link"
                  >
                    <img
                      src={item.icons[0]}
                      alt=""
                      loading="lazy"
                      data-sources={item.icons.join("|")}
                      data-fallback-index="0"
                      onError={handleIconError}
                    />
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
            </article>

            <div className="contact-stats animate-rise delay-2">
              <article className="contact-stat" style={{ "--reveal-index": 0 }}>
                <p className="contact-stat-label">Location</p>
                <p className="contact-stat-value">Pune, Maharashtra</p>
              </article>
              <article className="contact-stat" style={{ "--reveal-index": 1 }}>
                <p className="contact-stat-label">Response Time</p>
                <p className="contact-stat-value">Within 24 hours</p>
              </article>
              <article className="contact-stat" style={{ "--reveal-index": 2 }}>
                <p className="contact-stat-label">Preferred Mode</p>
                <p className="contact-stat-value">Email / LinkedIn</p>
              </article>
            </div>

          </aside>

          <article className="contact-form-card animate-rise delay-3">
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
