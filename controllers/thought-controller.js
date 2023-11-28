const path = require('path');
const { User, Thought } = require(path.join(__dirname, '../models'));

const thoughtController = {
  async getAllThoughts(req, res){
    try{
      const thoughtdb=await Thought.find();
      res.json(thoughtdb);
    }catch(err){
      console.log(err);
      res.status(500).json(err);
    }
  },

  createReaction({ params, body }, res) {
    Thought.findByIdAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },

  deleteReaction({ params }, res) {
    Thought.findByIdAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
