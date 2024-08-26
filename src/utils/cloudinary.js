const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "spaces";
    let resource_type = "auto"; 
    let allowedFormats = ["jpg", "png", "jpeg"];

    
    if (file.mimetype.startsWith("video")) {
      allowedFormats = ["mp4", "mov", "avi"];
      resource_type = "video";
    }

    return {
      folder,
      allowed_formats: allowedFormats,
      resource_type: resource_type,
    };
  },
});

const upload = multer({ storage });

module.exports = { upload, cloudinary };
