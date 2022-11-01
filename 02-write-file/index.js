const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
const writableStream = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8');

stdout.write('Введите Ваш текст: ');
stdin.on('data', data => {
   if (data.toString().trim() === 'exit') {
    process.exit();
  } else {
    writableStream.write(data);
  }
});

process.on('SIGINT', () => {
  process.exit();
});

process.on('exit', () => stdout.write('Удачи!\n'));