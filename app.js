const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose(); // Include the SQLite library
const app = express();

const corsOptions = {
  origin: ['http://65.20.102.228:3000'], // Replace with your frontend's URL
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const port = process.env.PORT || 8084;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Create an SQLite database
const db = new sqlite3.Database('customers.db', (err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to SQLite database');
    
    // Create the "customers" table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS customers (
      customerid INTEGER PRIMARY KEY AUTOINCREMENT,
      customername TEXT,
      customeraddress TEXT,
      mobile TEXT
    )`, (err) => {
      if (err) {
        console.error('Error creating the "customers" table:', err);
      } else {
        console.log('Created "customers" table (if it didn\'t exist)');
      }
    });
  }
});

// GET all customers
app.get('/api/v1/customer/getAllCustomers', (req, res) => {
    db.all('SELECT * FROM customers', (err, rows) => {
      if (err) {
        console.error('Error fetching customers:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(rows);
      }
    });
  });
  
  // POST a new customer
  app.post('/api/v1/customer/newCustomer', (req, res) => {
    const { customername, customeraddress, mobile } = req.body;
    db.run(
      'INSERT INTO customers (customername, customeraddress, mobile) VALUES (?, ?, ?)',
      [customername, customeraddress, mobile],
      (err) => {
        if (err) {
          console.error('Error adding customer:', err);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          res.json({ message: 'Customer added successfully' });
        }
      }
    );
  });
  
  // PUT (update) an existing customer
  app.put('/api/v1/customer/updateCustomer', (req, res) => {
    const { customerid, customername, customeraddress, mobile } = req.body;
    db.run(
      'UPDATE customers SET customername = ?, customeraddress = ?, mobile = ? WHERE customerid = ?',
      [customername, customeraddress, mobile, customerid],
      (err) => {
        if (err) {
          console.error('Error updating customer:', err);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          res.json({ message: 'Customer updated successfully' });
        }
      }
    );
  });
  
  // DELETE a customer by ID
  app.delete('/api/v1/customer/deleteCustomer/:customerid', (req, res) => {
    const { customerid } = req.params;
    db.run('DELETE FROM customers WHERE customerid = ?', [customerid], (err) => {
      if (err) {
        console.error('Error deleting customer:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json({ message: 'Customer deleted successfully' });
      }
    });
  });
  
