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
    if(file.mimetype.startsWith('image/')){
        cb(null,true)
    }else{
        cb(new Error('Only images are allowd'),false)
    }

}

// Limits
const limits = {
  fileSize: 1 * 1024 * 1024*3, // 1MB max
};

export const upload = multer({ storage, fileFilter, limits });