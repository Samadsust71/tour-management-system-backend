import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryUpload } from "./cloudinary.config";
import multer from "multer";


const storage = new CloudinaryStorage({
    cloudinary: cloudinaryUpload,
    params:{
        public_id:(req,file)=>{
            // eslint-disable-next-line no-useless-escape
            const fileName = file.originalname.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "-").replace(/[^a-z0-9\-\.]/g, "")

            const extension = file.originalname.split('.').pop();
            const uniqueFileName = Math.random().toString(36).substring(2) + '-' + fileName + '.' + extension;

            return uniqueFileName;

        }
    }
})

export const multerUpload = multer({storage})