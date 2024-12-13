const multer = require('multer');

// Set storage engine temp buffer for files
const storage = multer.memoryStorage();

// Configure Multer
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit to 10 MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf'];
    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error('Only PDF files are allowed');
      error.status = 400;
      return cb(error);
    }
    cb(null, true);
  },
});

module.exports = upload;
// cb a callbackfunction multer uses to determ what to di with the file decline or upload.
// cb Null no errors, true mean file is accepted.
// mimeType define which file i allowed here pdf, but ould also be images etc