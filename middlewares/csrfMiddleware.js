const Tokens = require('csrf');

const tokens = new Tokens();

function ensureSecret(req) {
    if (!req.session.csrfSecret) {
        req.session.csrfSecret = tokens.secretSync();
    }
    return req.session.csrfSecret;
}

exports.setCsrfToken = (req, res, next) => {
    const secret = ensureSecret(req);
    res.locals.csrfToken = tokens.create(secret);
    next();
};

exports.validateCsrf = (req, res, next) => {
    const secret = ensureSecret(req);
    const token = req.body && (req.body._csrf || req.headers['csrf-token'] || req.headers['x-csrf-token']);
    if (!token || !tokens.verify(secret, token)) {
        req.flash('error', 'Token de segurança inválido. Tente novamente.');
        return res.redirect('back');
    }
    next();
};
