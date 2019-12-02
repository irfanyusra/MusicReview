const Dmca_Takedown = require('../models/dmca_takedown.model');

exports.create_dmca_takedown = function (req, res) {
    dmca_takedown = new Dmca_Takedown({
        dmca: req.body.dmca,
        takedown: req.body.takedown,
        submittedOn: Date.now(),

    });

    dmca_takedown.save(function (err) {
        console.log("dmca and takedown saving");
        if (err)
            return res.send({ error: err });
        else {
            Dmca_Takedown.deleteOne({},
                { sort: { createdAt: -1 } },
                function (err, policy) {
                    if (err) return res.send({ error: err });
                    else return res.send({ msg: "successfully made dmca and takedown policy" });
                });
        }
    });
};

exports.get_dmca_takedown = function (req, res) {
    Dmca_Takedown.findOne({}, function (err, policy) {
        if (err) res.send({ error: err });
        else return res.send({ msg: policy });

    });
};

exports.update_dmca_takedown = function (req, res) {
    Dmca_Takedown.findByIdAndUpdate(req.params.id,
        { $set: req.body }, function (err, result) {
            if (err) return res.send({ error: err });
            else return res.send({ msg: "successfully updated policy" });
        });
};

