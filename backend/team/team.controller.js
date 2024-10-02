import Team from "./team.model.js";

export const createTeam = async (req, res) => {
  const { name, members } = req.body;
  try {
    if (await Team.findOne({ manager: req.user._id })) {
      return res.status(400).json({ message: "You already have a team" });
    }
    const team = new Team({ name, manager: req.user._id, members });
    await team.save();
    res.status(201).json({ data: team });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTeam = async (req, res) => {
  try {
    const team = await Team.findOne({ manager: req.user._id });
    res.status(200).json({ data: team });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getTeamById = async (req, res) => {
  const { id } = req.params;
  try {
    const team = await Team.findOne({ _id: id, manager: req.user._id });
    res.status(200).json({ data: team });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTeam = async (req, res) => {
  try {
    const team = await Team.findOne({ manager: req.user._id });
    if (!team) {
      return res.status(400).json({ message: "You don't have a team" });
    }
    const members = team.members;
    const newMembers = [...members, ...req.body.members];
    await Team.findOneAndUpdate({ manager: req.user._id }, { members: newMembers }, { new: true });
    res.status(200).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const removeMember = async (req, res) => {
  const memberId = req.body.memberId;
  const team = await Team.findOne({ manager: req.user._id });
  const members = team.members;
  const newMembers = members.filter(member => member !== memberId);
  try {
    await Team.findOneAndUpdate({ manager: req.user._id }, { members: newMembers }, { new: true });
    res.status(200).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};