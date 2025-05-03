// Simple script to check for common GitHub Pages deployment issues
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking build for common GitHub Pages issues...');

// Check if dist directory exists
if (!fs.existsSync('./dist')) {
  console.error('❌ No dist directory found. Make sure to run npm run build first.');
  process.exit(1);
}

// Check if index.html exists
if (!fs.existsSync('./dist/index.html')) {
  console.error('❌ No index.html found in dist directory.');
  process.exit(1);
} else {
  console.log('✅ Found index.html');
}

// Check if 404.html exists
if (!fs.existsSync('./dist/404.html')) {
  console.warn('⚠️ No 404.html found in dist directory. You should copy index.html to 404.html.');
} else {
  console.log('✅ Found 404.html');
}

// Read the content of index.html to check asset references
const indexContent = fs.readFileSync('./dist/index.html', 'utf8');

// Look for asset paths
console.log('\n📝 Checking asset references in index.html:');
const cssLinks = indexContent.match(/href="[^"]*\.css"/g) || [];
const jsScripts = indexContent.match(/src="[^"]*\.js"/g) || [];

// Log CSS references
console.log('\nCSS files referenced:');
if (cssLinks.length === 0) {
  console.warn('⚠️ No CSS files found in index.html');
} else {
  cssLinks.forEach(link => {
    console.log(`- ${link}`);
  });
}

// Log JS references
console.log('\nJS files referenced:');
if (jsScripts.length === 0) {
  console.warn('⚠️ No JS files found in index.html');
} else {
  jsScripts.forEach(script => {
    console.log(`- ${script}`);
  });
}

console.log('\n✅ Base path check:');
const basePathRegex = /<base href="([^"]+)"/;
const basePathMatch = indexContent.match(basePathRegex);

if (basePathMatch) {
  console.log(`Base path set to: ${basePathMatch[1]}`);
} else {
  console.log('No explicit base path tag found in index.html');
  
  // Check if assets have repository name in their paths
  const repositoryName = process.env.REPO_NAME || 'unknown-repo';
  if (indexContent.includes(`/${repositoryName}/`)) {
    console.log(`✅ Found repository name '${repositoryName}' in asset paths`);
  } else {
    console.warn(`⚠️ Repository name '${repositoryName}' not found in asset paths. This might cause 404 errors.`);
  }
}

console.log('\n✅ Deploy check completed. Review any warnings or errors above.');