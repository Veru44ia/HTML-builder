const fs = require('fs');
const path = require('path');
const { mkdir, readdir, readFile, copyFile, writeFile } = require('fs/promises');

fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, 
  (err) => {
    if (err) throw err;
  }
);

async function createIndex() {
  let data = await readFile(path.join(__dirname, 'template.html'), 'utf8');
  let components = await readdir(path.join(__dirname, 'components'), {withFileTypes: true});
  components.forEach(async (component) => {
    if (component.isFile() === true && path.extname(component.name) === '.html') {
      let content = await readFile(path.join(__dirname, 'components', `${component.name}`), 'utf-8');   
      let regex = `{{${component.name.slice(0, component.name.lastIndexOf('.'))}}}`;   
      data = data.replace(regex, content);
    }
    await writeFile(path.join(__dirname, 'project-dist', 'index.html'), data);
  }); 
}

createIndex();

const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'), 'utf-8');

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

async function copyDir(src, dest) {
  let entries = await readdir(src, { withFileTypes: true });
  await mkdir(dest, { recursive: true });
  entries.forEach(async (entry) => {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);
    if (entry.isFile() === true) {
      await copyFile(srcPath, destPath)
    } else if (entry.isDirectory() === true) {
      await copyDir(srcPath, destPath)
    }
  })
}

copyDir(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));