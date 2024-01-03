const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  isPublished: {
    type: Boolean,
    default: false,
  },
  timestamp: { type: Date },
});

PostSchema.virtual("url").get(function () {
  return `/posts/${this._id}`;
});

module.exports = mongoose.model("Post", PostSchema);
