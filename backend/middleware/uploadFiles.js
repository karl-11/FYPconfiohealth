var multer = require('multer');

module.exports.image = {
    storage: function () {
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, '../frontend/public/uploads')
            },
            filename: function (req, file, cb) {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
                cb(null, file.originalname.split(".")[0]  + '-userid9-' + uniqueSuffix + "." + file.originalname.split(".")[1])
            }
        })
        return storage;
    }
}