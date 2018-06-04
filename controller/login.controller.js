let userModel = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
    const {email, password} = req.body;
    userModel.find({email}).exec().then((result) => {
        if (result.length) {
            bcrypt.compare(password, result[0].password, (err, result) => {
                if (err) {
                    res.send({
                        status: 'failed',
                        message: 'something went wrong with server try again'
                    })
                } else if (result) {
                    jwt.sign({email}, 'dragonballz', {expiresIn: '1h'}, (err, token) => {
                        if (err) {
                            res.send({
                                status: 'failed',
                                message: 'login failed'
                            })
                        } else {
                            res.status(200).send({
                                status: 'success',
                                token
                            })
                        }
                    })
                } else {
                    res.send({
                        status: 'failed',
                        message: 'wrong password'
                    })
                }
            })
        } else {
            res.send({
                status: 'failed',
                message: 'user with this email_id not registered'
            })
        }
    }).catch((err) => {
        res.send({err});
    })
}