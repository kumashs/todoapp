"use strict";
const AdminUsersRoute = require("./admin/usersRoute");
const TaskRoute = require("./admin/taskRoute");
module.exports = (app) => {
    /**
     * Admin Routes
     */
    TaskRoute(app)
    AdminUsersRoute(app);

    /**
     * Generic Routes
     */

    /**
     * Factory Outlet Routes
     */
}
