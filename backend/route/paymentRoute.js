import express from "express";
const router = express.Router();

import {isAuthenticated} from "../middleware/auth.js";
import { paymentProcess,stripeApikey } from "../controller/paymentController.js"
router.route("/payment/process").post(isAuthenticated,paymentProcess)

router.route("/stripeapikey").get(isAuthenticated,stripeApikey);

export default router
