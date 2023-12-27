const multer = require("multer")
const uuidv4 = require("uuid").v4
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
        const uniqueFilename = uuidv4() + " - " + file.originalname;
        cb(null, uniqueFilename);
    }
})
const upload = multer({
    storage,
})
module.exports = upload 