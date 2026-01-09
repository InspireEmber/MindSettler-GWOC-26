const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });


// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const PUBLIC_DIR = path.join(__dirname, '../public');
const MAP_FILE = path.join(__dirname, 'url_map.json');

const ASSET_DIRS = ['images', 'videos'];

const urlMap = {};

async function uploadFile(filePath, type) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: type,
      use_filename: true,
      unique_filename: false,
      folder: 'mindsettler_assets'
    });
    return result.secure_url;
  } catch (error) {
    console.error(`Error uploading ${filePath}:`, error);
    return null;
  }
}

async function processDirectory(dirName) {
  const fullDir = path.join(PUBLIC_DIR, dirName);
  if (!fs.existsSync(fullDir)) return;

  const files = fs.readdirSync(fullDir);
  
  for (const file of files) {
    const fullPath = path.join(fullDir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
        // Recursive support could be added here if needed, but for now assuming flat structure as per `ls` output
        continue;
    }

    const ext = path.extname(file).toLowerCase();
    // basic filter
    if (!['.jpg', '.jpeg', '.png', '.svg', '.gif', '.mp4', '.webm', '.mov'].includes(ext)) continue;

    const resourceType = ['.mp4', '.webm', '.mov'].includes(ext) ? 'video' : 'image';
    
    console.error(`Uploading ${dirName}/${file}...`); // Log to stderr to keep stdout clean for JSON
    const url = await uploadFile(fullPath, resourceType);
    
    if (url) {
      // Key format: /images/filename.ext
      const key = `/${dirName}/${file}`;
      urlMap[key] = url;
    }
  }
}

(async () => {
  for (const dir of ASSET_DIRS) {
    await processDirectory(dir);
  }
  
  console.log(JSON.stringify(urlMap, null, 2));
})();
