let userModel = require('../model/user');
const bcrypt =  require('bcryptjs');

module.exports=(req,res)=>{
    const {email,password}=req.body;
    userModel.find({email}).exec().then((result)=>{
        if(result.length){
            bcrypt.compare(password,result[0].password,(err,result)=>{
                if(err){
                    res.status(400).send({
                        status:'failed',
                        message:'something went wrong with server try again'
                    })
                }else if(result){
                    res.status(200).send({
                        status:'success',
                        message:'validation succesful'
                    })
                }else{
                    res.status(400).send({
                        status:'failed',
                        message:'wrong password'
                    })
                }
            })
        }else{
            res.status(400).send({
                status:'failed',
                message:'user with this email_id not registered'
            })
        }
    }).catch((err)=>{
        res.status(400).send({err});
    })
}