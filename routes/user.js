const router = require("express").Router();
const {User, validate} = require("../models/user");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res)=>{


    

    try{
        // const {error} = validate(req.body);
        
        // if(error)
        //     return res.status(400).send({ message: error});
        

        // const user = User.findOne({ email: req.body.email });
        // console.log(user);


        // if(user)
        //     return res.status(409).send({ message: "User with given email already Exist! "});
        

        // // const salt = await bcrypt.genSalt(Number(process.env.SALT));
        // const hashPassword = bcrypt.hashSync(req.body.password, 8);
        // // const hashPassword = "#Kavindu811";

        // await new User({ ...req.body, password: hashPassword }).save();
        // res.status(201).send({ message: "User created successfully" });

        
            const username = req.body.username;
            const email = req.body.email;
            const password = req.body.password;
            const hashPassword = bcrypt.hashSync(password, 10);
    
            // const newUser = new User({
            //     username,email,hashPassword
            // });
            // newUser.save()
            new User({ ...req.body, password: hashPassword }).save()
            .then(()=>{
                res.status(200).send({ message: "User created successfully" });
            }).catch((err)=>{
                res.status(409).send({ message: "User not registered" });
            });

        






    }catch(error){
        res.status(500).send({ message: `Internal Server Error${error}` });

    }
});
module.exports = router;