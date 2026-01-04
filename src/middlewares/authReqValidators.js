const ValidateUserAuth = (req,res,next)=>{
  if(!req.body.email || !req.body.password){
    return res.status(400).json({
      success : false,
      message : 'something went wrong ', 
      data : {},
      err : 'email or password missing in the signup request'
    })
  }
  next();
}

const validateIsAdmin = (req,res,next)=>{
  if(!req.body.id){
    return res.status(400).json({
      success : false,
      message : 'something went wrong ', 
      data : {},
      err : 'userid missing '
    }) 
  }
  next();
}

module.exports = { ValidateUserAuth ,validateIsAdmin}