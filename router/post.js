const express = require("express");
const userData = require("../controler/post");
const role = require("../middlewares/roleMiddleware");
const token = require("../middlewares/token");
const sallerToken = require("../middlewares/sallerToken");

const routes = express.Router();

routes.get("/user/loginu" ,token, userData);
routes.get("/logins" , sallerToken , userData)

module.exports = routes;