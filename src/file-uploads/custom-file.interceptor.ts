const multerOptions = {
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      return cb(
        new Error('Invalid file type. Only JPG, JPEG, and PNG are allowed.'),
        false,
      );
    }
    cb(null, true);
  },
};

// @UseInterceptors(FileInterceptor('file', multerOptions))
