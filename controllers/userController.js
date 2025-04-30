

const users = require('../modals/userModel')
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

exports.registerController = async(req,res)=>{
    console.log("inside controller");
    console.log(req.body);
    
    
    const{username,email,password,role}=req.body
    try {
        const existinguser =await users.findOne({email})
        if(existinguser){
            res.status(404).json("User already exists please login")
        }else{
            const saltRounds = 10
            const hashedPassword = await bcrypt.hash(password,saltRounds)
            const newUser = new users({
                username,email,password:hashedPassword,role,phonenumber:'',userimg:'',
            })
            console.log(hashedPassword);
            
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(401).json(error)
    }
    
}

// exports.loginController = async(req,res)=>{
//     console.log("inside login Controller");
//     const{email,password}=req.body
//     try {
//         const existinguser = await users.findOne({email,password})
//         if(existinguser){
//             const tocken =  jwt.sign({userid:existinguser._id},process.env.JWTPASSWORD)
//             res.status(200).json({user:existinguser,tocken})
//         }else{
//             res.status(404).json("Incorrect email/password")
//         }
//     } catch (error) {
//         res.status(401).json(error)
//     }
// }
exports.loginController = async(req,res)=>{
    console.log("inside login Controller");
    const{email,password}=req.body
    try {
        const existinguser = await users.findOne({email})
        if(!existinguser){
            res.status(401).json("Incorrect email/password")
        }
        const isMatch = await bcrypt.compare(password, existinguser.password);

        if (!isMatch) {
            return res.status(404).json("Incorrect email/password");
        }

            const tocken =  jwt.sign({userid:existinguser._id},process.env.JWTPASSWORD)
            res.status(200).json({user:existinguser,tocken})
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.getUserDetailsController = async(req,res)=>{
    console.log("inside get user details controller");
    const id= req.userid
    console.log(id);
    try {
        const userDetails = await users.findById({_id:id})
        res.status(200).json(userDetails)
    } catch (error) {
        res.status(401).json(error)
    }      
}

exports.editUserController = async(req,res)=>{
    console.log("inside edir user controller");
    const id = req.userid
    const{username,email,password,phonenumber,userimg} = req.body
    const reUploadeImg = req.file?req.file.filename:userimg
    try {
        const editedUser = await users.findByIdAndUpdate({_id:id},{username,email,password,phonenumber,userimg:reUploadeImg},{new:true})
        res.status(200).json(editedUser)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.getpropertyuserController = async(req,res)=>{
    console.log("inside get userProperty User controller");
    const {userid} = req.body
    // console.log(req.parms);
    console.log(userid);

    try {
        const userdetails = await users.findById({_id:userid})
        res.status(200).json(userdetails)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.addtowishlistController =  async(req,res) =>{
    console.log("inside wishlist controller");
    
    const id = req.userid
    const {pid} = req.body
    console.log(pid);
    
    const user = await users.findById({_id:id})
    const existingitem = user.wishlist.find((id)=>id.toString() == pid)
    
    if(existingitem){
        // let user = await users.findByIdAndUpdate({_id:id},
        //     { 
        //         $pull:{wishlist:pid}
        //     },{new:true}
        // )
        res.status(404).json("item already exists")
    }else{
        let user = await users.findByIdAndUpdate({_id:id},
            { 
                $push:{wishlist:pid}
            },{new:true}
        )
        res.status(200).json(user)
    }
   
    
}

exports.ratingcontroller = async(req,res)=>{
    console.log("inside rating controller");
    const id=req.userid
    const {rating} =req.body
    console.log(rating);
    
    try {
        const user = await users.findByIdAndUpdate({_id:id},{rating},{new:true})
    // const rating = await user.updateOne({rating},{new:true})
    res.status(200).json(user)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.getAllUsersRatingController=async(req,res)=>{
    console.log("inside gat all users Controllers");
    try {
        const allusers = await users.find().limit(4)
        res.status(200).json(allusers)
    } catch (error) {
        res.status(401).json(error)
    }
    
}

exports.removewishlistController =  async(req,res) =>{
    console.log("inside remove wishlist controller");
    
    const id = req.userid
    const {pid} = req.body
    console.log(pid);
    
   try {
    const user = await users.findById({_id:id})
    const existingitem = user.wishlist.find((id)=>id.toString() == pid)
    
    if(existingitem){
        let user = await users.findByIdAndUpdate({_id:id},
            { 
                $pull:{wishlist:pid}
            },{new:true}
        )
        res.status(200).json(user)
    }else{
        // let user = await users.findByIdAndUpdate({_id:id},
        //     { 
        //         $push:{wishlist:pid}
        //     },{new:true}
        // )
        res.status(404).json("no user exist")
    }
   } catch (error) {
    res.status(401).json(error)
   }
   
    
}
exports.getUserSAdminController = async(req,res)=>{
    console.log("inside get user details controller");
    // const id= req.userid
    // console.log(id);
    try {
        const userDetails = await users.find({ role: { $ne: "admin" } })
        res.status(200).json(userDetails)
    } catch (error) {
        res.status(401).json(error)
    }      
}

exports.getUserRatingsController = async(req,res)=>{
    console.log("inside get user Rating  controller");
    // const id= req.userid
    // console.log(id);
    try {
        const userRatings = await users.find({ rating: { $exists: true, $ne: null } })
        console.log(userRatings);
        
        res.status(200).json(userRatings)
    } catch (error) {
        res.status(401).json(error)
    }      
}

