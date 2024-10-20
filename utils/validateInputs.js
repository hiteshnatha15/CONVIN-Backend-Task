// validateInputs.js

// Validate user inputs
function validateUserInput(userData) {
  const { name, email, mobile } = userData;

  // Validate name
  if (!name || name.trim().length === 0) {
    return { isValid: false, message: "Name is required" };
  }

  // Validate email format
  const emailRegex = /\S+@\S+\.\S+/;
  if (!email || !emailRegex.test(email)) {
    return { isValid: false, message: "Invalid email format" };
  }

  // Validate mobile number (10 digits)
  const mobileRegex = /^[0-9]{10}$/;
  if (!mobile || !mobileRegex.test(mobile)) {
    return { isValid: false, message: "Invalid mobile number format" };
  }

  return { isValid: true };
}

// Validate expense inputs
function validateExpenseInput(expenseData) {
  const { totalAmount, participants, splitType } = expenseData;

  // Validate total amount
  if (totalAmount <= 0) {
    return { isValid: false, message: "Total amount must be positive" };
  }

  // Validate splitType
  if (!["equal", "exact", "percentage"].includes(splitType)) {
    return { isValid: false, message: "Invalid split type" };
  }

  // Validate participants
  if (!participants || participants.length === 0) {
    return { isValid: false, message: "At least one participant is required" };
  }

  // Additional validation for exact and percentage split
  if (splitType === "exact") {
    const totalSplit = participants.reduce((sum, p) => sum + p.amount, 0);
    if (totalSplit !== totalAmount) {
      return {
        isValid: false,
        message: "Sum of exact amounts must equal total amount",
      };
    }
  }

  if (splitType === "percentage") {
    const totalPercentage = participants.reduce(
      (sum, p) => sum + p.percentage,
      0
    );
    if (totalPercentage !== 100) {
      return { isValid: false, message: "Sum of percentages must equal 100%" };
    }
  }

  return { isValid: true };
}

module.exports = {
  validateUserInput,
  validateExpenseInput,
};
