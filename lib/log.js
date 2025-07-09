import { put, list } from '@vercel/blob';

const LOG_PREFIX = 'log-';

function getLogFileName() {
  // Unique name: log-<timestamp>-<random>.json
  const ts = Date.now();
  const rand = Math.random().toString(36).slice(2, 10);
  return `${LOG_PREFIX}${ts}-${rand}.json`;
}

export async function appendLog(entry) {
  const fileName = getLogFileName();
  await put(fileName, JSON.stringify(entry), {
    contentType: 'application/json',
    access: 'public',
    allowOverwrite: false
  });
}

export async function getLogs() {
  const { blobs } = await list();
  // Only return log files with their URLs
  return blobs
    .filter(b => b.pathname.startsWith(LOG_PREFIX))
    .map(b => ({ name: b.pathname, url: b.url }));
}
