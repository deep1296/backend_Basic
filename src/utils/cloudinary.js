import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLODINARY_API_NAME,
  api_key: process.env.CLODINARY_API_KEY,
  api_secret: process.env.CLODINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      overwrite: true,
      public_id: Date.now().toString(),
    });
    console.log("File uploaded successfully on Cloudinary", response);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.log("Error uploading file on Cloudinary", error);
    return null;
  }
};