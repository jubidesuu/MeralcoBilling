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



module.exports = router;
