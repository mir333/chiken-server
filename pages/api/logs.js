import { getLogs } from '../../lib/log';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const data = await getLogs()
    res.status(200).json(data);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
