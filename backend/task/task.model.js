import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";
import { TASK_PRIORITY, TASK_STATUS } from "../constant.js";

const subTaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    priority: {
      type: String,
      default: TASK_PRIORITY.NORMAL,
    },
    status: {
      type: String,
      default: TASK_STATUS.TO_DO,
    },
    progress: {
      type: Number,
      default: 0,
    },
  },
);

const taskSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      autopopulate: { select: "-password -role" },
      required: true,
    },
    assignedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        autopopulate: { select: "-password -role" },
      },
    ],
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    priority: {
      type: String,
      default: TASK_PRIORITY.NORMAL,
    },
    status: {
      type: String,
      default: TASK_STATUS.TO_DO,
    },
    progress: {
      type: Number,
      default: 0,
    },
    subTasks: [subTaskSchema],
    dueDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

taskSchema.plugin(autopopulate);
taskSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
