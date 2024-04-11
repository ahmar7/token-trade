let express = require("express");

const { authorizedRoles } = require("../middlewares/auth");
const {
  addCoins,
  getCoins,
  updateCoinAddress,
  createTransaction,
  updateTransaction,
  getTransactions,
  getEachUser,
  getCoinsUser,
  getUserCoin,
  deleteEachUser,
  createUserTransaction,
  deleteTransaction,
} = require("../controllers/coinsController");

let router = express.Router();

router.route("/addCoins/:id").patch(authorizedRoles("admin"), addCoins);
router
  .route("/updateCoinAddress/:id")
  .patch(authorizedRoles("admin"), updateCoinAddress);
router.route("/getCoins/:id").get(authorizedRoles("admin"), getCoins);
router.route("/getUserCoin/:id").get(getUserCoin);

router.route("/getCoinsUser/:id").get(getCoinsUser);
router
  .route("/deleteTransaction/:userId/:transactionId")
  .get(authorizedRoles("admin"), deleteTransaction);
router
  .route("/createTransaction/:id")
  .patch(authorizedRoles("admin"), createTransaction);
router.route("/createUserTransaction/:id").patch(createUserTransaction);
router
  .route("/updateTransaction/:id")
  .patch(authorizedRoles("admin"), updateTransaction);
router.route("/getTransactions").get(authorizedRoles("admin"), getTransactions);
router.route("/getEachUser/:id").get(authorizedRoles("admin"), getEachUser);
router
  .route("/deleteEachUser/:id")
  .delete(authorizedRoles("admin"), deleteEachUser);

module.exports = router;
