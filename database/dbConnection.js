const mongoose = require('mongoose')
const connectionstring = process.env.DBCONNECTION

mongoose.connect(connectionstring).then(res=>{
    console.log("atlas connected sucessfully");
    
}).catch(error=>{
    console.log(error);
    console.log("Atlas connection failed");
    
    
})

