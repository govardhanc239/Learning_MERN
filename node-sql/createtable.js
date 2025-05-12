

import mysql from 'mysql';

const con = mysql.createConnection({
  host: "172.16.40.55",
  user: "govardhanc",
  password: "Admin@123456!",
  database: "govardhanc_testdb"  
});

con.connect(err => {
  if (err) throw err;
  console.log("Connected to MySQL!");

  const createCustomersTable = `
    CREATE TABLE IF NOT EXISTS customers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      address VARCHAR(255)
    )`;

  const createOrdersTable = `
    CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      product VARCHAR(255),
      amount INT,
      customer_id INT,
      FOREIGN KEY (customer_id) REFERENCES customers(id)
    )`;

  con.query(createCustomersTable, err => {
    if (err) throw err;
    console.log("Customers table created.");

    con.query(createOrdersTable, err => {
      if (err) throw err;
      console.log("Orders table created.");

      const insertCustomers = `
        INSERT INTO customers (name, address)
        VALUES 
          ('Alice', 'New York'),
          ('Bob', 'California'),
          ('Charlie', 'Texas')`;

      con.query(insertCustomers, err => {
        if (err) throw err;
        console.log("Sample customers inserted.");

        const insertOrders = `
          INSERT INTO orders (product, amount, customer_id)
          VALUES 
            ('Laptop', 1, 1),
            ('Phone', 2, 2),
            ('Tablet', 1, 1),
            ('Monitor', 1, 3)`;

        con.query(insertOrders, err => {
          if (err) throw err;
          console.log("Sample orders inserted.");

          const joinQuery = `
            SELECT customers.name AS customer, orders.product, orders.amount
            FROM orders
            JOIN customers ON orders.customer_id = customers.id`;

          con.query(joinQuery, (err, result) => {
            if (err) throw err;
            console.log("Customer Orders:");
            console.table(result);
            con.end(); // End the connection
          });
        });
      });
    });
  });
});
