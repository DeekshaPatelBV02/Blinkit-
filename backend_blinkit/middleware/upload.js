const multer = require("multer");

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, "./public/Images");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  }

});

const upload = multer({ storage });

module.exports = upload;