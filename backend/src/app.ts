import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";



const app = express();


app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));


app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);


import taskRoutes from "./routes/task.routes";
import userRoutes from "./routes/user.routes"

app.use('/v1/users', userRoutes);
app.use("/v1/tasks", taskRoutes);
  
export { app };
