const Entry = require("../models/Entry");

async function createEntry(req, res) {
  try {
    const { title, body, tags } = req.body;

    if (!title || typeof title !== "string" || title.trim() === "" ||
        !body || typeof body !== "string" || body.trim() === "") {
      return res.status(400).json({ error: "title and body are required" });
    }

    const entry = await Entry.create({
      userId: req.userId,
      title: title.trim(),
      body: body.trim(),
      tags: tags || []
    });

    return res.status(201).json({
      message: "Entry created",
      data: entry
    });
  } catch (err) {
    console.error("🔥 CREATE ENTRY ERROR:", err);
    return res.status(500).json({ error: "Server error creating entry" });
  }
}

async function getAllEntries(req, res) {
  try {
    const entries = await Entry.find({ userId: req.userId }).sort({ createdAt: -1 });
    return res.status(200).json({
      message: "Your entries",
      data: entries
    });
  } catch (err) {
    console.error("🔥 GET ALL ENTRIES ERROR:", err);
    return res.status(500).json({ error: "Server error retrieving entries" });
  }
}

async function getOneEntry(req, res) {
  try {
    const entry = await Entry.findOne({ _id: req.params.id, userId: req.userId });

    if (!entry) {
      return res.status(404).json({ error: "Entry not found" });
    }

    return res.status(200).json({
      message: "Entry found",
      data: entry
    });
  } catch (err) {
    console.error("🔥 GET ONE ENTRY ERROR:", err);
    return res.status(400).json({ error: "Invalid ID format" });
  }
}

async function updateEntry(req, res) {
  try {
    const updated = await Entry.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Entry not found" });
    }

    return res.status(200).json({
      message: "Entry updated",
      data: updated
    });
  } catch (err) {
    console.error("🔥 UPDATE ENTRY ERROR:", err);
    return res.status(400).json({ error: err.message });
  }
}

async function deleteEntry(req, res) {
  try {
    const deleted = await Entry.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!deleted) {
      return res.status(404).json({ error: "Entry not found" });
    }

    return res.status(200).json({
      message: "Entry deleted",
      data: { id: deleted._id }
    });
  } catch (err) {
    console.error("🔥 DELETE ENTRY ERROR:", err);
    return res.status(400).json({ error: "Invalid ID format" });
  }
}

module.exports = {
  createEntry,
  getAllEntries,
  getOneEntry,
  updateEntry,
  deleteEntry
};