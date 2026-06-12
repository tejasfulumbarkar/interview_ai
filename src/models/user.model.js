const mongoose  = require ("mongoose")


const userSchema = mongoose.Schema({

    username:{
        type:String,
        unique:[true,"username already taken"],
        required = true
    },

    email:{
        type:String,
        unique:true,
        required = true
    }



})


const userModel = mongoose.model("users",userSchema);