import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";
const projectSchema = new mongoose.Schema(
  {
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        autopopulate: { select: "-password" },
        required: true,
      },
    ],
    status: {
      type: String,
      default: "pending",
    },
    progress: {
      type: Number,
      default: 0,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);
projectSchema.plugin(autopopulate);
projectSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
const Project = mongoose.model("Project", projectSchema);

export default Project;
