import { Schema, model, models } from "mongoose";

const AnalyticsSchema = new Schema(
  {
    thoughtId: {
      type: Schema.Types.ObjectId,
      ref: "Thought",
      index: true,
    },
    date: {
      type: String, // YYYY-MM-DD
      index: true,
    },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default models.Analytics || model("Analytics", AnalyticsSchema);
