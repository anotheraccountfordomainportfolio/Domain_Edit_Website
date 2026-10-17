import React, { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3 rounded-2xl bg-amber-500/90 backdrop-blur-md px-4 py-3 text-xs font-mono text-black shadow-[0_0_30px_rgba(245,158,11,0.5)] border border-amber-300 animate-bounce">
      <WifiOff className="w-4 h-4" />
      <div>
        <div className="font-bold uppercase tracking-wider">Offline Mode Active</div>
        <div className="text-[10px] opacity-90">Cached pages & assets are serving offline.</div>
      </div>
    </div>
  );
};
