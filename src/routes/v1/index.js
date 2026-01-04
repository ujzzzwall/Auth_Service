const express = require('express')
const {AuthRequestValidator} = require('../../middlewares/index')
const UserController = require('../../controllers/user-controller')

const router = express.Router();

router.post('/signup',AuthRequestValidator.ValidateUserAuth, UserController.create);
router.post('/signin',AuthRequestValidator.ValidateUserAuth, UserController.signIn);
router.get('/isVerified' , UserController.isVerified);
router.get('/isAdmin',AuthRequestValidator.validateIsAdmin, UserController.isAdmin);
module.exports = router;