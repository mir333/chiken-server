import { appendLog } from '../../lib/log';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const entry = {
      timestamp: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || '',
    };
    appendLog(entry);
    res.status(200).setHeader('Content-Type', 'text/plain').send('NOTHING');
  } else {
    res.status(405).setHeader('Content-Type', 'text/plain').send('Method not allowed');
  }
}
