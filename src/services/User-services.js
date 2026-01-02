const UserRepository = require('../repository/User-repository')

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

  createToken(user){
    try {
      const result = async this.userRepository
    } catch (error) {
      console.log("Something went wrong in the token creation");
      throw error;
    }
  }
}


module.exports = UserService;