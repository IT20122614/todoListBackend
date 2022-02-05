const router = require("express").Router();
const {User, validate} = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");


router.post("/", async(req, res)=>{

    try{
        const {error} = validates(req.body);
        if(error)
            return res.status(400).send({ message: error.details[0].message });
        

        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(401).send({ message: "Invalid Email or Password" });
        

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword)
            return res.status(401).send({ message: "Invalid Email or Password" });
        
            
            res.status(200).send({ data:user, message: "logged in successfully" });

    }catch(error){
        res.status(500).send({ message: `Internal Server Error${error}` });

    }
});
const validates = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("email"),
		password: Joi.string().required().label("password"),
	});
	return schema.validate(data);
};

module.exports = router;