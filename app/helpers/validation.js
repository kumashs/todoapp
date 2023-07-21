"use strict";

const { validationResult } = require("express-validator");

const validation = {
    /**
     * @description Validate express-validator response and return error if found any in validars response
     *
     * @param {*} req - HTTP request argument to the middleware function
     * @param {*} res - HTTP response argument to the middleware function
     * @param {*} next - Callback argument to the middleware function, Middleware stack remaining to call
     * @returns
     */
    validateRequest: async function (req, res, next) {
        try {
            const validationsResult = validationResult(req);

            if (!validationsResult.isEmpty()) {
                let errorMsg = "";
                validationsResult.errors.map((error) => {
                    errorMsg += error.param + " - " + error.msg + " & ";
                });

                errorMsg = errorMsg.slice(0, -3);
                throw new Error(errorMsg);
            }

            return next();
        } catch (err) {
            const response = {
                success: 0,
                message: err.message,
            };

            return res.send(response);
        }
    },
};

module.exports = validation;
