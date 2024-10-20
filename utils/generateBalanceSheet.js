// generateBalanceSheet.js
const { Parser } = require('json2csv'); // To generate CSV format

function generateBalanceSheet(expenses, format = 'csv') {
    const balanceSheetData = expenses.map(expense => {
        const participantsDetails = expense.participants.map(p => ({
            user: p.user.name,
            amount: expense.splitType === 'percentage' ? (p.percentage / 100) * expense.totalAmount : p.amount
        }));

        return {
            description: expense.description,
            totalAmount: expense.totalAmount,
            splitType: expense.splitType,
            participants: participantsDetails
        };
    });

    if (format === 'csv') {
        const fields = ['description', 'totalAmount', 'splitType', 'participants.user', 'participants.amount'];
        const parser = new Parser({ fields });
        return parser.parse(balanceSheetData);
    }

    // Implement PDF generation if needed (e.g., using `pdfkit`)
    if (format === 'pdf') {
        // Add PDF generation logic
    }

    return balanceSheetData; // Default to returning the data as JSON object if no format specified
}

module.exports = {
    generateBalanceSheet
};
