const fs = require('fs');
const path = require('path');
const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'), 'utf-8');

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true},
  (err, data) => {
    if (err) throw err;
    data.forEach((element) => {
      if (element.isFile() === true && path.extname(element.name) === '.css') {
        const input = fs.createReadStream(path.join(__dirname, 'styles', `${element.name}`), 'utf-8');
        input.on('data', data => output.write(data));
      }
    }); 
  }
);