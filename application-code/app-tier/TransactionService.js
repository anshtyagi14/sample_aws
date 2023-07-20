const dbcreds = require('./DbConfig');
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: dbcreds.DB_HOST,
    user: dbcreds.DB_USER,
    password: dbcreds.DB_PWD,
    database: dbcreds.DB_DATABASE
});

function addTransaction(amount, desc) {
    const sql = 'INSERT INTO `transactions` (`amount`, `description`) VALUES (?, ?)';
    const values = [amount, desc];

    pool.query(sql, values, function (err, result) {
        if (err) {
            console.error('Error adding transaction:', err.message);
            throw err;
        }
        console.log('Added transaction successfully');
    });
}

function getAllTransactions(callback) {
    const sql = 'SELECT * FROM transactions';

    pool.query(sql, function (err, result) {
        if (err) {
            console.error('Error getting all transactions:', err.message);
            throw err;
        }
        console.log('Getting all transactions...');
        callback(result);
    });
}

function findTransactionById(id, callback) {
    const sql = 'SELECT * FROM transactions WHERE id = ?';
    const values = [id];

    pool.query(sql, values, function (err, result) {
        if (err) {
            console.error(`Error retrieving transaction with id ${id}:`, err.message);
            throw err;
        }
        console.log(`Retrieving transaction with id ${id}`);
        callback(result);
    });
}

function deleteAllTransactions(callback) {
    const sql = 'DELETE FROM transactions';

    pool.query(sql, function (err, result) {
        if (err) {
            console.error('Error deleting all transactions:', err.message);
            throw err;
        }
        console.log('Deleting all transactions...');
        callback(result);
    });
}

function deleteTransactionById(id, callback) {
    const sql = 'DELETE FROM transactions WHERE id = ?';
    const values = [id];

    pool.query(sql, values, function (err, result) {
        if (err) {
            console.error(`Error deleting transaction with id ${id}:`, err.message);
            throw err;
        }
        console.log(`Deleting transaction with id ${id}`);
        callback(result);
    });
}

module.exports = { addTransaction, getAllTransactions, deleteAllTransactions, findTransactionById, deleteTransactionById };
