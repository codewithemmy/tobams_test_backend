import mongoose, { Schema, model } from "mongoose";
import { IImage } from "./image.interface";

//image schema
const ImageSchema = new Schema<IImage>(
  {
    image: { type: String, required: true },
  },
  { timestamps: true }
);

//add schema to a variable
const image = model<IImage>("Image", ImageSchema, "image");

export default image;
