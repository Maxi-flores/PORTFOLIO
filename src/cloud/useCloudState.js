import { useContext } from 'react';
import { CloudStateContext } from './cloudStateContext.js';

export function useCloudState() {
  const value = useContext(CloudStateContext);
  if (!value) {
    throw new Error('useCloudState must be used within CloudStateProvider');
  }
  return value;
}

