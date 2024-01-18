import { Application } from "express";
import ImageRouter from "../files/imageUpload/image.route";

//this functions handles or use all route middlewares
export const routes = (app: Application) => {
  const base = "/api/v1";

  app.use(`${base}/image`, ImageRouter);
};
