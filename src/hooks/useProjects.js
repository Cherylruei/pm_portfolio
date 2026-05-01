import { useState, useEffect } from 'react';
import fallbackProjects from '../data/projects.json';

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('[useProjects] source: API, count:', data.projects?.length);
        setProjects(data.projects);
      })
      .catch((err) => {
        console.warn(
          '[useProjects] API failed, using fallback. Reason:',
          err.message,
        );
        setProjects(fallbackProjects);
        setError(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return { projects, loading, error };
}
