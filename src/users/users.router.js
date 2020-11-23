const { Router } = require('express');
const { asyncWrapper } = require('../helpers/async-wrapper');
const { authorize } = require('../helpers/auth.middleware');
const { UpdateSubUser } = require('../helpers/schemes');
const { validate } = require('../helpers/validate');
const { GetCurrentUser, UpdateUserSubscription } = require('./users.controller');

const router = Router();

router.get('/current',authorize, GetCurrentUser);
router.patch('/', authorize, validate(UpdateSubUser), asyncWrapper(UpdateUserSubscription));

exports.usersRouter = router;