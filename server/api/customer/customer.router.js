const {createCustomerController} = require('./customer.controller');


const router = require("express").Router();

router.post("/", createCustomerController);

module.exports = router;