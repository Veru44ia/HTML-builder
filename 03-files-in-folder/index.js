const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), 
  {withFileTypes: true},
  (err, data) => { 
    if (err) throw err;
    data.forEach((element) => {
      if (element.isFile() === true) {
        fs.stat(path.join(__dirname, 'secret-folder', element.name), 
          (err, stats) => { 
            if (err) throw err;
            const fileSize = stats.size;
            const extname = path.extname(`${element.name}`).slice(1);
            const name = element.name.slice(0, element.name.lastIndexOf('.'));
            console.log(name + ' - ' + extname + ' - ' + fileSize + 'b');
          }
        );
      }
    });
  }
);