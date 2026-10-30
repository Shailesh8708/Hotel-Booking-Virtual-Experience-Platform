const https = require('https');

https.get('https://villa-aurelia-cinematic-villa-website-template-v1.21st.app', (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    // Extract CSS chunks
    const cssLinks = data.match(/\/(_next\/static\/chunks\/[a-zA-Z0-9_\-\.]+\.css)/g) || [];
    console.log('CSS Links:', cssLinks);

    // Extract headings
    const h1s = data.match(/<h1[^>]*>(.*?)<\/h1>/gi) || [];
    const h2s = data.match(/<h2[^>]*>(.*?)<\/h2>/gi) || [];
    const h3s = data.match(/<h3[^>]*>(.*?)<\/h3>/gi) || [];
    console.log('H1:', h1s);
    console.log('H2:', h2s);
    console.log('H3:', h3s.slice(0, 10));

    // Extract nav and buttons
    const buttons = data.match(/<button[^>]*>(.*?)<\/button>/gi) || [];
    console.log('Buttons count:', buttons.length);
    console.log('Sample buttons:', buttons.slice(0, 10));

    // Extract images / media
    const media = data.match(/src="([^"]+\.(?:jpg|jpeg|png|webp|mp4|webm|svg|mov)[^"]*)"/gi) || [];
    console.log('Media count:', media.length);
    console.log('Sample media:', media.slice(0, 15));
  });
});

