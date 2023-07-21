"use strict";

const AuthenticationHandler = require("../../helpers/authentication");
const Validation = require("../../helpers/validation");
const ErrorHandler = require("../../helpers/errorHandler");

const UsersValidator = require("../../helpers/validators/usersValidator");

const UsersController = require("../../controllers/admin/usersController");

module.exports = (app) => {
    // app.use(AuthenticationHandler.validateUser);

    app.route("/admin/register").post(
        UsersValidator.register,
        Validation.validateRequest,
        UsersController.registerUser
    );
    app.route("/admin/login").post(
        UsersValidator.login,
        Validation.validateRequest,
        UsersController.login
    );
    app.route("/admin/list").post(
        AuthenticationHandler.validateUser,
        UsersValidator.list,
        Validation.validateRequest,
        UsersController.list
    );

    app.use(ErrorHandler);
};