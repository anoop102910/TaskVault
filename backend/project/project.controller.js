import Project from "./project.model.js";

export const createProject = async (req, res) => {
  try {
    req.body.manager = req.user._id;
    console.log(req.body)
    const project = new Project(req.body);
    console.log(project);
    await project.save();
    res.status(201).json({data: project});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    if(req.user.role === "manager") {
      const projects = await Project.find({ manager: req.user._id });
      res.status(200).json({data: projects});
    } else {
      const projects = await Project.find({ members: req.user._id });
      res.status(200).json({data: projects});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findOne({ _id: id, manager: req.user._id });
    res.status(200).json({data: project});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findOneAndUpdate({ _id: id, manager: req.user._id }, req.body, { new: true });
    res.status(200).json({data: project});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};  

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    await Project.findOneAndDelete({ _id: id, manager: req.user._id });
    res.status(200).json({message: "Project deleted successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};