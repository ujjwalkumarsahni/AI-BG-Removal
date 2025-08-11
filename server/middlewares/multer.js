// import multer from 'multer'

// // creating multer middlewares for parsing formdata

// const storage = multer.diskStorage({
//     filename: function(re,file,callback){
//         callback(null, `${Data.now()}_${file.originalname}`)
//     }
// })

// const upload = multer({storage})

// export default upload

// middlewares/multer.js
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const uploadDir = path.join('uploads/');

// Ensure the uploads folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage });

export default upload;
