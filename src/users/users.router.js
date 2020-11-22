const { Router } = require('express');
const multer = require("multer");
const path = require('path')
const { asyncWrapper } = require('../helpers/async-wrapper');
const { authorize } = require('../helpers/auth.middleware');
const { UpdateSubUser, UpdateAvatarUser } = require('../helpers/schemes');
const { validate } = require('../helpers/validate');
const { GetCurrentUser, UpdateUserSubscription, UpdateUserAvatar } = require('./users.controller');

const PUBLIC_FILES_PATH = "src/public/images";
const storage = multer.diskStorage({
  destination: PUBLIC_FILES_PATH,
  filename: (req, file, cb) => {
    const { ext } = path.parse(file.originalname);
    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });

const router = Router();

router.get('/current',authorize, GetCurrentUser);
router.patch('/', authorize, validate(UpdateSubUser), asyncWrapper(UpdateUserSubscription));
router.patch('/avatars', authorize, upload.single('avatar') ,asyncWrapper(UpdateUserAvatar));

exports.usersRouter = router;