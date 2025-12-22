import { useEffect, useState } from 'react';

export default function TestBackend() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Prueba Backend:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
