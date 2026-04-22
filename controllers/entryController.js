// const Entry = require("../models/Entry");

// // async function createEntry(req, res) {
// //   try {
// //     const { title, body, tags } = req.body;

// //     if (!title || typeof title !== "string" || title.trim() === "" ||
// //         !body || typeof body !== "string" || body.trim() === "") {
// //       return res.status(400).json({ error: "title and body are required" });
// //     }

// //     const entry = await Entry.create({
// //       userId: req.userId,
// //       title: title.trim(),
// //       body: body.trim(),
// //       tags: tags || []
// //     });

// //     return res.status(201).json({
// //       message: "Entry created",
// //       data: entry
// //     });
// //   } catch (err) {
// //     console.error("🔥 CREATE ENTRY ERROR:", err);
// //     return res.status(500).json({ error: "Server error creating entry" });
// //   }
// // }

// async function createEntry(req, res) {
//   try {
//     const { title, body, tags, category, status } = req.body;

//     if (!title || typeof title !== "string" || title.trim() === "" ||
//         !body || typeof body !== "string" || body.trim() === "") {
//       return res.status(400).json({ error: "title and body are required" });
//     }

//     const entry = await Entry.create({
//       userId: req.userId,
//       title: title.trim(),
//       body: body.trim(),
//       tags: tags || [],
//       category: category ? category.trim() : undefined,
//       status: status
//     });

//     return res.status(201).json({
//       message: "Entry created",
//       data: entry
//     });
//   } catch (err) {
//     console.error("🔥 CREATE ENTRY ERROR:", err);
//     return res.status(500).json({ error: "Server error creating entry" });
//   }
// }

// // async function getAllEntries(req, res) {
// //   try {
// //     const entries = await Entry.find({ userId: req.userId }).sort({ createdAt: -1 });
// //     return res.status(200).json({
// //       message: "Your entries",
// //       data: entries
// //     });
// //   } catch (err) {
// //     console.error("🔥 GET ALL ENTRIES ERROR:", err);
// //     return res.status(500).json({ error: "Server error retrieving entries" });
// //   }
// // }

// // async function getOneEntry(req, res) {
// //   try {
// //     const entry = await Entry.findOne({ _id: req.params.id, userId: req.userId });

// //     if (!entry) {
// //       return res.status(404).json({ error: "Entry not found" });
// //     }

// //     return res.status(200).json({
// //       message: "Entry found",
// //       data: entry
// //     });
// //   } catch (err) {
// //     console.error("🔥 GET ONE ENTRY ERROR:", err);
// //     return res.status(400).json({ error: "Invalid ID format" });
// //   }
// // }

// async function getAllEntries(req, res) {
//   try {
//     const { tag, category, status: queryStatus } = req.query;

//     // === REQUIRED VALIDATION RULE FOR THE FEATURE ===
//     const allowedStatuses = ["active", "completed", "archived"];
//     if (queryStatus && !allowedStatuses.includes(queryStatus)) {
//       return res.status(400).json({ 
//         error: "Invalid status value. Must be one of: active, completed, archived" 
//       });
//     }

//     // Build dynamic MongoDB filter based on query parameters (exactly as you planned)
//     let filter = { userId: req.userId };

//     // Support one OR more tags (e.g. ?tag=tomatoes or ?tag=tomatoes,soil)
//     if (tag) {
//       const tagList = tag.split(",").map(t => t.trim()).filter(t => t.length > 0);
//       if (tagList.length > 0) {
//         filter.tags = { $in: tagList };
//       }
//     }

//     if (category) {
//       filter.category = category.trim();
//     }

//     if (queryStatus) {
//       filter.status = queryStatus;
//     }

//     const entries = await Entry.find(filter).sort({ createdAt: -1 });

//     return res.status(200).json({
//       message: "Your entries",
//       data: entries
//     });
//   } catch (err) {
//     console.error("🔥 GET ALL ENTRIES ERROR:", err);
//     return res.status(500).json({ error: "Server error retrieving entries" });
//   }
// }

// async function updateEntry(req, res) {
//   try {
//     const updated = await Entry.findOneAndUpdate(
//       { _id: req.params.id, userId: req.userId },
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ error: "Entry not found" });
//     }

//     return res.status(200).json({
//       message: "Entry updated",
//       data: updated
//     });
//   } catch (err) {
//     console.error("🔥 UPDATE ENTRY ERROR:", err);
//     return res.status(400).json({ error: err.message });
//   }
// }

// async function deleteEntry(req, res) {
//   try {
//     const deleted = await Entry.findOneAndDelete({
//       _id: req.params.id,
//       userId: req.userId
//     });

//     if (!deleted) {
//       return res.status(404).json({ error: "Entry not found" });
//     }

//     return res.status(200).json({
//       message: "Entry deleted",
//       data: { id: deleted._id }
//     });
//   } catch (err) {
//     console.error("🔥 DELETE ENTRY ERROR:", err);
//     return res.status(400).json({ error: "Invalid ID format" });
//   }
// }

// module.exports = {
//   createEntry,
//   getAllEntries,
//   getOneEntry,
//   updateEntry,
//   deleteEntry
// };

const Entry = require("../models/Entry");

async function createEntry(req, res) {
  try {
    const { title, body, tags, category, status } = req.body;

    if (!title || typeof title !== "string" || title.trim() === "" ||
        !body || typeof body !== "string" || body.trim() === "") {
      return res.status(400).json({ error: "title and body are required" });
    }

    const entry = await Entry.create({
      userId: req.userId,
      title: title.trim(),
      body: body.trim(),
      tags: tags || [],
      category: category ? category.trim() : undefined,
      status: status
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
    const { tag, category, status: queryStatus } = req.query;

    // REQUIRED VALIDATION RULE (for Assignment 26)
    const allowedStatuses = ["active", "completed", "archived"];
    if (queryStatus && !allowedStatuses.includes(queryStatus)) {
      return res.status(400).json({ 
        error: "Invalid status value. Must be one of: active, completed, archived" 
      });
    }

    // Build dynamic filter exactly as planned in Assignment 25
    let filter = { userId: req.userId };

    if (tag) {
      const tagList = tag.split(",").map(t => t.trim()).filter(t => t.length > 0);
      if (tagList.length > 0) {
        filter.tags = { $in: tagList };
      }
    }

    if (category) {
      filter.category = category.trim();
    }

    if (queryStatus) {
      filter.status = queryStatus;
    }

    const entries = await Entry.find(filter).sort({ createdAt: -1 });

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