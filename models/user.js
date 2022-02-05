const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({

	username: { 
        type: String, 
        
    },
	
	email: { 
        type: String, 
        required: true 
    },
	password: { 
        type: String, 
        required: true 
    },
});

userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({ _id: this._id}, process.env.JWTKEY,{
        expiresIn: 86400,
    });
    return token;
};
const User = mongoose.model("users", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		
		email: Joi.string().email().required().label("email"),
		password: passwordComplexity().required().label("password"),
	});
	return schema.validate(data);
};


module.exports = { User, validate };