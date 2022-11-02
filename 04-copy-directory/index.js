const fs = require('fs');
const path = require('path');

fs.stat(path.join(__dirname, 'files-copy'), err => {
  if (!err) {
    fs.rm(path.join(__dirname, 'files-copy'), { recursive: true }, 
      (err) => {
        if (err) throw err; 
        copyDir();
      }
    );    
  } else {
    copyDir();
  }
});

function copyDir() {
  fs.mkdir(path.join(__dirname, 'files-copy'), {recursive: true}, 
    (err) => {
      if (err) throw err;
    }
  );
  fs.readdir(path.join(__dirname, 'files'), {withFileTypes: true},
    (err, data) => {
      if (err) throw err;
      data.forEach((element) => {
        if (element.isFile() === true) {
          fs.copyFile(path.join(__dirname, 'files', `${element.name}`), path.join(__dirname, 'files-copy', `${element.name}`),
            (err) => {
              if (err) throw err;
            }
          );
        }
      });
    }
  );
}