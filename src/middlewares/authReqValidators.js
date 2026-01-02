const ValidateUserAuth = (req,res,next)=>{
  if(!req.body.email || !req.body.password){
    return res.status(400).json({
      success : false,
      message : 'something went wrong ', 
      data : 'email or password missing in the signup request',
    })
  }
  next();
}

module.exports = { ValidateUserAuth }