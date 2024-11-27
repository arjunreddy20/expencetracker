const express = require("express");
const { addExpense, getExpenses, deleteExpense } = require("../controllers/control");

const router = express.Router();

router.post("/add", addExpense); // Add expense
router.get("/", getExpenses); // Get all expenses
router.delete("/:id", deleteExpense); // Delete expense

module.exports = router;
