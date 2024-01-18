import { NextFunction, Response, Request } from "express";
import { responseHandler } from "../../core/response";
import { manageAsyncOps } from "../../utils";
import { CustomError } from "../../utils/error";
import { statusCode } from "../../constants/statusCode";
import ImageService from "./image.service";

//class controller
class ImageController {
  //image upload controller
  async uploadImage(req: Request, res: Response, next: NextFunction) {
    const [error, data] = await manageAsyncOps(ImageService.uploadImage(req));

    if (error) return next(error);
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!));

    return responseHandler(res, statusCode.CREATED, data!);
  }

  //get image controller
  async getImage(req: Request, res: Response, next: NextFunction) {
    const [error, data] = await manageAsyncOps(
      ImageService.getImage(req.query)
    );
    if (error) return next(error);
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!));

    return responseHandler(res, statusCode.CREATED, data!);
  }

  //update image controller
  async updateImage(req: Request, res: Response, next: NextFunction) {
    const [error, data] = await manageAsyncOps(
      ImageService.updateImage(req.params.imageId as string, req)
    );
    if (error) return next(error);
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!));

    return responseHandler(res, statusCode.CREATED, data!);
  }

  //delete image controller
  async deleteImage(req: Request, res: Response, next: NextFunction) {
    const [error, data] = await manageAsyncOps(
      ImageService.deleteImage(req.params.imageId as string)
    );
    if (error) return next(error);
    if (!data?.success) return next(new CustomError(data!.msg, 400, data!));

    return responseHandler(res, statusCode.CREATED, data!);
  }
}
export default new ImageController();
