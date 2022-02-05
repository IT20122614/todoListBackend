const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();
const connectionDB = require("./DB/dbConnection");
const userRoute = require("./routes/user");
const loginAuthRoute = require("./routes/auth");


connectionDB();



// middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


//routes
app.use("/api/users", userRoute);
app.use("/api/auth", loginAuthRoute);

const PORT = process.env.PORT || 8081;
app.listen(PORT, ()=>{
    console.log(`Server running on PORT ${PORT}`);
});