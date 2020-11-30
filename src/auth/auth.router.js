const { Router } = require('express');
const { validate } = require('../helpers/validate');
const { signUp, signIn, signOut, verifyEmail } = require('./auth.controller');
const { UserSchema } = require('../helpers/schemes');
const { authorize } = require('../helpers/auth.middleware');
const { asyncWrapper } = require('../helpers/async-wrapper');

const router = Router();

router.post('/register', validate(UserSchema), asyncWrapper(signUp))
router.get('/verify/:verificationToken', asyncWrapper(verifyEmail))
router.post('/login', validate(UserSchema), asyncWrapper(signIn))
router.delete('/logout', authorize, asyncWrapper(signOut))

exports.authRouter = router;