import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { db } from "../db";
import { tasks } from "../db/schema";
import { eq } from "drizzle-orm";
import { generateTasks } from "../services/gemini";

// Generate tasks from Gemini API
export const generateTask = asyncHandler(async (req, res) => {
  const { topic } = req.body;

  if (!topic) {
    throw new ApiError(400, "Topic is required to generate tasks");
  }

  const generated = await generateTasks(topic);

  return res.status(200).json(
    new ApiResponse(200, generated, "Tasks generated successfully")
  );
});

// Create a new task
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, clerkId } = req.body;

  if (!title || !clerkId) {
    throw new ApiError(400, "All fields are required");
  }

  const newTask = await db.insert(tasks).values({
    title,
    description,
    clerkId
  }).returning();

  return res.status(201).json(new ApiResponse(201, newTask[0], "Task created successfully"));
});

export const getTasks = asyncHandler(async (req, res) => {
  const clerkId = req.query.clerkId as string;

  if (!clerkId) {
    throw new ApiError(400, "userId is required in the query");
  }

  const allTasks = await db
    .select()
    .from(tasks)
    .where(eq(tasks.clerkId, clerkId));

  return res.status(200).json(
    new ApiResponse(200, allTasks, "Tasks fetched successfully")
  );
});

export const getTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Task ID is required");
  }

  const task = await db.select().from(tasks).where(eq(tasks.id, id));

  if (!task[0]) {
    throw new ApiError(404, "Task not found");
  }

  return res.status(200).json(
    new ApiResponse(200, task[0], "Task fetched successfully")
  );
});

export const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  if (!id) {
    throw new ApiError(400, "Task ID (UUID) is required in URL");
  }

  const existing = await db.select().from(tasks).where(eq(tasks.id, id));
  if (!existing[0]) {
    throw new ApiError(404, "Task not found");
  }

  const updated = await db
    .update(tasks)
    .set({
      ...(title && { title }),
      ...(description && { description }),
      ...(typeof completed === "boolean" && { completed }),
      updatedAt: new Date(),
    })
    .where(eq(tasks.id, id))
    .returning();

  return res.status(200).json(
    new ApiResponse(200, updated[0], "Task updated successfully")
  );
});

// Delete a task
export const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Task ID (UUID) is required in the URL");
  }

  const existing = await db.select().from(tasks).where(eq(tasks.id, id));
  if (!existing[0]) {
    throw new ApiError(404, "Task not found");
  }

  const deleted = await db.delete(tasks).where(eq(tasks.id, id)).returning();

  return res.status(200).json(
    new ApiResponse(200, deleted[0], "Task deleted successfully")
  );
});
