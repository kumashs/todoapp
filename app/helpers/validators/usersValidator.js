"use strict";

const { body, header } = require("express-validator");

const register = [
    body("name")
        .exists({ checkNull: true })
        .withMessage("Name is required!"),
    body("password")
        .exists({ checkNull: true })
        .withMessage("Password is required!"),
    body("email")
        .exists({ checkNull: true })
        .withMessage("Password is required!")
        .isEmail()
        .withMessage("Please enter emailId in proper format")
];

const login = [
    body("email")
        .exists({ checkNull: true })
        .withMessage("Email is required!"),
    body("password")
        .exists({ checkNull: true })
        .withMessage("Password is required!"),
];

const list = []

module.exports = {
    login: login,
    list: list,
    register:register
};
