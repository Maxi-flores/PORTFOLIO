import { useMemo } from 'react';
import { useCloudState } from '../cloud/useCloudState.js';

function dotClass(status) {
  switch (status) {
    case 'online':
      return 'bg-[#00ff41]';
    case 'connecting':
      return 'bg-cyan-300';
    case 'offline':
      return 'bg-gray-500';
    case 'error':
      return 'bg-red-400';
    case 'unconfigured':
    default:
      return 'bg-fuchsia-300';
  }
}

function label(status) {
  switch (status) {
    case 'online':
      return 'CLOUD_SYNC_ONLINE';
    case 'connecting':
      return 'CLOUD_SYNC_CONNECTING';
    case 'offline':
      return 'CLOUD_SYNC_OFFLINE';
    case 'error':
      return 'CLOUD_SYNC_ERROR';
    case 'unconfigured':
    default:
      return 'CLOUD_SYNC_UNCONFIGURED';
  }
}

export default function SyncStatus() {
  const { status, lastSyncAt } = useCloudState();

  const lastSyncHuman = useMemo(() => {
    if (!lastSyncAt) return null;
    try {
      return new Date(lastSyncAt).toLocaleString();
    } catch {
      return lastSyncAt;
    }
  }, [lastSyncAt]);

  return (
    <div className="flex items-center gap-2 text-xs tracking-widest text-[#00ff41]">
      <span className={['blink inline-block w-2 h-2 rounded-full', dotClass(status)].join(' ')} />
      <span className="text-[#00ff41]">{label(status)}</span>
      {lastSyncHuman ? (
        <span className="text-gray-500 tracking-normal ml-2">last_sync: {lastSyncHuman}</span>
      ) : null}
    </div>
  );
}
