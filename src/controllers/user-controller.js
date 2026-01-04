const { sign } = require('jsonwebtoken');
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

const signIn = async(req, res)=>{
  try {
    const response = await userService.signIn(
      req.body.email , 
      req.body.password
    );
    return res.status(201).json({
      message : "Successfully sign in",
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

const isVerified = async (req,res)=>{
  try {
    const token = req.headers['x-access-token'];
    const response = await userService.isAuthenticated(token);
    return res.status(201).json({
      message : "Successfully Verified the user and token is valid",
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

const isAdmin = async (req,res)=>{
  try {
    const user = await userService.isAdmin(req.body.id)
    return res.status(201).json({
      message : " Admin Successfully Verified ",
      data : user,
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
  create, signIn ,isVerified ,isAdmin
}