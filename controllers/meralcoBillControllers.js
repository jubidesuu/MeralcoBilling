//SQL
//MySQL
const connection = require("../config/db");
//GET
exports.getAllUsers = (req, res) => {
  connection.query("SELECT * FROM meralco_bills", (err, rows, fields) => {
    if (err) throw err;
    res.json(rows);
  });
};

//GET by account number
exports.getUserbyAccountNo = (req, res) => {
  const accountNo = req.params.accNumber;
  connection.query(
    "SELECT * FROM meralco_bills WHERE account_number=?",
    [accountNo],
    (err, rows, fields) => {
      if (err) throw err;

      if (rows.length > 0) res.json(rows);
      else res.status(404).json({ message: "404 IP not found!" });
    },
  );
};

//POST
exports.createUser = (req, res) => {
  const { id, account, customer, kilowatt, amount, status } = req.body;

  connection.query(
    "INSERT INTO meralco_bills (id, account_number, customer_name, kilowatt_per_hour, amount_due, payment_status) VALUES (?,?,?,?,?,?)",
 [id, account, customer, kilowatt, amount, status],
 (err, result) => {
      if (err) throw err;
      res.json({ message: "User created successfully", id: result.insertId });
    },
);
};

//PUT

exports.UpdateUser = (req, res) => {
  const { id, account, customer, kilowatt, amount, status } = req.body;

  connection.query(
    "UPDATE  meralco_bills SET  account_number=?, customer_name=?, kilowatt_per_hour=?, amount_due=?, payment_status=? WHERE id=?",
 [ account, customer, kilowatt, amount, status, id],
 (err, result) => {
      if (err) throw err;
      if (result.affectedRows > 0) 
      res.json({ message: "User updated successfully" });
      else res.status(404).json({ message: "404 User not found!" });
    },
);
};

//DELETE
exports.deleteUser = (req, res) => {
    const id = req.body.id;
    connection.query('DELETE FROM meralco_bills WHERE id =?', [id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) 
            res.json({ message: "User deleted successfully" });
        else res.status(404).json({ message: "404 User not found!" });
    });
}





//EXTRA
// GET Search by name

exports.getUserbyName = (req, res) => {
  const SearchByName = req.params.Name;
  connection.query(
    "SELECT * FROM meralco_bills WHERE customer_name LIKE ?",
    [`%${SearchByName}%`],
    (err, rows, fields) => {
      if (err) throw err;

      if (rows.length > 0) res.json(rows);
      else res.status(404).json({ message: "404 IP not found!" });
    },
  );
};


// GET - Filter by Payment Status
exports.filterByStatus = (req, res) => {
  const status = req.params.status;

  connection.query(
    "SELECT * FROM meralco_bills WHERE payment_status = ?",
    [status],
    (err, rows, fields) => {
      if (err) throw err;

      if (rows.length > 0) {
        res.json(rows);
      } else {
        res.status(404).json({
          message: "No bills found!"
        });
      }
    },
  );
};

// GET - Sort bills by amount due
exports.sortByAmount = (req, res) => {
  connection.query(
    "SELECT * FROM meralco_bills ORDER BY amount_due DESC", //DESC — highest to lowest ASC — lowest to highest
    (err, rows) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      res.json(rows);
    }
  );
};



// GET - Calculate total amount due
exports.calculateTotal = (req, res) => {
  connection.query(
    "SELECT SUM(amount_due) AS total_amount FROM meralco_bills",
    (err, rows) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      res.json(rows[0]);
    }
  );
};
