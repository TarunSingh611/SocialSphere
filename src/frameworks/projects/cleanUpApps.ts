import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';

const execAsync = util.promisify(exec);
const projectPath = 'projects';

export default async function cleanUpApps(appName: string) {
  const appDir = path.join(process.cwd(), projectPath, appName);

  try {
    // 1. Stop any running processes
    try {
      await execAsync(`pkill -f "${appName}"`);
    } catch (error) {
      // Ignore errors here, as the process might not be running
    }

    // 2. Remove build artifacts
    const buildDir = path.join(appDir, 'build');
    const nextBuildDir = path.join(appDir, '.next');

    await fs.rm(buildDir, { recursive: true, force: true }).catch(() => {});
    await fs.rm(nextBuildDir, { recursive: true, force: true }).catch(() => {});

    // 3. Clear npm cache for this project
    await execAsync('npm cache clean --force', { cwd: appDir });

    // 4. Remove node_modules (optional, depending on your use case)
    // await fs.rm(path.join(appDir, 'node_modules'), { recursive: true, force: true }).catch(() => {});

    // 5. Clear any temporary files
    const tempDir = path.join(appDir, 'temp');
    await fs.rm(tempDir, { recursive: true, force: true }).catch(() => {});

    console.log(`Cleaned up resources for ${appName}`);
    return { success: true, message: `Cleaned up resources for ${appName}` };
  } catch (error) {
    console.error(`Error cleaning up resources for ${appName}:`, error);
    return { success: false, message: `Failed to clean up resources for ${appName}`, error: error.message };
  }
}