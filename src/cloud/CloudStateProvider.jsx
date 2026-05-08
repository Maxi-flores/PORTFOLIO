import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  addDoc,
  collection,
  doc,
  enableIndexedDbPersistence,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { getFirebaseApp, getFirebaseConfig } from './firebaseApp.js';

const CloudStateContext = createContext(null);

function nowIso() {
  return new Date().toISOString();
}

export function CloudStateProvider({ children }) {
  const [status, setStatus] = useState('connecting'); // connecting | online | offline | error | unconfigured
  const [notes, setNotes] = useState('');
  const [notesHistory, setNotesHistory] = useState([]);
  const [feedItems, setFeedItems] = useState([]);
  const [lastSyncAt, setLastSyncAt] = useState(null);
  const [error, setError] = useState(null);
  const [networkEpoch, setNetworkEpoch] = useState(0);

  const hasHydratedRef = useRef(false);

  useEffect(() => {
    const config = getFirebaseConfig();
    if (!config) {
      setStatus('unconfigured');
      return;
    }

    const handleOnline = () => {
      setStatus((prev) => (prev === 'online' ? prev : 'connecting'));
      setNetworkEpoch((n) => n + 1);
    };
    const handleOffline = () => {
      setStatus('offline');
      setNetworkEpoch((n) => n + 1);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    if (!navigator.onLine) setStatus('offline');

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const config = getFirebaseConfig();
    if (!config) return;
    if (!navigator.onLine) return;

    try {
      const app = getFirebaseApp();
      if (!app) {
        setStatus('unconfigured');
        return;
      }

      const db = getFirestore(app);
      enableIndexedDbPersistence(db).catch(() => {
        // Best-effort; may fail in private browsing or multi-tab.
      });

      setStatus('connecting');

      const notesDoc = doc(db, 'cloudState', 'powerframeNotes');
      const notesHistoryQuery = query(
        collection(notesDoc, 'history'),
        orderBy('replacedAt', 'desc'),
        limit(5),
      );

      const feedDoc = doc(db, 'cloudState', 'powerstarterFeed');
      const feedQuery = query(
        collection(feedDoc, 'items'),
        orderBy('createdAt', 'desc'),
        limit(20),
      );

      const unsubNotes = onSnapshot(
        notesDoc,
        (snap) => {
          const data = snap.data() ?? {};
          setNotes(typeof data.text === 'string' ? data.text : '');
          setLastSyncAt(nowIso());
          hasHydratedRef.current = true;
          setStatus('online');
        },
        (e) => {
          setError(e);
          setStatus(navigator.onLine ? 'error' : 'offline');
        },
      );

      const unsubHistory = onSnapshot(
        notesHistoryQuery,
        (snap) => {
          setNotesHistory(
            snap.docs
              .map((d) => d.data())
              .filter((row) => row && typeof row.text === 'string')
              .map((row) => ({
                text: row.text,
                replacedAt: row.replacedAt?.toDate?.()?.toISOString?.() ?? null,
              })),
          );
          setLastSyncAt(nowIso());
          setStatus('online');
        },
        (e) => {
          setError(e);
          setStatus(navigator.onLine ? 'error' : 'offline');
        },
      );

      const unsubFeed = onSnapshot(
        feedQuery,
        (snap) => {
          setFeedItems(
            snap.docs.map((d) => ({
              id: d.id,
              ...d.data(),
              createdAt: d.data()?.createdAt?.toDate?.()?.toISOString?.() ?? null,
            })),
          );
          setLastSyncAt(nowIso());
          setStatus('online');
        },
        (e) => {
          setError(e);
          setStatus(navigator.onLine ? 'error' : 'offline');
        },
      );

      return () => {
        unsubNotes();
        unsubHistory();
        unsubFeed();
      };
    } catch (e) {
      setError(e);
      setStatus('error');
      return undefined;
    }
  }, [networkEpoch]);

  const updateNotes = useCallback(
    async (nextText) => {
      const config = getFirebaseConfig();
      if (!config) return;
      if (!navigator.onLine) {
        setStatus('offline');
        return;
      }

      const app = getFirebaseApp();
      if (!app) return;
      const db = getFirestore(app);

      const notesDoc = doc(db, 'cloudState', 'powerframeNotes');
      const previousText = hasHydratedRef.current ? notes : null;
      await setDoc(
        notesDoc,
        {
          text: nextText,
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      );

      if (previousText !== null && previousText !== nextText && previousText.trim()) {
        await addDoc(collection(notesDoc, 'history'), {
          text: previousText,
          replacedAt: serverTimestamp(),
        });
      }
    },
    [notes],
  );

  const addFeedItem = useCallback(async (text) => {
    const config = getFirebaseConfig();
    if (!config) return;
    if (!navigator.onLine) {
      setStatus('offline');
      return;
    }

    const app = getFirebaseApp();
    if (!app) return;
    const db = getFirestore(app);

    const feedDoc = doc(db, 'cloudState', 'powerstarterFeed');
    await addDoc(collection(feedDoc, 'items'), {
      text,
      createdAt: serverTimestamp(),
    });
  }, []);

  const value = useMemo(
    () => ({
      status,
      lastSyncAt,
      error,
      notes,
      notesHistory,
      feedItems,
      updateNotes,
      addFeedItem,
    }),
    [status, lastSyncAt, error, notes, notesHistory, feedItems, updateNotes, addFeedItem],
  );

  return <CloudStateContext.Provider value={value}>{children}</CloudStateContext.Provider>;
}

export function useCloudState() {
  const value = useContext(CloudStateContext);
  if (!value) {
    throw new Error('useCloudState must be used within CloudStateProvider');
  }
  return value;
}
