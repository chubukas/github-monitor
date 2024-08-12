// src/index.ts
import express, { Application, RequestHandler } from "express";
import morgan from "morgan";
import cors from "cors";

import { Routes } from "./server/modules";

import { corsOptions, errorRequest, Logger } from "./server/utils";
import { connectDatabase } from "./server/database";

import { cronJob } from "./server/cronJob";

//  ERROR HANDLER MIDDLEWARE
import { ErrorHandler } from "./server/middlewares/errorHandler";

const app: Application = express();
const port = process.env.PORT || 3000;

//*  MIDDLEWARES */
app.use(
  express.urlencoded({ extended: false, limit: "50mb" }) as RequestHandler
);
app.use(express.json({ limit: "50mb" }) as RequestHandler);
app.use(cors(corsOptions));

app.use(
  morgan("combined", {
    stream: { write: (message) => Logger.info(message.trim()) },
  }) as RequestHandler
);

// Routes
app.use(Routes);

// ERROR LOG HANDLER
app.use(ErrorHandler);
app.use(errorRequest);

// Start the server
app.listen(port, async () => {
  try {
    await connectDatabase();
    console.log(`Server is running on http://localhost:${port}`);
    cronJob();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
