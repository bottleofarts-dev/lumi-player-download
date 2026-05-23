const AdmZip = require('adm-zip');
const fs = require('fs');

const zip = new AdmZip();

const excludeDirs = ['node_modules', 'dist', '.git', 'uploads', 'public/source.zip'];
const excludeFiles = ['.env'];

function addDirectory(dirPath, zipPath) {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        const fullPath = `${dirPath}/${file}`;
        if (excludeDirs.some(excluded => fullPath.startsWith(`./${excluded}`) || fullPath === excluded)) {
            continue;
        }
        if (excludeFiles.some(excluded => file === excluded)) {
            continue;
        }

        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            addDirectory(fullPath, `${zipPath}${file}/`);
        } else {
            zip.addLocalFile(fullPath, zipPath);
        }
    }
}

addDirectory('.', '');

zip.writeZip('./public/source.zip');
console.log('Zip created at public/source.zip');
