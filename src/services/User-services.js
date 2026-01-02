const UserRepository = require('../repository/User-repository')
const jwt = require('jsonwebtoken')
const {JWT_KEY} = require('../config/serverConfig');
const bcrypt = require('bcrypt');

class UserService{
  constructor(){
    this.userRepository = new UserRepository();
  }

  async create(data){
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong in the service layer");
        throw error;
    }
  }

  async signIn(email , plainPassword){
    try {
      // step 1 -> fetch the user using email
      const user = await this.userRepository.getByEmail(email);
      //step 2 -> comparing password
      const passwordMatch = this.checkPassword(plainPassword ,user.password);
      // step 3 -> Password doesnt match
      if(!passwordMatch){
        console.log("Password doesnt match");
        throw {error : 'incorrect Password'};
      }
      //step 4 -> Password matches create a token and send it to the user
      const newJWT = this.createToken({email : user.email , id : user.id});
      return newJWT;

    } catch (error) {
      console.log("Something went wrong in the sign in process");
        throw error;
    }
  }
  async isAuthenticated(token){
    try {
      const response = await this.verifyToken(token);
      if(!response){
        throw {error : 'invalid token'}
      }
      const user = this.userRepository.getById(response.id);
      if(!user){
        throw {error : 'no user with the corresponding token'}
      }
      return user.id;
    } catch (error) {
      console.log("Something went wrong in the auth process");
        throw error;
    }

  }
  createToken(user){
    try {
      const result = jwt.sign(user , JWT_KEY ,{ expiresIn : 30 })
      return result;
    } catch (error) {
      console.log("Something went wrong in the token creation");
      throw error;
    }
  }

  verifyToken(token){
    try {
      const response = jwt.verify(token , JWT_KEY);
      return response;  
    } catch (error) {
      console.log("Something went wrong in the token creation", error);
      throw error;
    }
  }

  checkPassword(userInputPlainPassword , encryptPassword){
    try {
      return bcrypt.compareSync(userInputPlainPassword , encryptPassword)
    } catch (error) {
      console.log("Something went wrong in Password comparision");
      throw error;
    }
  }
}


module.exports = UserService;