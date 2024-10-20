// expenseController.js

const Expense = require('../models/Expense');
const User = require('../models/User');
const { validateExpenseInput } = require('../utils/validateInputs');
const { generateBalanceSheet } = require('../utils/generateBalanceSheet');
const asyncHandler = require('express-async-handler'); // For error handling

// @desc    Add a new expense
// @route   POST /api/expenses
// @access  Private

// Add Expense
const addExpense = asyncHandler(async (req, res) => {
    const { description, totalAmount, splitType, participants, createdBy } = req.body;

    // Validate split type
    if (!["equal", "exact", "percentage"].includes(splitType)) {
        return res.status(400).json({ message: "Invalid split type" });
    }

    // Create a new expense
    const expense = new Expense({
        description,
        totalAmount, // Updated field name
        splitType,   // Use the correct variable here
        participants,
        createdBy // Include createdBy if required by your schema
    });
    
    const createdExpense = await expense.save();
    res.status(201).json(createdExpense);
});



// @desc    Get individual user's expenses
// @route   GET /api/expenses/user/:userId
// @access  Private
const getUserExpenses = asyncHandler(async (req, res) => {
    const userExpenses = await Expense.find({ 'participants.user': req.params.userId });

    if (userExpenses.length > 0) {
        res.json(userExpenses);
    } else {
        res.status(404);
        throw new Error('No expenses found for this user');
    }
});

// @desc    Get all expenses
// @route   GET /api/expenses
// @access  Private
const getAllExpenses = asyncHandler(async (req, res) => {
    const expenses = await Expense.find({});

    res.json(expenses);
});

// @desc    Download balance sheet as CSV
// @route   GET /api/expenses/balancesheet
// @access  Private
const downloadBalanceSheet = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    // Get all expenses for the user
    const userExpenses = await Expense.find({ 'participants.user': userId })
        .populate('participants.user', 'name email')
        .exec();

    if (!userExpenses) {
        return res.status(404).json({ message: "No expenses found for this user." });
    }

    // Create a simple CSV format
    let csvContent = "Description, Total Amount, Split Type, Participants\n";

    userExpenses.forEach(expense => {
        const participants = expense.participants.map(p => `${p.user.name} (${p.amount})`).join(', ');
        csvContent += `${expense.description}, ${expense.totalAmount}, ${expense.splitType}, ${participants}\n`;
    });

    // Set headers for download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=balance_sheet_${userId}.csv`);
    res.send(csvContent);
});


module.exports = {
    addExpense,
    getUserExpenses,
    getAllExpenses,
    downloadBalanceSheet
};
