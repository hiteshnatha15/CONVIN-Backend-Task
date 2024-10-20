const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  totalAmount: {
    type: Number,
    required: true,
    min: [0, "Expense amount must be positive"],
  },
  splitType: {
    type: String,
    enum: ["equal", "exact", "percentage"],
    required: true,
  },
  participants: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      amount: {
        type: Number,
        required: function () {
          return this.splitType === "exact";
        },
      },
      percentage: {
        type: Number,
        required: function () {
          return this.splitType === "percentage";
        },
      },
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Validation to ensure percentages add up to 100 for percentage split
expenseSchema.pre("save", function (next) {
  if (this.splitType === "percentage") {
    const totalPercentage = this.participants.reduce(
      (sum, p) => sum + p.percentage,
      0
    );
    if (totalPercentage !== 100) {
      const err = new Error("Total percentages must add up to 100");
      return next(err);
    }
  }
  next();
});

module.exports = mongoose.model("Expense", expenseSchema);
