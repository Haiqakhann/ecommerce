import express from "express";
import { registeruser,loginuser,logoutuser,userDetail,passwordUpdate ,profileUpdate,allUser,singleUser,UpdateRole,deleteUser} from "../controller/userController.js";
import {isAuthenticated,isAuthorized} from "../middleware/auth.js";

const router = express.Router();

router.route('/register').post(registeruser)
router.route('/login').post(loginuser)
router.route('/logout').get(logoutuser)
router.route('/me').get(isAuthenticated,userDetail)
router.route("/password/update").put(isAuthenticated, passwordUpdate);
router.route("/me/update").put(isAuthenticated, profileUpdate);

router
  .route("/admin/users")
  .get(isAuthenticated, isAuthorized("admin"), allUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticated, isAuthorized("admin"), singleUser)
  .put(isAuthenticated, isAuthorized("admin"), UpdateRole)
  .delete(isAuthenticated, isAuthorized("admin"), deleteUser);


export default router