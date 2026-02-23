import multer from 'multer'

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
         cb(null,'upload/')
    },
    filename:(req,file,cb)=>{
         cb(null, Date.now() + "-" + file.originalname)

    }
})


//filter

const fileFilter=(req,file,cb)=>{
    if(file.mimetype.startsWith('image/') || file.mimetype.startsWith('application/')){
        cb(null,true)
    }else{
        cb(new Error('Only images and documents are allowed'),false)
    }

}

// Limits
const limits = {
  fileSize: 3 * 1024 * 1024, // 3MB max
};

export const upload = multer({ storage, fileFilter, limits });