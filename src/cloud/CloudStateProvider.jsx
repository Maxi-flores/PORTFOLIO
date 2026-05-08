import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import { CloudStateContext } from './cloudStateContext.js';

function nowIso() {
  return new Date().toISOString();
}

export default function CloudStateProvider({ children }) {
  const config = useMemo(() => getFirebaseConfig(), []);

  const [status, setStatus] = useState(() => {
    if (!config) return 'unconfigured';
    return navigator.onLine ? 'connecting' : 'offline';
  }); // connecting | online | offline | error | unconfigured
  const [notes, setNotes] = useState('');
  const [notesHistory, setNotesHistory] = useState([]);
  const [feedItems, setFeedItems] = useState([]);
  const [lastSyncAt, setLastSyncAt] = useState(null);
  const [error, setError] = useState(null);
  const [networkEpoch, setNetworkEpoch] = useState(0);

  const hasHydratedRef = useRef(false);

  useEffect(() => {
    if (!config) {
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

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [config]);

  useEffect(() => {
    if (!config) return;
    if (!navigator.onLine) return;

    let unsubNotes = null;
    let unsubHistory = null;
    let unsubFeed = null;
    let cancelled = false;

    const start = async () => {
      const app = getFirebaseApp();
      if (!app) throw new Error('Firebase app init failed (missing config?)');
      const db = getFirestore(app);

      enableIndexedDbPersistence(db).catch(() => {
        // Best-effort; may fail in private browsing or multi-tab.
      });

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

      unsubNotes = onSnapshot(
        notesDoc,
        (snap) => {
          if (cancelled) return;
          const data = snap.data() ?? {};
          setNotes(typeof data.text === 'string' ? data.text : '');
          setLastSyncAt(nowIso());
          hasHydratedRef.current = true;
          setStatus('online');
        },
        (e) => {
          if (cancelled) return;
          setError(e);
          setStatus(navigator.onLine ? 'error' : 'offline');
        },
      );

      unsubHistory = onSnapshot(
        notesHistoryQuery,
        (snap) => {
          if (cancelled) return;
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
          if (cancelled) return;
          setError(e);
          setStatus(navigator.onLine ? 'error' : 'offline');
        },
      );

      unsubFeed = onSnapshot(
        feedQuery,
        (snap) => {
          if (cancelled) return;
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
          if (cancelled) return;
          setError(e);
          setStatus(navigator.onLine ? 'error' : 'offline');
        },
      );
    };

    start().catch((e) => {
      Promise.resolve().then(() => {
        if (cancelled) return;
        setError(e);
        setStatus('error');
      });
    });

    return () => {
      cancelled = true;
      unsubNotes?.();
      unsubHistory?.();
      unsubFeed?.();
    };
  }, [config, networkEpoch]);

  const updateNotes = useCallback(
    async (nextText) => {
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
    [config, notes],
  );

  const addFeedItem = useCallback(async (text) => {
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
  }, [config]);

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
