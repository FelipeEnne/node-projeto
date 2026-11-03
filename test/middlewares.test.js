const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const test = require('node:test');
const sharp = require('sharp');

const authMiddleware = require('../middlewares/authMiddleware');
const csrfMiddleware = require('../middlewares/csrfMiddleware');
const imageMiddleware = require('../middlewares/imageMiddleware');

test('isLogged calls next for an authenticated request', () => {
    let nextCalled = false;
    let redirected = false;

    authMiddleware.isLogged(
        { isAuthenticated: () => true },
        { redirect: () => { redirected = true; } },
        () => { nextCalled = true; }
    );

    assert.equal(nextCalled, true);
    assert.equal(redirected, false);
});

test('isLogged flashes an error and redirects a guest to login', () => {
    const flashes = [];
    let redirectPath;

    authMiddleware.isLogged(
        {
            isAuthenticated: () => false,
            flash: (...args) => flashes.push(args)
        },
        { redirect: (url) => { redirectPath = url; } },
        () => assert.fail('next should not be called for a guest')
    );

    assert.deepEqual(flashes, [['error', 'Faça o login']]);
    assert.equal(redirectPath, '/users/login');
});

test('CSRF middleware creates a token that validation accepts', () => {
    const req = { session: {}, body: {} };
    const res = { locals: {} };
    let nextCalled = false;

    csrfMiddleware.setCsrfToken(req, res, () => {});
    req.body._csrf = res.locals.csrfToken;
    csrfMiddleware.validateCsrf(req, res, () => { nextCalled = true; });

    assert.equal(typeof req.session.csrfSecret, 'string');
    assert.equal(typeof res.locals.csrfToken, 'string');
    assert.equal(nextCalled, true);
});

test('CSRF middleware rejects a missing token', () => {
    const flashes = [];
    let redirectPath;

    csrfMiddleware.validateCsrf(
        {
            session: {},
            body: {},
            headers: {},
            flash: (...args) => flashes.push(args)
        },
        { redirect: (url) => { redirectPath = url; } },
        () => assert.fail('next should not be called without a valid token')
    );

    assert.deepEqual(flashes, [['error', 'Token de segurança inválido. Tente novamente.']]);
    assert.equal(redirectPath, 'back');
});

test('image resize skips requests without an uploaded image', async () => {
    let nextCalled = false;

    await imageMiddleware.resize(
        { file: undefined },
        {},
        () => { nextCalled = true; }
    );

    assert.equal(nextCalled, true);
});

test('image resize saves a proportional 800px PNG and sets req.body.photo', async (t) => {
    const input = await sharp({
        create: {
            width: 1600,
            height: 800,
            channels: 3,
            background: { r: 20, g: 40, b: 60 }
        }
    }).png().toBuffer();
    const req = {
        body: {},
        file: { buffer: input, mimetype: 'image/png' },
        flash: (...args) => assert.fail(`unexpected flash: ${args.join(' ')}`)
    };
    let nextCalled = false;
    let redirectPath;

    await imageMiddleware.resize(
        req,
        { redirect: (url) => { redirectPath = url; } },
        () => { nextCalled = true; }
    );

    assert.equal(nextCalled, true);
    assert.equal(redirectPath, undefined);
    assert.match(req.body.photo, /^[0-9a-f-]+\.png$/i);

    const outputPath = path.join(__dirname, '..', 'public', 'media', req.body.photo);
    t.after(() => fs.rm(outputPath, { force: true }));

    const metadata = await sharp(outputPath).metadata();
    assert.equal(metadata.format, 'png');
    assert.equal(metadata.width, 800);
    assert.equal(metadata.height, 400);
});
