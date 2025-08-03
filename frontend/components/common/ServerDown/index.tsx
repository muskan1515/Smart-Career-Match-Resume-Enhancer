'use client';
import { checkServerHealth } from '@/services/health';
import { useEffect, useState } from 'react';
import ServerDownModal from './ServerDownModal';

const HealthWatcher = () => {
  const [serverDown, setServerDown] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkHealth = async () => {
      try {
        const isHealthy = await checkServerHealth();
        if (isMounted) setServerDown(!isHealthy);
      } catch {
        if (isMounted) setServerDown(true);
      }
    };

    // Initial check
    checkHealth();

    // Recheck every 30 seconds
    const interval = setInterval(checkHealth, 30000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return serverDown ? <ServerDownModal /> : null;
};

export default HealthWatcher;
