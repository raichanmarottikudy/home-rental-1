
const properties = require('../modals/propertyModel');
const users = require('../modals/userModel')


exports.addProperty = async(req,res)=>{
    console.log("inside property controller");
    console.log(req.userid);
    const userid = req.userid
    const{city,state,district,address,rent,propertytype,totalarea,bedrooms,bathrooms,additionalinfo} = req.body

    const propertyImg = req.files.map(file=>file.filename)
    console.log(city,state,district,address,rent,propertytype,totalarea,bedrooms,bathrooms,additionalinfo,propertyImg);
    try {
        const newProperty = new properties({
            city,state,district,address,rent,propertytype,totalarea,bedrooms,bathrooms,additionalinfo,propertyImg,userid
        })
        await newProperty.save()
        res.status(200).json(newProperty)
    } catch (error) {
        res.status(401).json(error)
    }
    
}

exports.getPropertyController = async(req,res) =>{
    console.log("inside get Property controller");
    
    try {
        const gethomeProperty = await properties.find().limit(8)
        res.status(200).json(gethomeProperty)
    } catch (error) {
        res.status(401).json(error)
    }
    
}

exports.getUserPropertyController = async(req,res)=>{
    console.log("inside user property controller");
    const userid = req.userid
    try {
        const userProperties = await properties.find({userid})
        res.status(200).json(userProperties)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.deteleUserProperty = async(req,res) =>{
    console.log("inside controller");
    const {id} = req.params
    try {
        const deleteProperty = await properties.findByIdAndDelete({_id:id})
        await users.updateMany(
            { wishlist: id },
            { $pull: { wishlist: id } }
          );
        res.status(200).json(deleteProperty)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.editProperty = async(req,res)=>{
    console.log("inside edit project controller");
    const userid = req.userid
    const{id} = req.params
    const{city,state,district,address,rent,propertytype,totalarea,bedrooms,bathrooms,additionalinfo} = req.body
    let existingImg = req.body.propertyImg;
    if (existingImg && !Array.isArray(existingImg)) {
        existingImg = [existingImg];
      }
    // const reUploadeImg = req.file?req.file.filename:propertyImg
    // const reUploadeImg = req.files?req.files.map(file=>file.filename) : existingImg;
    const reUploadedImg = (req.files && req.files.length > 0)
  ? req.files.map(file => file.filename)
  : existingImg;
    console.log(city,state,district,address,rent,propertytype,totalarea,bedrooms,bathrooms,additionalinfo,existingImg,reUploadedImg);
    console.log(existingImg);
    console.log(reUploadedImg);
    
    
    
    try {
        const editedProperty = await properties.findByIdAndUpdate({_id:id},{city,state,district,address,rent,propertytype,totalarea,bedrooms,bathrooms,additionalinfo,propertyImg:reUploadedImg,userid},{new:true})
        res.status(200).json(editedProperty)
        console.log(editedProperty);
        
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.searchController = async(req,res)=>{
    console.log("inside search conteroller");
    const userid = req.userid
    const searchKey = req.query.search
    console.log(searchKey);
    const query ={
        $or:[
            {city:{$regex:searchKey,$options:"i"}},
            {state:{$regex:searchKey,$options:"i"}},
            {district:{$regex:searchKey,$options:"i"}}
        ]
        }
    try {
        const searchResult = await properties.find(query)
        res.status(200).json(searchResult)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.getUserWishlistProperty = async(req,res) =>{
    console.log("inside controller");
    const {id} = req.params
    console.log(req.params);
    
    try {
        const wishlistProperty = await properties.findById({_id:id})
        res.status(200).json(wishlistProperty)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.getAdminPropertyController = async(req,res) =>{
    console.log("inside get Property controller");
    
    try {
        const gethomeProperty = await properties.find()
        res.status(200).json(gethomeProperty)
    } catch (error) {
        res.status(401).json(error)
    }
    
}

exports.getHomePropertyAfterLoginController = async(req,res) =>{
    console.log("getAdminPropertyAfterLoginController");

    const userid = req.userid
    console.log(userid);
    const homeproperties = await properties.find({userid:{$ne:userid}})
    res.status(200).json(homeproperties)
    
}