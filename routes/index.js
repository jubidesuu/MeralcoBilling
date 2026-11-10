//endpoints

const express = require('express');
const router= express.Router();
const meralco_billsControllers = require('../controllers/meralcoBillControllers');

//GET
router.get("/meralco-bills", meralco_billsControllers.getAllUsers);

//GET by account number
router.get("/meralco-bills/:accNumber", meralco_billsControllers.getUserbyAccountNo)

//POST
router.post("/meralco-bills", meralco_billsControllers.createUser);

//PUT
router.put("/meralco-bills", meralco_billsControllers.UpdateUser);

//PUT
router.delete("/meralco-bills", meralco_billsControllers.deleteUser);



//GET Search by Name
router.get("/meralco-bills/:Name", meralco_billsControllers.getUserbyName)

// GET - Filter by Payment Status
router.get(
  "/meralco-bills/status/:status",meralco_billsControllers.filterByStatus);

  //Get Sort by amount
router.get("/meralco-bills/sort/amount", meralco_billsControllers.sortByAmount );
//Get TOTAL AMOUNT DUE
router.get("/meralco-bills/calculate/total",meralco_billsControllers.calculateTotal);


module.exports = router;
