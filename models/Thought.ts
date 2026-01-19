import { Schema, model, models } from "mongoose";

const ThoughtSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    excerpt: {
      type: String,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      index: true,
    },

    author: {
      type: String,
      default: "Thought of the Day",
    },

    imageUrl: String,

    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED"],
      default: "PUBLISHED",
      index: true,
    },

    publishDate: {
      type: Date,
      default: () => new Date(),
      index: true,
    },

    likes: {
      type: Number,
      default: 0,
    },

    likedBy: {
      type: [String],
      default: [],
    },

    commentsCount: {
      type: Number,
      default: 0,
    },

    views: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true },
);

ThoughtSchema.index({ category: 1, publishDate: -1 });
ThoughtSchema.index({ status: 1, publishDate: -1 });

export default models.Thought || model("Thought", ThoughtSchema);
