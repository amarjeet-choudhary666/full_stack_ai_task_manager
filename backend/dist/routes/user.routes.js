"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clerkAuthMiddleware_1 = require("../middlewares/clerkAuthMiddleware");
const user_controller_1 = require("../controllers/user.controller");
const express_2 = require("@clerk/express");
const router = (0, express_1.Router)();
router.route("/me").post((0, express_2.requireAuth)(), clerkAuthMiddleware_1.saveUserIfNotExists, user_controller_1.getOrCreateUser);
exports.default = router;
