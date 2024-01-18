import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import { routes } from "./routes";
import { handleApplicationErrors, notFound } from "./response";
import fileUpload from "express-fileupload";

export const app = express();

export const application = async () => {
  //use third party middlewares
  app.use(express.json());
  app.use(helmet());
  app.use(compression());
  app.use(cors());
  app.use(fileUpload({ useTempFiles: true }));

  //base endpoint
  app.get("/", (req, res) => {
    res.status(200).json({ message: "App working fine. Welcome" });
  });

  //use express app as params for routes
  routes(app);
  app.use(handleApplicationErrors); //application errors handler
  app.use(notFound); //not found route
};
