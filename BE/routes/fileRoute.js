let express = require("express");

const { isAuthorizedUser, authorizedRoles } = require("../middlewares/auth");
const {
  uploadFiles,
  getAllData,
  deleteSingleFile,
} = require("../controllers/filesController");
const singleUpload = require("../middlewares/multer");

let router = express.Router();

router
  .route("/uploadFiles/:id")
  .post(singleUpload, isAuthorizedUser, authorizedRoles("admin"), uploadFiles);
router.route("/getAllData/:id").get(isAuthorizedUser, getAllData);
router
  .route("/deleteSingleFile/:_id")
  .get(isAuthorizedUser, authorizedRoles("admin"), deleteSingleFile);

module.exports = router;
