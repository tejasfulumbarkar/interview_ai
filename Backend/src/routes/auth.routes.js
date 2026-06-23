// in this file we create all auth related api 

const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware')
const authController = require('../controllers/authController')

const authRouter = express.Router()




authRouter.post("/register",authController.registerUserController)
authRouter.post("/login",authController.loginUserController)
authRouter.get("/logout",authController.logoutUserController)
authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController)
 

module.exports = authRouter