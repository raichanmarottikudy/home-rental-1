const express = require('express')
require('dotenv').config()
const cors = require('cors')
const router = require("./routes/router")
require('./database/dbConnection')
const path = require('path')
const hrServer = express()

hrServer.use(cors())
hrServer.use(express.json())
hrServer.use(router)
// hrServer.use("/uploads",express.static("./uploads"))
hrServer.use("/uploads",express.static(path.join(__dirname, 'uploads')))


const PORT = 3000 || process.env.PORT

hrServer.listen(PORT,()=>{
    console.log("inside server port 3000");
    
})

hrServer.get('/',(req,res)=>{
    res.status(200).send("<div>Inside Port 3000</div>")
})