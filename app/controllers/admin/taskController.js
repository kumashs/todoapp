"use strict";

const CommonService = require("../../services/service");
const TaskModel = require("../../models/taskModel");
const { matchedData } = require("express-validator");
const UsersModel = require("../../models/usersModel");

var TasksController = {
    list: async function (req, res, next) {
        try {
            const { userId } = matchedData(req, {
                includeOptionals: false,
                onlyValidData: true,
                locations: ["body"],
            });
            console.log(req.body)
            const taskFilter = {
                addedBy: userId
            }

            const task = await CommonService.list(TaskModel, taskFilter);
            console.log(task)
            if (!task)
                res.status(403).send({ success: 0, message: "Failed to fetched the task" });
            return res.status(200).send({ success: 1, message: "Task fetched successfully", data: task });
        } catch (error) {
            next(error);
        }
    },
    addTask: async function (req, res, next) {
        try {
            const { startDate, endDate, title, description, userId } = matchedData(req, {
                includeOptionals: false,
                onlyValidData: true,
                locations: ["body"],
            });

            const users = await CommonService.list(UsersModel, {}, { userId: 1, _id: 0 }, {});
            const tasksData = await CommonService.list(TaskModel);
            const existingUser = users.find((data) => { return userId === data.userId });
            if (existingUser) {
                // Get the last registered user to determine the next userId
                const lastTask = tasksData[tasksData.length - 1];
                let nextTaskId = 1;
                if (lastTask && lastTask.taskId) {
                    nextTaskId = lastTask.taskId + 1;
                }
                const taskData = {
                    startDate: Number(startDate),
                    taskId:nextTaskId,
                    endDate: Number(endDate),
                    title: title,
                    description: description,
                    addedBy: userId
                }
                const task = await CommonService.create(TaskModel, taskData);
                if (!task)
                    res.status(403).send({ success: 0, message: "Failed to add the task" });
                return res.status(200).send({ success: 1, message: "Task added successfully" });
            } else {
                res.status(404).send({ success: 0, message: "User not found" });
            }
        } catch (error) {
            next(error);
        }
    },
    deleteTask: async function (req, res, next) {
        try {
            const { id, userId } = matchedData(req, {
                includeOptionals: false,
                onlyValidData: true,
                locations: ["body"],
            });

            const users = await CommonService.list(UsersModel, {}, { userId: 1, _id: 0 }, {});
            const existingUser = users.find((data) => { return userId === data.userId });
            if (existingUser) {
                const deleteData = {
                    taskId: id,
                    addedBy: userId
                }
                const task = await CommonService.deleteMany(TaskModel, deleteData);
                if (!task)
                    res.status(403).send({ success: 0, message: "Failed to delete the task" });
                else{
                    return res.status(200).send({ success: 1, message: "Task deleted successfully" });
                }
            } else {
                res.status(404).send({ success: 0, message: "User not found" });
            }
        } catch (error) {
            next(error);
        }
    },

};

module.exports = TasksController;
