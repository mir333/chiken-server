import { useEffect, useState } from 'react';

export default function Home() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch('/api/logs')
      .then(res => res.json())
      .then(data => setLogs(data.logs));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>API Call Log</h1>
      <ul>
          {JSON.stringify(logs)}
      </ul>
    </div>
  );
}
