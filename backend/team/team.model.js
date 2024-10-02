import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";
const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    populate:true,
    autopopulate: { select: "-password" },
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      autopopulate: { select: "-password" },
    },
  ],
});

teamSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

teamSchema.plugin(autopopulate);
const Team = mongoose.model("Team", teamSchema);

export default Team;