const UserService = require('../services/User-services');

const userService = new UserService(); 


const create = async(req,res)=>{
  try {
    const response =  await userService.create({
      email : req.body.email,
      password: req.body.password
    });
    return res.status(201).json({
      message : "Successfully created a new user",
      data : response,
      err: {},
      success :true 
    })
  } catch (error) {
      console.log(error)
      return res.status(500).json({
        message : "something went wrong",
        data : {},
        err: error,
        success :false
      })
  }
}

module.exports ={
  create
}