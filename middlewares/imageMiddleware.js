const multer = require('multer');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');

const multerOptions = {
    storage:multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter:(req, file, next)=>{
        const allowed = ['image/jpeg', 'image/jpg', 'image/png'];
        if(allowed.includes(file.mimetype)) {
            next(null, true);
        } else {
            next({message:'Arquivo inválido'}, false);
        }
    }
}

const uploadSingle = multer(multerOptions).single('photo');

exports.upload = (req, res, next) => {
    uploadSingle(req, res, (err) => {
        if (err) {
            req.flash('error', err.code === 'LIMIT_FILE_SIZE'
                ? 'Imagem muito grande (máx. 5MB)'
                : (err.message || 'Upload inválido'));
            return res.redirect('back');
        }
        next();
    });
};

exports.resize = async (req, res, next) => {
    if(!req.file) {
        next();
        return
    }

    try {
        const ext = req.file.mimetype === 'image/png' ? 'png' : 'jpg';
        const filename = `${uuidv4()}.${ext}`;
        req.body.photo = filename;

        await sharp(req.file.buffer)
            .resize({ width: 800 })
            .toFile(`./public/media/${filename}`);
        next();
    } catch (error) {
        req.flash('error', 'Não foi possível processar a imagem');
        return res.redirect('back');
    }
};
