"use strict";

const ErrorHandler = (err, req, res, next) => {
    const response = {
        success: 0,
        message: err.message,
    };

    console.log(err);
    return res.send(response);
};

module.exports = ErrorHandler;
