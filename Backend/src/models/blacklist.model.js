const mongoose = require('mongoose')

const blacklistSchema = new mongoose.Schema({

    token:{
        type:String,
        required:true
    }

},{
    timestamps:true
})



const tokenBlacklistModel = mongoose.model("blacklistToken",blacklistSchema)
module.exports = tokenBlacklistModel