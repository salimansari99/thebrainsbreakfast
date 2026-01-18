import { Schema, model, models } from "mongoose";
import Thought from "./Thought";

const CommentSchema = new Schema(
  {
    thoughtId: {
      type: Schema.Types.ObjectId,
      ref: "Thought",
      required: true,
    },
    user: {
      name: String,
      image: String,
    },
    text: String,
  },
  { timestamps: true },
);

/* 🔥 Increment count on create */
CommentSchema.post("save", async function () {
  await Thought.findByIdAndUpdate(this.thoughtId, {
    $inc: { commentsCount: 1 },
  });
});

/* 🔥 Decrement on delete */
CommentSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Thought.findByIdAndUpdate(doc.thoughtId, {
      $inc: { commentsCount: -1 },
    });
  }
});

export default models.Comment || model("Comment", CommentSchema);
