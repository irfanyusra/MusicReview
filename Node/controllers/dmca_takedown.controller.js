const Dmca_Takedown = require('../models/dmca_takedown.model');

exports.create_dmca_takedown = function (req, res) {
    dmca_takedown = new Dmca_Takedown({
        dmca: req.body.dmca,
        takedown: req.body.takedown
    });

    dmca_takedown.save(function (err) {
        console.log("dmca and takedown saving");
        if (err)
            return res.send({ error: err });
        else
            return res.send({ msg: "successfully made dmca and takedown policy" });

    });
};

exports.update_dmca_takedown = function (req, res) {
    Dmca_Takedown.findByIdAndUpdate(req.params.id,
        { $set: req.body }, function (err,result) {
        if (err) return res.send({ error: err });
        else return res.send({ msg: "successfully updated policy" });
    });
};