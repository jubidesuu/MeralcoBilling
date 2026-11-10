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