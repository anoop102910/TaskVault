import { ROLE } from "../constant.js";
import Task from "./task.model.js";

export const createTask = async (req, res) => {
  try {
    req.body.assignee = req.user._id;
    const task = await Task.create(req.body);
    res.status(201).json({ data: task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks =
      req.user.role === ROLE.MANAGER
        ? await Task.find({ assignee: req.user._id })
        : await Task.find({
            assignedTo: { $in: [req.user._id] },
          });
    console.log(tasks);
    res.status(200).json({ data: tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.status(200).json({ data: task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ data: task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
