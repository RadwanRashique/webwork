const express = require("express")
const Adminrouter = express()
const AdminController = require('../controller/adminController')


const subscriptionModel = require('../models/adminsubscriptionMangeModel')

const upload = require("../config/multer");

const AdminAuthmiddleware = require('../middlewares/adminAuthmiddleware')

Adminrouter.post("/adminlogin", AdminController.adminLogin);

Adminrouter.get("/getuserdetails", AdminController.userDetails)

Adminrouter.post("/blockuser", AdminController.blockUser)

Adminrouter.get("/developerdetails", AdminController.developerDetails)

Adminrouter.post("/blockdeveloper", AdminController.blockDeveloper)

Adminrouter.post("/addPlan", AdminController.addingSubscriptionPlan)

Adminrouter.get("/PlanData", AdminController.getPlanData)

Adminrouter.post("/deletePlan", AdminController.deletePlan)

Adminrouter.get("/developerRequestData",AdminAuthmiddleware, AdminController.getRequestData)

Adminrouter.post("/developerDetailedView", AdminController.developerDetailedView)

Adminrouter.post("/developerRequestAction",AdminAuthmiddleware, AdminController.developerRequestAction)

Adminrouter.get("/getDeveloperSubscriptionDetails", AdminController.getDeveloperSubscriptionDetails)

Adminrouter.post("/adminCreateBanner", AdminAuthmiddleware, upload.upload.single("image"), AdminController.adminCreateBanner)

Adminrouter.get('/getBannerData', AdminAuthmiddleware, AdminController.getBannerData)

Adminrouter.post("/handlingBanner", AdminAuthmiddleware, AdminController.handlingBanner)

Adminrouter.get("/getDataToDash", AdminAuthmiddleware, AdminController.getDataToDash)
module.exports = Adminrouter