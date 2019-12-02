const mongoose = require("mongoose");
const Log = require("../models/log.model");

exports.create_log = function (req, res) {
    let log = new Log({
        type: req.body.type,
        comment: req.body.comment,
        songId: req.body.songId,
        submittedOn: Date.now(),
    });
    log.save(function (err) {
        if (err) return res.send({ error: err });
        else return res.send({ msg: "saved log: " + log.type });
    });
};

exports.get_all_logs = function (req, res) {
    Log.find({}, function (err, logs) {
        if (err) return res.send({ error: err });
        else return res.send({ msg: logs }); 
    });
};