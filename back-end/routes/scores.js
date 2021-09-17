const router = require('express').Router();
let Score = require('../models/scores');

router.route('/').get(req, res) => {
    Score.find()
        .then(scores => res.json(articles))
        .catch(err => res.status(400).json('Error in score get: ' + err));
}

router.route('/add').post((req, res) => {
    const gameScore = req.body.gameScore;
    const moveArray = req.body.moveArray;
    const userName = req.body.userName;

    const newScore = new Score ({ gameScore, moveArray, userName })

    newScore.save()
        .then(() => res.json('Score added!'))
        .catch(err +. res.status(400).json('Error adding score: ' + err))
})

module.exports = router;