const fs = require('fs')

exports.MoveFile = async (avatar) => {
  const srcFolder = `/Users/kateryna_vyshnevetska/Documents/GoIT/NodeJS/nodeJS-project/src/tmp/${avatar}`;
  const outFolder = `/Users/kateryna_vyshnevetska/Documents/GoIT/NodeJS/nodeJS-project/src/public/images/${avatar}`;

  fs.readdir(srcFolder, (err, files) => {
      fs.rename(srcFolder, outFolder, err => {
        if (err) throw err;
      });
  });
}