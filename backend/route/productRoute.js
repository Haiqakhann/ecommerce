import express from "express";
import {isAuthenticated,isAuthorized} from "../middleware/auth.js";

import { addProduct, deleteProduct, getProduct, getProductDetail, updateProduct ,addProductReview,getProductReview,deleteProductReview,upload} from "../controller/productController.js";

const router = express.Router();


router
    .route('/product')
    .get(getProduct)

router
    .route('/product/:id')
    .get(getProductDetail)
    
router
    .route('/admin/product/new')
    .post(isAuthenticated,isAuthorized("admin"),upload.single('image'),addProduct);

router
    .route('/admin/product/:id')

    .post(isAuthenticated,isAuthorized("admin"),upload.single('image'),updateProduct)
    .delete(isAuthenticated,isAuthorized("admin"),deleteProduct)

router
    .route('/review')
    .put(isAuthenticated,addProductReview)
    .post(isAuthenticated,isAuthorized("admin"),getProductReview)
    .post(isAuthenticated, deleteProductReview);
    
export default router