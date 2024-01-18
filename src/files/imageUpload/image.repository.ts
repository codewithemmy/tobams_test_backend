import { FilterQuery, UpdateQuery } from "mongoose";
import pagination, { IPagination } from "../../constants";
import { IImage } from "./image.interface";
import Image from "./image.model";

//destructure pagination
const { LIMIT, SKIP, SORT } = pagination;

//repository class
export default class ImageRepository {
  //upload image repository
  static async uploadImage(imagePayload: Partial<IImage>): Promise<IImage> {
    return Image.create(imagePayload);
  }

  //get single image repository
  static async fetchImage(
    imagePayload: Partial<IImage> | FilterQuery<Partial<IImage>>,
    select: Partial<Record<keyof IImage, number | Boolean | object>>
  ): Promise<Partial<IImage> | null> {
    const image: Awaited<IImage | null> = await Image.findOne(
      {
        ...imagePayload,
      },
      select
    ).lean();

    return image;
  }

  //find or get all image repository based on queryConstructor
  static async getImageByParams(imagePayload: Partial<IImage & IPagination>) {
    const {
      limit = LIMIT,
      skip = SKIP,
      sort = SORT,
      ...restOfPayload
    } = imagePayload;

    const image: Awaited<IImage[] | null> = await Image.find({
      ...restOfPayload,
    })
      .sort(sort)
      .skip(skip)
      .limit(limit);

    return image;
  }

  //update image repository
  static async updateImageDetails(
    imagePayload: Partial<IImage>,
    update: UpdateQuery<Partial<IImage>>
  ) {
    const updateImage = await Image.findOneAndUpdate(
      {
        ...imagePayload,
      },
      { ...update },
      { new: true, runValidators: true } //returns details about the update
    );

    return updateImage;
  }

  //delete image repository based on id
  static async deleteImageDetails(imagePayload: Partial<IImage>) {
    return await Image.findByIdAndDelete({
      ...imagePayload,
    });
  }
}
