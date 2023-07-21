"use strict";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UsersModel = require("../../models/usersModel");
const CommonService = require("../../services/service");
const { matchedData } = require("express-validator");

var UsersController = {
    registerUser: async function (req, res, next) {
        try {
            const { name, email, password,role } = matchedData(req, {
                includeOptionals: false,
                onlyValidData: true,
                locations: ["body"],
            });

            let response;

            const usersData = await CommonService.list(UsersModel);
            const existingUser = usersData.find((users) => users.email === email);
            if (existingUser) {
                response = {
                    success: 0,
                    message: "User Already exists",
                };
            } else {
                // Encrypt password
                const salt = await bcrypt.genSalt(10);
                const hashGenerated = await bcrypt.hash(password, salt);

                // Get the last registered user to determine the next userId
                const lastUser = usersData[usersData.length - 1];
                let nextUserId = 1;
                if (lastUser && lastUser.userId) {
                    nextUserId = lastUser.userId + 1;
                }

                // Get the data and save into the database
                const userRegistrationData = {
                    name: name,
                    email: email,
                    password: hashGenerated,
                    userId: nextUserId,
                    role: role
                };
                const savedUserData = await CommonService.create(UsersModel, userRegistrationData);
                if (!savedUserData) {
                    response = {
                        success: 0,
                        message: "Failed to save in the database",
                    };
                } else {
                    response = {
                        success: 1,
                        message: "User registered successfully",
                        userId: savedUserData.userId,
                        name: name,
                        email: email,
                    };
                }
            }
            return res.send(response);
        } catch (error) {
            next(error);
        }
    },
    login: async function (req, res, next) {
        const { email, password } = matchedData(req, {
            includeOptionals: false,
            onlyValidData: true,
            locations: ["body"],
        });
        const userFilter = {
            email: email
        }


        const user = await CommonService.list(UsersModel, userFilter);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the stored hashed password using bcrypt
        bcrypt.compare(password, user[0].password, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (!result) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Passwords match, user is authenticated, generate a new JWT token
            const payload = {
                email: user.email
            };
            const token = jwt.sign(payload, "1bmh41$", { expiresIn: '1h' });
            res.json({ token });
        });
    },
    list: async function (req, res, next) {
        try {
            let response = await CommonService.list(UsersModel);
            return res.send(response);
        } catch (error) {
            next(error);
        }
    },
};

module.exports = UsersController;
