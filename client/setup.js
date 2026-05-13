const fs = require('fs');
const path = require('path');

// Create directory structure
const dirs = [
  'src/types',
  'src/services',
  'src/hooks',
  'src/context',
  'src/pages',
  'src/components',
  'src/components/Navigation',
  'src/components/Layout',
  'src/components/Cards',
  'src/components/Forms',
  'src/components/Common'
];

dirs.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created: ${dir}`);
  }
});

console.log('✓ All directories created successfully!');
