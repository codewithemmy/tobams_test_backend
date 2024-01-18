import express from "express";

//create routing instance
const ImageRouter = express.Router();

//import image controller class
import imageController from "./image.controller";

//destructure imageController class
const { uploadImage, getImage, updateImage, deleteImage } = imageController;

//routes
ImageRouter.post("/upload", uploadImage);
ImageRouter.get("/get_image", getImage);
ImageRouter.put("/update/:imageId", updateImage);
ImageRouter.delete("/delete/:imageId", deleteImage);

//export image router
export default ImageRouter;
