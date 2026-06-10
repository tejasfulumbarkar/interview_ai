const mongoose = require("mongoose")

try {

    async function connectToDb (){
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database connected")
}
    
} catch (error) {

    console.log(error)
    
}



module.exports = connectToDb