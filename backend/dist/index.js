"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db");
const express_1 = require("@clerk/express");
dotenv_1.default.config({
    path: "./.env"
});
app_1.app.get("/", async (req, res) => {
    // Example: fetch a list of users (paginated, default 100)
    try {
        const usersList = await express_1.clerkClient.users.getUserList();
        res.json(usersList);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch users", details: err });
    }
});
(0, db_1.getPgVersion)()
    .then(() => {
    app_1.app.listen(process.env.PORT || 4000, () => {
        console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
})
    .catch((err) => {
    console.log("failed to connect to db", err);
});
