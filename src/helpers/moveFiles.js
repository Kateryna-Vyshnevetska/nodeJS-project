const fs = require('fs')
const path = require('path');

exports.MoveFile = async (avatar) => {
  const realPath = path.parse(__dirname).dir;
  const srcFolder = path.join(realPath,`/tmp/${avatar}`);
  const outFolder = path.join(realPath,`/public/images/${avatar}`);
  fs.readdir(srcFolder, (err, files) => {
      fs.rename(srcFolder, outFolder, err => {
        if (err) throw err;
      });
  });
}