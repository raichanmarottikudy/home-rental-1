const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    filename:(req,file,callback)=>{
        callback(null,`images-${Date.now()}-${file.originalname}`)
    }
})

const multerMiddleware = multer({
    storage
})
module.exports = multerMiddleware