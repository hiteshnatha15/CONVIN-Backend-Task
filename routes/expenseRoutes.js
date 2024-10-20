const express = require("express");
const {
  addExpense,
  getUserExpenses,
  getAllExpenses,
  downloadBalanceSheet,
} = require("../controllers/expenseController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", addExpense); // Add expense (protected)
router.get("/user/:userId", getUserExpenses); // Get user expenses (protected)
router.get("/", getAllExpenses); // Get all expenses (protected)
router.get("/balance-sheet/:userId", downloadBalanceSheet);

module.exports = router;
