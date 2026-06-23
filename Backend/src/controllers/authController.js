const userModel = require('../models/user.model')
const tokenBlacklistModel = require('../models/blacklist.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


async function registerUserController(req,res){

    const {username , email , password }  = req.body

    if (!username || !email || !password){
        return res.status(400).json({
            message : "please provide username email and password "

        })
    }

    // this will find user either by email or username 
    const isUserExist = await userModel.findOne({
        $or:[{username},{email}]
    })

    if(isUserExist){
        return res.status(400).json({
            message:"user already exist witht this username or email"
        })
    }

    // hashing password 

    const hash = await bcrypt.hash(password,10)

    const newUser = await userModel.create({
        username,
        email,
        password:hash
    })

    const token = jwt.sign(
        {id:newUser._id , username:newUser.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token",token)

    res.status(201).json({
        message:"user registered successfully",
        user:{
            id:newUser._id,
            username:newUser.username,
            email:newUser.email
        }
    })


}

async function loginUserController(req,res) {

    const {email , password} = req.body

    const user = await userModel.findOne({email})


    if(!user){
       return res.status(400).json({
        message:"INVALID EMAIL OR PASSWORD"
       })
    }

   const ispasswordvalid = await bcrypt.compare(password,user.password)
    
   if(!ispasswordvalid){
    return res.status(400).json({
        message:"Invalid email or password"
    })
   }

   const token = jwt.sign(
        {id:user._id , username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token",token)

    res.status(200).json({
        message: "user logged in successfully",
        user:{
        id:user._id,
        username:user.username,
        email :user.email

        }
        

    })
}

async function logoutUserController(req,res){

    const token = req.cookies.token

    if(token){

        await tokenBlacklistModel.create({token})
    }
    res.clearCookie("token")

    res.status(200).json({
        message:"user logged out successfully"
    })
}

async function getMeController(req,res){

    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message:"user details fetched successfully",
        user:{
            id:user._id,
            username: user.username,
            email: user.email
        }
    })

}
module.exports = {registerUserController ,loginUserController,logoutUserController,getMeController}