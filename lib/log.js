import { put, list } from '@vercel/blob';

const LOG_BLOB_NAME = 'log.json';

async function getBlobUrl() {
  const { blobs } = await list();
  const found = blobs.find(b => b.pathname === LOG_BLOB_NAME);
  return found ? found.url : null;
}

export async function appendLog(entry) {
  let logs = [];
  try {
    const url = await getBlobUrl();
    if (url) {
      const res = await fetch(url);
      if (res.ok) {
        logs = await res.json();
      }
    }
  } catch (err) {
    logs = [];
  }
  logs.push(entry);
  await put(LOG_BLOB_NAME, JSON.stringify(logs), {
    contentType: 'application/json',
    access: 'public',
    allowOverwrite: true
  });
}

export async function getLogs() {
  try {
    const url = await getBlobUrl();
    if (url) {
      const res = await fetch(url);
      if (res.ok) {
        return await res.json();
      }
    }
    return [];
  } catch (err) {
    return [];
  }
}
