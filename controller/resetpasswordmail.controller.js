let userModel = require('../model/user');
let jwt = require('jsonwebtoken');
const mailgun = require('mailgun-js');

module.exports = (req, res) => {
    const email = req.body.email;
    if (email) {
        userModel.findOne({email}).exec().then(result => {
            if (result) {
                const user_id = result._id;
                const user_old_password = result.password;
                jwt.sign({user_old_password},user_old_password,{expiresIn: '1h'},(err,token)=>{
                    let api_key = 'key-d5a1386fde04efc8c3bf3462e767eacc-b892f62e-0523fa06';
                    let domain = 'sandbox14a306a00f4849ae81a4762d9856be51.mailgun.org';
                     mailgun({apiKey: api_key, domain: domain});
                    let data = {
                        from: 'auth <ankit.14bcs2022@abes.ac.in>',
                        to: email,
                        subject: 'Hello',
                        html: `<a href="http://localhost:4200/${user_id}/${token}">http://localhost:4200/${user_id}/${token}</a>`
                    };
                    mailgun.messages().send(data, function (error, body) {
                        if(error){
                            console.log(error);
                        }else{
                            console.log(body);
                        }

                    });
                    res.send({status:'success'});
                })
            } else {
                res.send({
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