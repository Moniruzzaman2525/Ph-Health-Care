import multer from "multer"
import path from "path"
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'

cloudinary.config({
    cloud_name: 'dtbmdvq12',
    api_key: '541923279724448',
    api_secret: 'sFpu73i6PqR1n0xkV8jiC255FUU'
});




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })


const uploadToCloudinary = async (file: any) => {

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file.path,
            { public_id: file.originalname },
            (error: any, result: any) => {
                fs.unlinkSync(file.path)
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            }
        )
    })


}


export const fileUploader = {
    upload,
    uploadToCloudinary
}

