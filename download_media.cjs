const https = require('https');
const fs = require('fs');
const path = require('path');

const targetUrl = 'https://villa-aurelia-cinematic-villa-website-template-v1.21st.app';

https.get(targetUrl, (res) => {
  let html = '';
  res.on('data', c => html += c);
  res.on('end', async () => {
    // Find all /media/ links
    const matches = html.match(/\/media\/[a-zA-Z0-9_\-\.\/]+/g) || [];
    const unique = [...new Set(matches)];
    console.log('Found media files:', unique);

    fs.mkdirSync('public/media', { recursive: true });

    for (const rel of unique) {
      const fullUrl = targetUrl + rel;
      const localPath = path.join('public', rel);
      fs.mkdirSync(path.dirname(localPath), { recursive: true });

      await new Promise((resolve) => {
        https.get(fullUrl, (mRes) => {
          if (mRes.statusCode === 200) {
            const stream = fs.createWriteStream(localPath);
            mRes.pipe(stream);
            stream.on('finish', () => {
              console.log('Downloaded:', rel);
              resolve();
            });
          } else {
            console.log('Skip:', rel, mRes.statusCode);
            resolve();
          }
        }).on('error', () => resolve());
      });
    }
    console.log('All media downloaded!');
  });
});

