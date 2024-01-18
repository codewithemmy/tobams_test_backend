const cloudinary = require("cloudinary").v2;
const fs = require("fs");
import config from "../core/config";

//configure cloudinary
cloudinary.config({
  cloud_name: config.CLOUDINARY_API_NAME,
  api_key: config.CLOUDINARY_KEY,
  api_secret: config.CLOUDINARY_SECRET,
});

//cloudinary function
export const uploadImageManager = async (req: any, location = "tobams") => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: `${location}`,
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);

  return result;
};
