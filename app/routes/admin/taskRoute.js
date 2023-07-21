"use strict";

const AuthenticationHandler = require("../../helpers/authentication");
const Validation = require("../../helpers/validation");
const ErrorHandler = require("../../helpers/errorHandler");

const TaskValidator = require("../../helpers/validators/taskValidator");

const TaskController = require("../../controllers/admin/taskController");

module.exports = (app) => {
    app.route("/task/addTask").post(
        AuthenticationHandler.validateUser,
        TaskValidator.addTask,
        Validation.validateRequest,
        TaskController.addTask
    );
    app.route("/task/list").post(
        AuthenticationHandler.validateUser,
        TaskValidator.list,
        Validation.validateRequest,
        TaskController.list
    );

    app.route("/task/deleteTask").post(
        AuthenticationHandler.validateUser,
        TaskValidator.deleteTask,
        Validation.validateRequest,
        TaskController.deleteTask
    );

    app.use(ErrorHandler);
};