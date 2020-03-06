import * as os from 'os';
import * as child_process from 'child_process';
import * as fs from 'fs';

const execSync = child_process.execSync;
const statSync = fs.statSync;

export function downloadsFolder() {
  return {
    darwin: darwin,
    freebsd: unix,
    linux: unix,
    sunos: unix,
    win32: windows
  }[os.platform()]();
}

function darwin () {
  return `${process.env.HOME}/Downloads`;
}

function unix () {
  let dir;
  try {
    dir = execSync('xdg-user-dir DOWNLOAD', { stdio: [0, 3, 3] });
  } catch (_) {}
  if (dir) return dir;

  let stat;
  const homeDownloads = `${process.env.HOME}/Downloads`;
  try {
    stat = statSync(homeDownloads);
  } catch (_) {}
  if (stat) return homeDownloads;

  return '/tmp/';
}

function windows () {
  return `${process.env.USERPROFILE}/Downloads`;
}

