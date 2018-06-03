const userModel = require('../model/user');
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
    const user_id = req.body.id;
    const old_password = req.body.old_password;
    const new_password = req.body.new_password;
    userModel.findOne({_id: user_id}).exec().then(result => {
        if (result) {
            jwt.verify(old_password, result.password, (err, decoded) => {
                if (err)
                    res.send({message: 'it is used once'})
                else {
                    userModel.update({_id: user_id}, {$set: {password: new_password}}).exec().then(() => {
                        res.send({message: 'succesfully updated'})
                    }).catch(err => {
                        res.send({message: 'not able to update try again'});
                    })
                }
            })
        }
        else {
            res.send({
                message: 'no such user check link'
            });
        }

    }).catch(err => {
        res.send({message: 'database not working'})
    })

}