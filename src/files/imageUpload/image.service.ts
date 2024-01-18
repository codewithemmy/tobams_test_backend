import mongoose, { mongo } from "mongoose";
import { IResponse } from "../../constants";
import { queryConstructor } from "../../utils";
import ImageRepository from "./image.repository";
import { imageMessages } from "./image.messages";
import { IImage } from "./image.interface";
import { uploadImageManager } from "../../utils/fileUpload";

//formats for image in an array
const allowedFormats = ["jpg", "jpeg", "gif", "png"];

//image class services
export default class ImageService {
  //image upload service
  static async uploadImage(imagePayload: any): Promise<IResponse> {
    //check if image is uploaded
    if (!imagePayload.files)
      return { success: false, msg: imageMessages.EMPTY_IMAGE };

    //check image extension
    const fileExtension = imagePayload.files.image.name
      .split(".")
      .pop()
      .toLowerCase();

    //check extension format and throw error
    if (!allowedFormats.includes(fileExtension))
      return { success: false, msg: imageMessages.IMAGE_FORMAT };

    //use cloudinary to get secure url from request
    const image = await uploadImageManager(imagePayload);

    //upload image with secure_url
    const uploadImage = await ImageRepository.uploadImage({
      image: image.secure_url,
    });

    //throw error if image is not uploaded
    if (!image) return { success: false, msg: imageMessages.IMAGE_FAILURE };

    //return success message
    return {
      success: true,
      msg: imageMessages.IMAGE_SUCCESS,
      data: uploadImage,
    };
  }

  //get image service
  static async getImage(imagePayload: Partial<IImage>) {
    //use query constructor function, and destructure it
    const { error, params, limit, skip, sort } = queryConstructor(
      imagePayload,
      "createdAt",
      "Image"
    );

    //ensure parameters by checking for error
    if (error) return { success: false, msg: error };

    //get image using image repository
    const image = await ImageRepository.getImageByParams({
      ...params,
      limit,
      skip,
      sort,
    });

    //if no image, return empty array
    if (image.length < 1)
      return { success: true, msg: imageMessages.NOT_FOUND, data: [] };

    //return success message
    return {
      success: true,
      msg: imageMessages.FETCH_SUCCESS,
      data: image,
    };
  }

  //update image service
  static async updateImage(imageId: string, imagePayload: any) {
    //check if image is uploaded
    if (!imagePayload.files)
      return { success: false, msg: imageMessages.EMPTY_IMAGE };

    //check image extension
    const fileExtension = imagePayload.files.image.name
      .split(".")
      .pop()
      .toLowerCase();

    //check extension format and throw error
    if (!allowedFormats.includes(fileExtension))
      return { success: false, msg: imageMessages.IMAGE_FORMAT };

    //use cloudinary to get secure url from request
    const image = await uploadImageManager(imagePayload);

    //update image secure_url
    const updateImage = await ImageRepository.updateImageDetails(
      { _id: new mongoose.Types.ObjectId(imageId) },
      {
        $set: {
          image: image.secure_url,
        },
      }
    );

    if (!updateImage)
      return { success: false, msg: imageMessages.UPDATE_ERROR };

    return { success: true, msg: imageMessages.UPDATE_SUCCESS };
  }

  //delete service
  static async deleteImage(imageId: string) {
    //access image with id
    const getImage = await ImageRepository.fetchImage(
      { _id: new mongoose.Types.ObjectId(imageId) },
      {}
    );

    //confirm if image exist
    if (!getImage) return { success: false, msg: imageMessages.NOT_FOUND };

    //delete image with based on id provided
    const deleteImage = await ImageRepository.deleteImageDetails({
      _id: new mongoose.Types.ObjectId(imageId),
    });

    //throw error if image is not delete
    if (!deleteImage)
      return { success: false, msg: imageMessages.DELETE_FAILURE };

    //return success message
    return { success: true, msg: imageMessages.DELETE_SUCCESS };
  }
}
