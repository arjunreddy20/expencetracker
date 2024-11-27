const db = require("../db");

// Add expense
exports.addExpense = (req, res) => {
    const { amount, description, category } = req.body;
    const sqlQuery = 'INSERT INTO extable (amount, description, category) VALUES (?, ?, ?)';
    db.query(sqlQuery, [amount, description, category], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to add expense here." });
        } else {
            res.json({ message: "Expense added successfully!", id: result.insertId });
        }
    });
};

// Fetch all expenses
exports.getExpenses = (req, res) => {
    const sqlQuery = 'SELECT * FROM extable';
    db.query(sqlQuery, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to fetch expenses." });
        } else {
            res.json(results);
        }
    });
};

// Delete expense
exports.deleteExpense = (req, res) => {
    const { id } = req.params;
    const sqlQuery = 'DELETE FROM extable WHERE id = ?';
    db.query(sqlQuery, [id], (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to delete expense." });
        } else {
            res.json({ message: "Expense deleted successfully!" });
        }
    });
};


