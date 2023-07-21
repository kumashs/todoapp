"use strict";

const jwt = require("jsonwebtoken");
const authentication = {
 
    validateUser: async function (req, res, next) {
        try {
            const authToken = req.headers["x-gtw-auth-token"];
            if (!authToken) {
                return res.status(403).json({ message: 'No token provided' });
            }

            // Verify the token
            jwt.verify(authToken, "1bmh41$", (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: 'Invalid token' });
                }
                // Valid token, store the decoded user information in the request object
                req.user = decoded;
                next();
            });
        } catch (e) {
            console.log("Auth Error");
            const response = {
                success: 0,
                message: e.message,
            };

            return res.send(response);
        }
    }
};
module.exports = authentication;
