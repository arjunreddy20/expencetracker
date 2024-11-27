const express = require("express");
const path = require("path");
const userRoute = require("./routes/userRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");

const server = express();

server.use(cors ({
    origin:'*',
}));

server.use(express.json());

server.use(express.static(path.join(__dirname,"views")));

server.use("/users",userRoute);

server.listen(3000,() => {
    console.log("server is running on port 3000");
})

