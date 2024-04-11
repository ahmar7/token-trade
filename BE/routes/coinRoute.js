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

router.route("/addCoins/:id").patch(addCoins);
router.route("/updateCoinAddress/:id").patch(updateCoinAddress);
router.route("/getCoins/:id").get(getCoins);
router.route("/getUserCoin/:id").get(getUserCoin);

router.route("/getCoinsUser/:id").get(getCoinsUser);
router
  .route("/deleteTransaction/:userId/:transactionId")
  .get(deleteTransaction);
router.route("/createTransaction/:id").patch(createTransaction);
router.route("/createUserTransaction/:id").patch(createUserTransaction);
router.route("/updateTransaction/:id").patch(updateTransaction);
router.route("/getTransactions").get(getTransactions);
router.route("/getEachUser/:id").get(getEachUser);
router.route("/deleteEachUser/:id").delete(deleteEachUser);

module.exports = router;
