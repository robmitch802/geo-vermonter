const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scoresSchema = new Schema ({
    gameScore: String,
    moveArray: Array,
    userName: String,
},
    {
    timestamps: true,
    });

const Score = mongoose.model('Score', scoresSchema);

module.exports = Score;