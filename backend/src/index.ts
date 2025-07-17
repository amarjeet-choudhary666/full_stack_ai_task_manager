import { app } from "./app";
import dotenv from "dotenv";
import { getPgVersion } from "./db";
import { users } from "./db/schema";
import { clerkClient, requireAuth } from "@clerk/express";

dotenv.config()


getPgVersion()
.then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server running on http://localhost:${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("failed to connect to db", err);
})