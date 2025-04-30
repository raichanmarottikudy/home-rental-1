const express = require('express')
const userController = require('../controllers/userController')
const router = new express.Router()
const jwtMiddleware = require('../middlewares/jwtmiddleware')
const propertyController = require('../controllers/propertyController')
const multerMiddleware = require('../middlewares/multerMiddleware')


router.post('/register',userController.registerController)

router.post('/login',userController.loginController)

router.post('/addProperty',jwtMiddleware,multerMiddleware.array('propertyImg',10),propertyController.addProperty)

router.get('/getProperty',propertyController.getPropertyController)

router.get('/getUserProperty',jwtMiddleware,propertyController.getUserPropertyController)

router.delete('/property/:id/remove',jwtMiddleware,propertyController.deteleUserProperty)

router.put('/property/:id/edit',jwtMiddleware,multerMiddleware.array('propertyImg',10),propertyController.editProperty)

router.get('/userDetails',jwtMiddleware,userController.getUserDetailsController)

router.put('/edit-user',jwtMiddleware,multerMiddleware.single('userimg'),userController.editUserController)

router.get('/property',jwtMiddleware,propertyController.searchController)

router.put('/property/:id',userController.getpropertyuserController)

router.put('/addtowishlist',jwtMiddleware,userController.addtowishlistController)

router.get('/property/:id',propertyController.getUserWishlistProperty)

router.put('/rating',jwtMiddleware,userController.ratingcontroller)

router.get('/getrating',userController.getAllUsersRatingController)

router.put('/removewishlist',jwtMiddleware,userController.removewishlistController)

router.get('/getAdminProperty',propertyController.getAdminPropertyController)

router.get('/getUsersAdmin',userController.getUserSAdminController)

router.get('/getUsersAdmin',userController.getUserSAdminController)

router.get('/getUserRatingsAdmin',userController.getUserRatingsController)

router.get('/getHomePropertiesAfterLogin',jwtMiddleware,propertyController.getHomePropertyAfterLoginController)

module.exports = router