const https = require('https');

https.get('https://21st.dev/@gughigug/templates/villa-aurelia-cinematic-villa-website-template', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    
    // Look for links
    const urls = data.match(/https:\/\/[a-zA-Z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;=%]+/g) || [];
    const relevant = urls.filter(u => u.includes('vercel.app') || u.includes('github') || u.includes('preview') || u.includes('villa'));
    console.log('Relevant URLs:', [...new Set(relevant)]);

    // Check for Next.js hydration data
    const nextMatch = data.match(/<script id="__NEXT_DATA__"[^>]*>(.*?)<\/script>/);
    if (nextMatch) {
      try {
        const json = JSON.parse(nextMatch[1]);
        const pp = json.props?.pageProps;
        console.log('PageProps keys:', Object.keys(pp || {}));
        if (pp?.template) {
          console.log('Template:', JSON.stringify({
            name: pp.template.name,
            title: pp.template.title,
            description: pp.template.description,
            demo_url: pp.template.demo_url,
            preview_url: pp.template.preview_url,
            github_url: pp.template.github_url,
          }, null, 2));
        }
      } catch (e) {
        console.log('Error parsing NEXT_DATA:', e);
      }
    }
  });
});

