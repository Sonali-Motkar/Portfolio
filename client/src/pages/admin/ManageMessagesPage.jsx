import { useEffect, useState } from "react";
import api from "../../api/axios";

const ManageMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/messages");
      setMessages(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const toggleRead = async (id, isRead) => {
    await api.patch(`/messages/${id}/read`, { isRead: !isRead });
    setMessages((prev) =>
      prev.map((item) => (item._id === id ? { ...item, isRead: !isRead } : item))
    );
  };

  const onDelete = async (id) => {
    // eslint-disable-next-line no-alert
    if (!window.confirm("Delete this message?")) return;
    await api.delete(`/messages/${id}`);
    setMessages((prev) => prev.filter((item) => item._id !== id));
  };

  const filteredMessages = messages.filter((msg) => {
    const q = search.trim().toLowerCase();
    const matchesSearch =
      q.length === 0 ||
      msg.name?.toLowerCase().includes(q) ||
      msg.email?.toLowerCase().includes(q) ||
      msg.subject?.toLowerCase().includes(q) ||
      msg.message?.toLowerCase().includes(q);

    const matchesFilter =
      filter === "all" || (filter === "read" ? msg.isRead : !msg.isRead);

    return matchesSearch && matchesFilter;
  });

  const unreadCount = messages.filter((msg) => !msg.isRead).length;

  return (
    <section className="card admin-message-card">
      <div className="admin-message-head">
        <h2>Contact Messages</h2>
        <span className="admin-unread-badge">Unread: {unreadCount}</span>
      </div>

      <div className="admin-message-controls">
        <input
          type="search"
          placeholder="Search by name, email, subject, message..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="admin-message-filters">
          <button
            className={`btn ${filter === "all" ? "" : "secondary"}`}
            onClick={() => setFilter("all")}
            type="button"
          >
            All
          </button>
          <button
            className={`btn ${filter === "unread" ? "" : "secondary"}`}
            onClick={() => setFilter("unread")}
            type="button"
          >
            Unread
          </button>
          <button
            className={`btn ${filter === "read" ? "" : "secondary"}`}
            onClick={() => setFilter("read")}
            type="button"
          >
            Read
          </button>
        </div>
      </div>

      {loading ? <p>Loading messages...</p> : null}

      {!loading && filteredMessages.length === 0 ? <p>No messages found.</p> : null}

      <div className="admin-message-list">
        {filteredMessages.map((msg) => (
          <article
            key={msg._id}
            className={`item admin-message-item ${msg.isRead ? "is-read" : "is-unread"}`}
          >
            <div className="admin-message-item-head">
              <h3>{msg.subject || "No Subject"}</h3>
              <span className={`admin-read-pill ${msg.isRead ? "read" : "unread"}`}>
                {msg.isRead ? "Read" : "Unread"}
              </span>
            </div>

            <p>
              <strong>From:</strong> {msg.name} ({msg.email})
            </p>
            <p>
              <strong>Received:</strong>{" "}
              {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : "N/A"}
            </p>
            <p>{msg.message}</p>

            <div className="row">
              <button
                className="btn secondary"
                onClick={() => toggleRead(msg._id, msg.isRead)}
                type="button"
              >
                Mark as {msg.isRead ? "Unread" : "Read"}
              </button>
              <button className="btn danger" onClick={() => onDelete(msg._id)} type="button">
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ManageMessagesPage;
