let userModel = require('../model/user');
let jwt = require('jsonwebtoken');

module.exports = (req, res) => {
    const email = req.body.email;
    if (email) {
        userModel.findOne({email}).exec().then(result => {
            if (result) {
                const user_id = result._id;
                const user_old_password = result.password;
                jwt.sign({user_old_password},user_old_password,{expiresIn: '1h'},(err,token)=>{
                    res.send(`<a href="http://localhost:4200/${user_id}/${token}">http://localhost:5000/${user_id}/${token}</a>`);
                })
            } else {
                res.status(400).send({
                    message: 'no such mail found in database',
                    status: 'failed'
                })
            }
        });
    } else {
        res.send({
            status: 'failed',
            message: 'missing parameter'
        })
    }
}