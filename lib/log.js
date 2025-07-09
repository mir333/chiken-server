import fs from 'fs';
import path from 'path';

const logFile = path.resolve(process.cwd(), 'log.json');

export function appendLog(entry) {
  let logs = [];
  if (fs.existsSync(logFile)) {
    logs = JSON.parse(fs.readFileSync(logFile));
  }
  logs.push(entry);
  fs.writeFileSync(logFile, JSON.stringify(logs, null, 2));
}

export function getLogs() {
  if (!fs.existsSync(logFile)) return [];
  return JSON.parse(fs.readFileSync(logFile));
}
