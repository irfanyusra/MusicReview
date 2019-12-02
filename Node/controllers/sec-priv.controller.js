const Security_Privacy = require('../models/sec-priv.model')

exports.create_security_privacy = function (req, res) {
    try {
        let security_privacy = new Security_Privacy({
            security: req.body.security,
            privacy: req.body.privacy,
            submittedOn: Date.now(),

        })

        security_privacy.save(function (err) {
            if (err) return res.send({ error: err });
            else  {
                Security_Privacy.deleteOne({}, 
                    { sort: { 'createdAt': -1 } }, 
                    function (err, policy) {
                    if (err) return res.send({ error: err })
                    else return res.send({ msg: "created security and privacy policy" });
                });
        }
    });
    } catch (err) {
        return res.send({ error: err });
    }
};

exports.get_security_privacy = function (req, res) {
    Security_Privacy.findOne({}, 
        function (err, policy) {
        if (err) return res.send({ error: err });
        else return res.send({ message: policy });     
    });
};

exports.update_security_privacy = function (req, res) {
    Security_Privacy.findByIdAndUpdate(req.params.id, 
        { $set: req.body }, function (err, policy) {
        if (err) return res.send({ error: err });
        else return res.send({ msg: "updated the policy" }); 
    });
}; 
