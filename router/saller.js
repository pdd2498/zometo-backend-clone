const express = require("express");
const userSaler = require("../controler/saller");

const routes = express.Router();

routes.post("/saller" , userSaler.userSaller);
routes.post("/logins" , userSaler.sallerLogin);

module.exports = routes;
