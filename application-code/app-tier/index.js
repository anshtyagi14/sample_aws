const transactionService = require('./TransactionService');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Health Checking
app.get('/health', (req, res) => {
  res.json({ message: 'This is the health check' });
});

// ADD TRANSACTION
app.post('/transaction', (req, res) => {
  try {
    const { amount, desc } = req.body;
    if (!amount || !desc) {
      throw new Error('Invalid data: amount and desc are required');
    }

    console.log(req.body);
    console.log(amount);
    console.log(desc);

    const success = transactionService.addTransaction(amount, desc);
    if (success) {
      res.status(200).json({ message: 'Added transaction successfully' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
});

// GET ALL TRANSACTIONS
app.get('/transaction', (req, res) => {
  try {
    transactionService.getAllTransactions(function (results) {
      console.log('we are in the call back:');
      const transactionList = results.map(row => ({
        id: row.id,
        amount: row.amount,
        description: row.description
      }));
      console.log(transactionList);
      res.status(200).json({ result: transactionList });
    });
  } catch (err) {
    res.status(500).json({ message: 'Could not get all transactions', error: err.message });
  }
});

// DELETE ALL TRANSACTIONS
app.delete('/transaction', (req, res) => {
  try {
    transactionService.deleteAllTransactions(function (result) {
      res.status(200).json({ message: 'Delete function execution finished.' });
    });
  } catch (err) {
    res.status(500).json({ message: 'Deleting all transactions may have failed.', error: err.message });
  }
});

// DELETE ONE TRANSACTION
app.delete('/transaction/:id', (req, res) => {
  try {
    const { id } = req.params;
    transactionService.deleteTransactionById(id, function (result) {
      res.status(200).json({ message: `Transaction with id ${id} seemingly deleted` });
    });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting transaction', error: err.message });
  }
});

// GET SINGLE TRANSACTION
app.get('/transaction/:id', (req, res) => {
  try {
    const { id } = req.params;
    transactionService.findTransactionById(id, function (result) {
      if (result.length === 0) {
        res.status(404).json({ message: 'Transaction not found' });
        return;
      }

      const { id, amount, description } = result[0];
      res.status(200).json({ id, amount, description });
    });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving transaction', error: err.message });
  }
});

app.listen(port, () => {
  console.log(`AB3 backend app listening at http://localhost:${port}`);
});
