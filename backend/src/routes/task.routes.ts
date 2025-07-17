import { Router } from "express";
import {
  generateTask,
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller";

import { clerkAuthMiddleware } from "../middlewares/clerkAuthMiddleware";

const router = Router();

router.post("/generate",generateTask);


router.post("/create", createTask);          
router.get("/", getTasks);             
router.get("/:id",  getTaskById);       
router.put("/:id",  updateTask);        
router.delete("/:id",  deleteTask);     

export default router;
