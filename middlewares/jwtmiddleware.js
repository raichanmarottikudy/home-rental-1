const jwt = require('jsonwebtoken')

const jwtMiddleware =(req,res,next)=>{
    console.log("inside middleware");
    const tocken = req.headers['authorization'].split(" ")[1]
    console.log(tocken);

    if (tocken) {
        try {
            const jwtResponse = jwt.verify(tocken,process.env.JWTPASSWORD)
            console.log(jwtResponse);
             req.userid = jwtResponse.userid
            next()

        } catch (error) {
            res.status(404).json("Authorization Failed")
            
        }
    }else{
        res.status(401).json("Token Missing")
    }
    
}

module.exports = jwtMiddleware