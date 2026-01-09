const fs = require('fs');
const path = require('path');

const MAP_FILE = path.join(__dirname, 'asset_map_utf8.json');
const SRC_DIR = path.join(__dirname, '../src');

// List of file extensions to process
const EXTENSIONS = ['.jsx', '.js', '.css', '.tsx', '.ts'];

// Files explicitly identified (optional, but good to have as a starting point if we want to be targeted)
// But walking SRC_DIR is safer to catch everything.

if (!fs.existsSync(MAP_FILE)) {
  console.error('Map file not found:', MAP_FILE);
  process.exit(1);
}

const fileContent = fs.readFileSync(MAP_FILE, 'utf8').replace(/^\uFEFF/, '');
const urlMap = JSON.parse(fileContent);

// Sort keys by length descending to prevent substring collisions
const sortedKeys = Object.keys(urlMap).sort((a, b) => b.length - a.length);

function walkDir(dir, callback) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath, callback);
    } else {
      callback(fullPath);
    }
  });
}

walkDir(SRC_DIR, (filePath) => {
  const ext = path.extname(filePath);
  if (!EXTENSIONS.includes(ext)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  let hasChanges = false;

  sortedKeys.forEach(localPath => {
    const cloudUrl = urlMap[localPath];
    // Create a global regex for the local path
    // We need to escape special characters in the path for regex
    // e.g. /images/foo.jpg -> \/images\/foo\.jpg
    
    // However, exact string replacement might be safer if we are sure of the format.
    // But in code, it might be in quotes, or template strings.
    // Simple string.replaceAll() (Node 15+) or split/join works for literal values.
    
    if (content.includes(localPath)) {
       // Check if it's already replaced (unlikely if unique, but good practice)
       // Actually simple replaceAll is fine.
       content = content.replace(new RegExp(escapeRegExp(localPath), 'g'), cloudUrl);
       hasChanges = true;
    }
  });

  if (hasChanges) {
    console.log(`Updating ${filePath}`);
    fs.writeFileSync(filePath, content, 'utf8');
  }
});

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
