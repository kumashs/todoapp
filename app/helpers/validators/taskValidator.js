"use strict";

const { body, header } = require("express-validator");

const addTask = [
    body("startDate")
        .exists({ checkNull: true })
        .withMessage("startDate is required!"),
    body("endDate")
        .exists({ checkNull: true })
        .withMessage("endDate is required!"),
    body("title")
        .exists({ checkNull: true })
        .withMessage("title is required!"),
    body("description")
        .optional({ checkNull: true }),
    body("userId")
        .exists({ checkNull: true })
        .withMessage("userId is required")
];

const list = [
    body("userId")
        .exists({ checkNull: true })
        .withMessage("User Id is required!")
];

const deleteTask = [
    body("userId")
        .exists({ checkNull: true })
        .withMessage("userId is required!"),
    body("id")
        .exists({ checkNull: true })
        .withMessage("id is required!"),
];


module.exports = {
    addTask: addTask,
    deleteTask: deleteTask,
    list: list
};
