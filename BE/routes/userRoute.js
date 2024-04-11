let express = require("express");
const {
  RegisterUser,
  loginUser,
  logoutUser,
  resetPassword,
  allUser,
  singleUser,
  updateSingleUser,
  verifySingleUser,
  getsignUser,
  verifyToken,
  updateKyc,
  sendTicket,
  getHtmlData,
  setHtmlData,
  bypassSingleUser,
  sendEmailCode,
  createAccount,
  deletePayment,
  addCard,
} = require("../controllers/userController");
const { authorizedRoles } = require("../middlewares/auth");
const singleUpload = require("../middlewares/multer");

let router = express.Router();

router.route("/register").post(RegisterUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/allUser").get(authorizedRoles("admin"), allUser);
router.route("/singleUser/:id").get(authorizedRoles("admin"), singleUser);
router
  .route("/updateSingleUser/:id")
  .post(authorizedRoles("admin"), updateSingleUser);
router
  .route("/bypassSingleUser/:id")
  .patch(authorizedRoles("admin"), bypassSingleUser);
router.route("/verifySingleUser").patch(singleUpload, verifySingleUser);
router.route("/getHtmlData").get(getHtmlData);
router.route("/password/reset").post(resetPassword);
router.route("/getsignUser").patch(singleUpload, getsignUser);
router.route("/:id/verify/:token").get(verifyToken);
router.route("/updateKyc/:id").patch(authorizedRoles("admin"), updateKyc);
router.route("/setHtmlData").patch(authorizedRoles("admin"), setHtmlData);
router.route("/sendTicket").post(sendTicket);
router.route("/createAccount/:id").patch(createAccount);
router.route("/addCard/:id").patch(addCard);
router.route("/sendEmail").post(sendEmailCode);
router.route("/deletePayment/:id/:pId").get(deletePayment);

module.exports = router;
