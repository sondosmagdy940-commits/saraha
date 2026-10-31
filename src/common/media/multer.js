import multer, { diskStorage } from "multer";
import crypto from 'crypto';
import { AppError } from "../error/error.js";
import { allowedFields } from "./file.validation.js";
 function multerUpload(allowedType=allowedFields.images) {
    console.log(allowedType);
    
    return multer({        
        fileFilter: function(req, file , cb) {
            if(!allowedType.includes(file.mimetype)){
                return cb(new AppError('invalid format',400),false)
            }
            cb(null, true)
        },
        storage: diskStorage({
            destination: 'uploads',
            filename: function (req, file, cb) {
                console.log(file);
                
                cb(null, `${crypto.randomUUID()}-${file.originalname}`)
            }
        })
    })

}

export function uploadFile(fieldName,allowedType=allowedFields.images) {
    return multerUpload(allowedType).single(fieldName,allowedType)
    
}
export function uploadFilesArray(fieldName,allowedType,maxCount) {
    return multerUpload().array(fieldName,allowedType,maxCount)
    
}
export function uploadfields(fields) {
    return multerUpload().fields(fields)
    
}