const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const { apiError } = require("../utils/apiError.js");

const fileUpload = () => {
  const storage = multer.memoryStorage();

  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new apiError("only image allowed", 401));
    }
  };

  const upload = multer({ storage, fileFilter });

  return upload;
};

exports.uploadSingleFile = (fieldname) => fileUpload().single(fieldname);
exports.uploadArrayOfFiles = (fieldname) =>
  fileUpload().array(fieldname, 10);
exports.uploadFieldsOfFiles = (fields) => fileUpload().fields(fields);
