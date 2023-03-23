import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv"
import controllers from "./controllers";
import { errRouter } from "./controllers/global";

const config = dotenv.config()

const app = express();

// 미들웨어를 먼저 작성합니다.
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "700mb" }));
app.use(
  cors({
    origin: "*",
  })
);
app.use(helmet());

controllers.forEach((controller) => {
  app.use(controller.path, controller.router);
});

app.use(errRouter);

app.listen(8000);
