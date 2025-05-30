const multer = require('multer');
const path = require('path');

const createStorageConfig = (uploadPath) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const absolutePath = path.join(process.cwd(), uploadPath);
      cb(null, absolutePath);
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    }
  });
};

const fileFilter = (allowedTypes) => {
  return (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  };
};

const avatarUpload = multer({
  storage: createStorageConfig('uploads/avatars'),
  fileFilter: fileFilter(['image/jpeg', 'image/png', 'image/gif']),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

const resumeUpload = multer({
  storage: createStorageConfig('uploads/resumes'),
  fileFilter: fileFilter(['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
});

module.exports = {
  avatarUpload,
  resumeUpload
}; 