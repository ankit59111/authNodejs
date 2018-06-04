let userModel = require('../model/user');
const bcrypt =  require('bcryptjs');
module.exports=(req,res)=>{
    let {firstName,lastName,email,address,password}=req.body;
    if(firstName&&email&&address&&password){
        userModel.find({email}).exec().then(result=>{
            if(result.length){
                res.send({
                    status:'failed',
                    message:'email_id already exists'
                })
            }else{
                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(password,salt,(err,hash)=>{
                        if(err){
                            res.send({
                                status:'failed',
                                message:'something went wrong during hashing'
                            })
                        }else{
                            const user  = new userModel({
                                firstName,
                                lastName,
                                email,
                                address,
                                password:hash
                            });
                            user.save((err,result)=>{
                                if(err){
                                    res.send({status:'failed',err})
                                }else{
                                    res.status(200).send({
                                        status:'success'})
                                }
                            })
                        }
                    })
                })

            }
        }).catch(err=>{
            res.send({status:'failed',message:'something wrong in search query',err})
        })

    }else{
        res.send({
            status:'failed',
            message:'missing parameters'

        })
    }
}