"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getTasks = exports.createTask = exports.generateTask = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const ApiError_1 = require("../utils/ApiError");
const ApiResponse_1 = require("../utils/ApiResponse");
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const gemini_1 = require("../services/gemini");
exports.generateTask = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { topic } = req.body;
    if (!topic) {
        throw new ApiError_1.ApiError(400, "Topic is required to generate tasks");
    }
    const tasks = await (0, gemini_1.generateTasks)(topic);
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, tasks, "Tasks generated successfully"));
});
exports.createTask = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { title, description, userId } = req.body;
    if (!title || !userId) {
        throw new ApiError_1.ApiError(400, "All feilds are required");
    }
    const newTask = await db_1.db.insert(schema_1.tasks).values({
        title,
        description,
        userId
    }).returning();
    return res.status(201).json(new ApiResponse_1.ApiResponse(201, newTask, "Task created successfully"));
});
exports.getTasks = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
        throw new ApiError_1.ApiError(400, "userId is required in the query");
    }
    const allTasks = await db_1.db
        .select()
        .from(schema_1.tasks)
        .where((0, drizzle_orm_1.eq)(schema_1.tasks.userId, userId));
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, allTasks, "Tasks fetched successfully"));
});
exports.getTaskById = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError_1.ApiError(400, "Task ID is required");
    }
    const task = await db_1.db.select().from(schema_1.tasks).where((0, drizzle_orm_1.eq)(schema_1.tasks.id, String(id)));
    if (!task[0]) {
        throw new ApiError_1.ApiError(404, "Task not found");
    }
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, task[0], "Task fetched successfully"));
});
exports.updateTask = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    if (!id) {
        throw new ApiError_1.ApiError(400, "Task ID (UUID) is required in URL");
    }
    const existing = await db_1.db.select().from(schema_1.tasks).where((0, drizzle_orm_1.eq)(schema_1.tasks.id, id));
    if (!existing[0]) {
        throw new ApiError_1.ApiError(404, "Task not found");
    }
    const updated = await db_1.db
        .update(schema_1.tasks)
        .set({
        ...(title && { title }),
        ...(description && { description }),
        ...(typeof completed === "boolean" && { completed }),
        updatedAt: new Date(),
    })
        .where((0, drizzle_orm_1.eq)(schema_1.tasks.id, id))
        .returning();
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, updated[0], "Task updated successfully"));
});
exports.deleteTask = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError_1.ApiError(400, "Task ID (UUID) is required in the URL");
    }
    const existing = await db_1.db.select().from(schema_1.tasks).where((0, drizzle_orm_1.eq)(schema_1.tasks.id, id));
    if (!existing[0]) {
        throw new ApiError_1.ApiError(404, "Task not found");
    }
    const deleted = await db_1.db.delete(schema_1.tasks).where((0, drizzle_orm_1.eq)(schema_1.tasks.id, id)).returning();
    return res.status(200).json(new ApiResponse_1.ApiResponse(200, deleted[0], "Task deleted successfully"));
});
