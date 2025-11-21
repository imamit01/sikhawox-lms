import fs from 'fs';
import path from 'path';

const sourceDir = process.cwd();
const targetDir = path.join(sourceDir, '..', 'SIKHAWOX_CLEAN_UPLOAD');

// Files/Folders to EXCLUDE
const ignored = [
    'node_modules',
    '.next',
    '.git',
    '.env',
    '.env.local',
    '.env.development.local',
    '.env.test.local',
    '.env.production.local',
    '.vercel',
    '.netlify',
    'dist',
    'build',
    'coverage'
];

function copyRecursive(src, dest) {
    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
        }
        fs.readdirSync(src).forEach(childItemName => {
            if (ignored.includes(childItemName)) return;
            copyRecursive(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

console.log(`Creating clean copy at: ${targetDir}`);
if (fs.existsSync(targetDir)) {
    console.log('Target directory already exists. Please delete it first.');
} else {
    try {
        copyRecursive(sourceDir, targetDir);
        console.log('✅ Clean copy created successfully!');
        console.log('You can now upload the "SIKHAWOX_CLEAN_UPLOAD" folder to GitHub.');
    } catch (err) {
        console.error('Error copying files:', err);
    }
}
