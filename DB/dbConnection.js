const mongoose = require("mongoose");

module.exports = () =>{
    const connectionsProperties = {
        useNewUrlParser: true,
		useUnifiedTopology: true,
    };
    try{
        mongoose.connect(process.env.MONGOODB_URL, connectionsProperties);
        console.log("Connected to database successfully");

    }catch(err){
        console.log(error);
		console.log("Could not connect database!");

    }
}