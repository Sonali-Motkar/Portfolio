import Message from "../models/Message.js";

export const createMessage = async (req, res) => {
  const message = await Message.create(req.body);
  res.status(201).json(message);
};

export const getMessages = async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
};

export const deleteMessage = async (req, res) => {
  const message = await Message.findByIdAndDelete(req.params.id);
  if (!message) {
    return res.status(404).json({ message: "Message not found" });
  }

  res.json({ message: "Message deleted" });
};

export const toggleMessageRead = async (req, res) => {
  const { isRead } = req.body;
  const message = await Message.findByIdAndUpdate(
    req.params.id,
    { isRead: Boolean(isRead) },
    { returnDocument: "after" }
  );

  if (!message) {
    return res.status(404).json({ message: "Message not found" });
  }

  res.json(message);
};
