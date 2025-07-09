import { put, get } from '@vercel/blob';

const LOG_BLOB_NAME = 'log.json';

export async function appendLog(entry) {
  let logs = [];
  try {
    const existing = await get(LOG_BLOB_NAME);
    if (existing && existing.body) {
      const text = await existing.body.text();
      logs = JSON.parse(text);
    }
  } catch (err) {
    // If blob does not exist, start with empty logs
    logs = [];
  }
  logs.push(entry);
  await put(LOG_BLOB_NAME, JSON.stringify(logs, null, 2), {
    contentType: 'application/json',
    access: 'public', // or 'private' if you want restricted access
  });
}

export async function getLogs() {
  try {
    const existing = await get(LOG_BLOB_NAME);
    if (existing && existing.body) {
      const text = await existing.body.text();
      return JSON.parse(text);
    }
    return [];
  } catch (err) {
    return [];
  }
}
