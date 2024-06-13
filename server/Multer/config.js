
import multer from 'multer';
import path from 'path'

// Define storage for the images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/Banner'); // specify the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Set file size limit to 2MB
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images are allowed!'));
    }
  }
});

export default upload;