const multer = require('multer');
const { Jimp } = require('jimp');
const { v4: uuidv4 } = require('uuid');

const multerOptions = {
    storage:multer.memoryStorage(),
    fileFilter:(req, file, next)=>{
        const allowed = ['image/jpeg', 'image/jpg', 'image/png'];
        if(allowed.includes(file.mimetype)) {
            next(null, true);
        } else {
            next({message:'Arquivo inválido'}, false);
        }
    }
}

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
    if(!req.file) {
        next();
        return
    }

    const ext = req.file.mimetype.split('/')[1];
    let filename = `${uuidv4()}.${ext}`;
    req.body.photo = filename;

    const photo = await Jimp.read(req.file.buffer);
    photo.resize({ w: 800 });
    await photo.write(`./public/media/${filename}`);
    next();

};
