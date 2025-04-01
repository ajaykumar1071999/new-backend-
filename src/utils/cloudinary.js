import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import 'dotenv/config';
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (localFileaPath) => {
  try {
    if (!localFileaPath) return null;
    const uploadResult = await cloudinary.uploader
      .upload(localFileaPath.path, {
        folder: 'user_avtar',
        use_filename: true,
        resource_type: 'auto',
      })
      .catch((error) => {
        console.log(error);
      });
    return uploadResult;
  } catch (error) {
    fs.unlinkSync(localFileaPath.path);
    console.log('error from catch', error);
    return null;
  }
};

export default uploadToCloudinary;

// import { v2 as cloudinary } from 'cloudinary';

// (async function () {
//   // Configuration
//   cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
//   });

//   // Upload an image
//   const uploadResult = await cloudinary.uploader
//     .upload('https://picsum.photos/200', {
//       public_id: 'shoes',
//     })
//     .catch((error) => {
//       console.log(error);
//     });

//   console.log(uploadResult);

//   // Optimize delivery by resizing and applying auto-format and auto-quality
//   const optimizeUrl = cloudinary.url('shoes', {
//     fetch_format: 'auto',
//     quality: 'auto',
//   });

//   console.log(optimizeUrl);

//   // Transform the image: auto-crop to square aspect_ratio
//   const autoCropUrl = cloudinary.url('shoes', {
//     crop: 'auto',
//     gravity: 'auto',
//     width: 500,
//     height: 500,
//   });

//   console.log(autoCropUrl);
// })();
