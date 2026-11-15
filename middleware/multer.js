const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads')
    },
    
    filename: (req, file, callback) => {
        const date = Date.now()
        const randNumber = Math.floor(Math.random() * 1E8)
        const ext = file.originalname.split('.').pop()
        const filename = `IMG_${date}_${randNumber}.${ext}`
        callback(null, filename)
    },
});

const fileFilter = (req, file, callback) => {
    if(file.mimetype.startsWith('image/')){
        callback(null, true)
    } else {
        callback(new Error('Only Image allowed'))
    }
}


const limits = {
    fileSize: 1024 * 1024 * 10
}

const upload = multer({
    storage,
    fileFilter,
    limits
});

module.exports = upload;