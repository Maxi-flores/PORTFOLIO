import { useState } from 'react';
import NeuralShell from '../layout/NeuralShell.jsx';
import { useCloudState } from '../cloud/useCloudState.js';

function formatWhen(iso) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

function EnvHint() {
  return (
    <div className="rounded-lg bg-black/40 ring-1 ring-fuchsia-400/20 px-5 py-4">
      <p className="text-[10px] tracking-widest text-gray-500 uppercase">Firebase not configured</p>
      <p className="mt-2 text-sm text-gray-300 leading-relaxed">
        Add Vite env vars to enable real-time sync:
        <span className="text-gray-200">
          {' '}
          VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID, VITE_FIREBASE_APP_ID
        </span>
        .
      </p>
    </div>
  );
}

export default function Sync() {
  const { status, notes, notesHistory, feedItems, updateNotes, addFeedItem } = useCloudState();
  const [draftNotes, setDraftNotes] = useState(() => notes ?? '');
  const [feedDraft, setFeedDraft] = useState('');

  const isWritable = status === 'online' || status === 'connecting';

  return (
    <NeuralShell
      prompt="~/portfolio/cloud-state $"
      title="Cloud-State Sync"
      subtitle="Unified Firebase/Cloud-State layer for PowerStarter feed + Powerframe notes. Includes note history to prevent “track history loss”."
    >
      {status === 'unconfigured' ? <EnvHint /> : null}

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <section className="rounded-lg bg-black/40 ring-1 ring-[#00ff41]/15 px-5 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h2 className="text-sm tracking-widest text-[#00ff41] uppercase">Powerframe Notes</h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={!isWritable}
                onClick={() => setDraftNotes(notes ?? '')}
                className="px-3 py-1.5 rounded border border-gray-700 text-[11px] tracking-widest uppercase text-gray-400 disabled:opacity-40 disabled:cursor-not-allowed hover:text-white hover:border-gray-500 hover:bg-white/5 transition-colors"
              >
                Load Snapshot
              </button>
              <button
                type="button"
                disabled={!isWritable}
                onClick={() => updateNotes(draftNotes)}
                className="glow-green px-3 py-1.5 rounded border border-[#00ff41]/60 text-[11px] tracking-widest uppercase text-[#00ff41] disabled:opacity-40 disabled:cursor-not-allowed hover:text-white hover:bg-[#00ff41]/10 transition-colors"
              >
                Save to Cloud
              </button>
            </div>
          </div>

          <div className="mt-3 rounded bg-black/40 border border-gray-800 px-3 py-2">
            <p className="text-[10px] tracking-widest text-gray-600 uppercase">Live Cloud Snapshot</p>
            <pre className="mt-2 whitespace-pre-wrap text-sm text-gray-300 leading-relaxed">{notes || '—'}</pre>
          </div>

          <textarea
            value={draftNotes}
            onChange={(e) => setDraftNotes(e.target.value)}
            rows={8}
            className="mt-3 w-full rounded bg-black/60 border border-gray-700 px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#00ff41]/60"
            placeholder="Write a note… (syncs across devices)"
          />

          <div className="mt-4">
            <p className="text-[10px] tracking-widest text-gray-500 uppercase">History (last 5)</p>
            {notesHistory.length ? (
              <ul className="mt-2 space-y-2 text-sm text-gray-300">
                {notesHistory.map((item, idx) => (
                  <li key={`${item.replacedAt ?? 'unknown'}-${idx}`} className="rounded bg-black/40 border border-gray-800 px-3 py-2">
                    <div className="text-[10px] tracking-widest text-gray-600">replaced_at: {formatWhen(item.replacedAt)}</div>
                    <div className="mt-1 whitespace-pre-wrap">{item.text}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-gray-600">No history yet.</p>
            )}
          </div>
        </section>

        <section className="rounded-lg bg-black/40 ring-1 ring-cyan-400/20 px-5 py-4">
          <h2 className="text-sm tracking-widest text-cyan-200 uppercase">PowerStarter Feed</h2>

          <div className="mt-3 flex gap-2">
            <input
              value={feedDraft}
              onChange={(e) => setFeedDraft(e.target.value)}
              className="flex-1 rounded bg-black/60 border border-gray-700 px-3 py-2 text-sm text-gray-200 outline-none focus:border-cyan-300/60"
              placeholder="Post a milestone…"
            />
            <button
              type="button"
              disabled={!isWritable || !feedDraft.trim()}
              onClick={async () => {
                await addFeedItem(feedDraft.trim());
                setFeedDraft('');
              }}
              className="glow-blue px-3 py-2 rounded border border-cyan-300/40 text-[11px] tracking-widest uppercase text-cyan-200 disabled:opacity-40 disabled:cursor-not-allowed hover:text-white hover:bg-cyan-300/10 transition-colors"
            >
              Post
            </button>
          </div>

          <div className="mt-4">
            <p className="text-[10px] tracking-widest text-gray-500 uppercase">Recent (live)</p>
            {feedItems.length ? (
              <ul className="mt-2 space-y-2 text-sm text-gray-300">
                {feedItems.map((item) => (
                  <li key={item.id} className="rounded bg-black/40 border border-gray-800 px-3 py-2">
                    <div className="text-[10px] tracking-widest text-gray-600">created_at: {formatWhen(item.createdAt)}</div>
                    <div className="mt-1">{item.text}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-gray-600">No feed items yet.</p>
            )}
          </div>
        </section>
      </div>
    </NeuralShell>
  );
}
