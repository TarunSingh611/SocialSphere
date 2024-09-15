import fs from 'fs/promises';
import path from 'path';
// import { exec } from 'child_process';
// import util from 'util';
import dotenv from 'dotenv';

// const execAsync = util.promisify(exec);
const projectPath = 'projects';


export default async function handleApp(appName: string, appType: 'reactApp' | 'nextApp') {
  try {
    const appDir = path.join(process.cwd(), projectPath, appName);
  

    return await serveApp(appDir, appType);
  } catch (error) {
    console.error('Error handling app:', error);
    return new Response(JSON.stringify({ message: 'Error handling app', error: error.message }), { status: 500 });
  }
}

async function serveApp(appDir: string, appType: 'reactApp' | 'nextApp') {
  // Load environment variables from main app's .env file
  dotenv.config();

  if (appType === 'reactApp') {
    return await serveReactApp(appDir);
  } else if (appType === 'nextApp') {
    return await serveNextApp(appDir);
  }
  else{
    return new Response(JSON.stringify({ message: 'Invalid app type' }), { status: 500 });
  }
}

async function serveReactApp(appDir: string) {
  const buildDir = path.join(appDir, 'build');
  const indexHtml = await fs.readFile(path.join(buildDir, 'index.html'), 'utf-8');

  // Modify the paths in the HTML to be relative
  const modifiedHtml = indexHtml.replace(/(src|href)="\//g, '$1="');

  return new Response(modifiedHtml, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Security-Policy': "script-src 'self' 'unsafe-inline'", // Adjust CSP as needed
    },
  });
}

async function serveNextApp(appDir: string) {
  // For Next.js, we need to start the server
  // This is a simplified example and may not work for all Next.js apps
  const server = require(path.join(appDir, '.next/server/pages/index.js'));
  const html = await server.renderToHTML({}, {}, '/');

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Security-Policy': "script-src 'self' 'unsafe-inline'", // Adjust CSP as needed
    },
  });
}