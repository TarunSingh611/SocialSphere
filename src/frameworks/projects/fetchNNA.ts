import fs from 'fs/promises';
import path from 'path';

const projectPath = 'projects';

export default async function fetchNNA(appName: string) {

  try {
    const appDir = path.join(process.cwd(), projectPath, appName);
    
    // Read HTML, CSS, and JS files
    const [appHtml, appCss, appJs] = await Promise.all([
      fs.readFile(path.join(appDir, 'index.html'), 'utf-8'),
      fs.readFile(path.join(appDir, 'style.css'), 'utf-8').catch(() => ''),
      fs.readFile(path.join(appDir, 'script.js'), 'utf-8').catch(() => ''),
    ]);

    // Combine the files
    const combinedApp = `
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>${appCss}</style>
      </head>
      <body>
        ${appHtml}
        <script>${appJs}</script>
      </body>
      </html>
    `;

    // Create a response with the combined content
    const response = new Response(combinedApp, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Security-Policy': "script-src 'self' 'unsafe-inline'", // Adjust CSP as needed
      },
    });

    return response;
  } catch (error) {
    // console.error('Error fetching app:', error);
    return new Response('Error fetching app', { status: 500 });
  }
}