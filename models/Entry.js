// const mongoose = require("mongoose");

// const EntrySchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true
//     },
//     title: { type: String, required: true },
//     body: { type: String, required: true },
//     tags: [{ type: String }]
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Entry", EntrySchema);

const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: { type: String, required: true },
    body: { type: String, required: true },
    tags: [{ type: String }],
    // New fields for your Filter feature (exactly as planned)
    category: { 
      type: String, 
      trim: true 
    },
    status: { 
      type: String, 
      enum: ["active", "completed", "archived"], 
      default: "active" 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Entry", EntrySchema);