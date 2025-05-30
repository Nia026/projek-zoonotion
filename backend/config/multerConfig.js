const multer = require('multer');
const path = require('path');
const fs = require('fs'); 

const storage = (destinationFolder) => multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'uploads', destinationFolder); 

    if (!fs.existsSync(uploadPath)){
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const uploadFile = (destinationFolder) => {
  return multer({ storage: storage(destinationFolder) });
};

module.exports = uploadFile;