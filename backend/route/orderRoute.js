import express from "express";
import {isAuthenticated,isAuthorized} from "../middleware/auth.js";

import { newOrder,singleOrder,myOrder,getOrders,updateOrder,deleteOrder} from "../controller/orderController.js";

const router = express.Router();

router
    .route('/order/new')
    .post(isAuthenticated,newOrder)

router
    .route('/order/:id')
    .get(isAuthenticated,singleOrder)
router
    .route('/myorders')
    .get(isAuthenticated,myOrder)

router
    .route('/admin/orders')
    .get(isAuthenticated,isAuthorized('admin'),getOrders);

router
    .route('/admin/order/:id')
    .post(isAuthenticated,isAuthorized("admin"),updateOrder)
    .delete(isAuthenticated,isAuthorized("admin"),deleteOrder)

    
export default router