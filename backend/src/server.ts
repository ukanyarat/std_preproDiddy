import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import errorHandler from "@common/middleware/errorHandler";
import cookieParser from "cookie-parser";
import { env } from "@common/utils/envConfig";
import { pino } from "pino";

import { userRouter } from "@modules/users/userRouter";


const logger = pino({ name: "server start" });
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());

app.get("/test", (req: Request, res: Response) => {
    res.status(200).json({ status: "Server is running!" });
  });
  

app.use("/v1/user", userRouter);
  

app.use(errorHandler());
export { app, logger };

