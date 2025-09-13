const fs = require('fs');
const path = require('path');

function removeTxtFiles(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      removeTxtFiles(filePath);
    } else if (file.endsWith('.txt')) {
      fs.unlinkSync(filePath);
      console.log(`Removed: ${filePath}`);
    }
  });
}

const outDir = path.join(__dirname, '..', 'out');
if (fs.existsSync(outDir)) {
  console.log('Cleaning up .txt files from static export...');
  removeTxtFiles(outDir);
  console.log('Cleanup completed!');
} else {
  console.log('No out directory found.');
}
