import { useEffect, useMemo, useState } from 'react';
import resumeMetaUrl from '../data/resume_meta.json?url';

function formatMonth(isoMonth) {
  if (typeof isoMonth !== 'string') return null;
  const match = /^(\d{4})-(\d{2})$/.exec(isoMonth.trim());
  if (!match) return isoMonth;

  const [, year, month] = match;
  const date = new Date(Number(year), Number(month) - 1, 1);
  if (Number.isNaN(date.getTime())) return isoMonth;

  return new Intl.DateTimeFormat(undefined, { month: 'short', year: 'numeric' }).format(date);
}

function formatDateRange(dateRange) {
  const start = formatMonth(dateRange?.start) ?? '';
  const endRaw = dateRange?.end;
  const end =
    typeof endRaw === 'string' && endRaw.toLowerCase() === 'present'
      ? 'Present'
      : formatMonth(endRaw) ?? '';

  if (!start && !end) return null;
  if (!start) return end;
  if (!end) return start;
  return `${start} — ${end}`;
}

function normalizeCompetencies(value) {
  if (!Array.isArray(value)) return [];
  return value.filter((id) => typeof id === 'string' && /^COMP-\d+$/.test(id));
}

function normalizeQuestions(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((n) => (typeof n === 'number' ? n : Number(n)))
    .filter((n) => Number.isInteger(n) && n >= 1 && n <= 7);
}

function Pill({ label, title, variant = 'default' }) {
  const variantClass =
    variant === 'competency'
      ? 'ring-cyan-400/30 text-cyan-800 bg-cyan-500/10 dark:text-cyan-200 dark:bg-cyan-300/10 dark:ring-cyan-300/25'
      : variant === 'question'
        ? 'ring-fuchsia-400/30 text-fuchsia-800 bg-fuchsia-500/10 dark:text-fuchsia-200 dark:bg-fuchsia-300/10 dark:ring-fuchsia-300/25'
        : 'ring-slate-300 text-slate-700 bg-slate-100 dark:ring-white/15 dark:text-gray-200 dark:bg-white/5';

  return (
    <span
      title={title}
      className={[
        'inline-flex items-center rounded-full px-2 py-1 text-[10px] tracking-widest',
        'ring-1 ring-inset select-none',
        variantClass,
      ].join(' ')}
    >
      {label}
    </span>
  );
}

function BadgeRow({ competencies, questions, competencyLookup, questionLookup }) {
  const normalizedCompetencies = normalizeCompetencies(competencies);
  const normalizedQuestions = normalizeQuestions(questions);

  if (normalizedCompetencies.length === 0 && normalizedQuestions.length === 0) return null;

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      {normalizedCompetencies.map((id) => {
        const competency = competencyLookup.get(id);
        const title = competency ? `${competency.title}: ${competency.definition}` : undefined;
        return (
          <Pill
            key={id}
            variant="competency"
            label={`[${id}]`}
            title={title}
          />
        );
      })}
      {normalizedQuestions.map((number) => {
        const question = questionLookup.get(number);
        const title = question ? `${question.label}: ${question.theme}` : undefined;
        return (
          <Pill
            key={number}
            variant="question"
            label={`[Q-${number}]`}
            title={title}
          />
        );
      })}
    </div>
  );
}

export function PortfolioTimeline() {
  const [state, setState] = useState({ status: 'loading', data: null, error: null });

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const response = await fetch(resumeMetaUrl, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Failed to load resume metadata (${response.status})`);
        }

        const json = await response.json();
        if (!json || typeof json !== 'object') {
          throw new Error('Resume metadata JSON is not an object');
        }

        setState({ status: 'ready', data: json, error: null });
      } catch (error) {
        if (controller.signal.aborted) return;
        setState({
          status: 'error',
          data: null,
          error: error instanceof Error ? error : new Error('Unknown error'),
        });
      }
    }

    load();
    return () => controller.abort();
  }, []);

  const competencyLookup = useMemo(() => {
    const map = new Map();
    const list = state.data?.google_competencies;
    if (!Array.isArray(list)) return map;
    for (const item of list) {
      if (!item || typeof item !== 'object') continue;
      if (typeof item.id !== 'string') continue;
      map.set(item.id, item);
    }
    return map;
  }, [state.data]);

  const questionLookup = useMemo(() => {
    const map = new Map();
    const list = state.data?.interview_questions;
    if (!Array.isArray(list)) return map;
    for (const item of list) {
      if (!item || typeof item !== 'object') continue;
      if (typeof item.number !== 'number') continue;
      map.set(item.number, item);
    }
    return map;
  }, [state.data]);

  const periods = Array.isArray(state.data?.periods) ? state.data.periods : [];

  return (
    <section className="mt-10 rounded-xl bg-white/60 dark:bg-black/40 ring-1 ring-slate-200/80 dark:ring-white/10 px-5 py-5">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-[10px] tracking-widest text-slate-500 dark:text-gray-500 uppercase">
            Timeline
          </p>
          <h2 className="mt-2 text-lg tracking-wide text-slate-900 dark:text-white">
            Portfolio Periods & Project Metadata
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-gray-400 leading-relaxed max-w-2xl">
            Runtime-fed timeline that maps each period and project to Google Competencies and
            interview question coverage.
          </p>
        </div>

        <div className="shrink-0">
          <Pill
            label={state.status === 'ready' ? '[LIVE]' : state.status === 'error' ? '[ERROR]' : '[LOADING]'}
            variant="default"
            title="Component status"
          />
        </div>
      </div>

      {state.status === 'loading' ? (
        <div className="mt-6 rounded-lg bg-white/70 dark:bg-black/50 ring-1 ring-slate-200 dark:ring-white/10 px-4 py-3">
          <p className="text-sm text-slate-700 dark:text-gray-300">Loading timeline…</p>
        </div>
      ) : null}

      {state.status === 'error' ? (
        <div className="mt-6 rounded-lg bg-white/70 dark:bg-black/50 ring-1 ring-rose-200 dark:ring-rose-400/20 px-4 py-3">
          <p className="text-sm text-slate-900 dark:text-white">Unable to load timeline.</p>
          <p className="mt-1 text-xs text-slate-600 dark:text-gray-400">{state.error?.message}</p>
        </div>
      ) : null}

      {state.status === 'ready' ? (
        <div className="mt-6">
          <div className="relative">
            <div className="absolute left-2 top-0 bottom-0 w-px bg-slate-200 dark:bg-white/10" />
            <div className="space-y-5">
              {periods.map((period) => {
                if (!period || typeof period !== 'object') return null;

                const title = typeof period.title === 'string' ? period.title : 'Untitled period';
                const locationCity = period.location?.city;
                const locationCountry = period.location?.country;
                const location =
                  typeof locationCity === 'string' && typeof locationCountry === 'string'
                    ? `${locationCity}, ${locationCountry}`
                    : typeof locationCity === 'string'
                      ? locationCity
                      : typeof locationCountry === 'string'
                        ? locationCountry
                        : null;

                const dateRange = formatDateRange(period.date_range);
                const focus = typeof period.focus === 'string' ? period.focus : null;
                const projects = Array.isArray(period.projects) ? period.projects : [];

                return (
                  <article
                    key={typeof period.id === 'string' ? period.id : title}
                    className="relative pl-8"
                  >
                    <div className="absolute left-0 top-2 h-4 w-4 rounded-full bg-white dark:bg-black ring-2 ring-slate-300 dark:ring-white/20" />
                    <div className="rounded-xl bg-white/70 dark:bg-black/50 ring-1 ring-slate-200 dark:ring-white/10 px-5 py-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-[10px] tracking-widest text-slate-500 dark:text-gray-500 uppercase">
                            {dateRange ?? 'Period'}
                          </p>
                          <h3 className="mt-1 text-sm sm:text-base tracking-wide text-slate-900 dark:text-white">
                            {title}
                          </h3>
                          {location ? (
                            <p className="mt-1 text-xs text-slate-600 dark:text-gray-400">
                              {location}
                            </p>
                          ) : null}
                        </div>
                        {typeof period.id === 'string' ? (
                          <Pill label={period.id} title="Period id" />
                        ) : null}
                      </div>

                      {focus ? (
                        <p className="mt-3 text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                          {focus}
                        </p>
                      ) : null}

                      <BadgeRow
                        competencies={period.google_competencies}
                        questions={period.interview_questions_answered}
                        competencyLookup={competencyLookup}
                        questionLookup={questionLookup}
                      />

                      {projects.length ? (
                        <div className="mt-4 space-y-3">
                          {projects.map((project) => {
                            if (!project || typeof project !== 'object') return null;
                            const name = typeof project.name === 'string' ? project.name : 'Untitled project';
                            const summary = typeof project.summary === 'string' ? project.summary : null;
                            const type = typeof project.type === 'string' ? project.type : null;

                            return (
                              <div
                                key={typeof project.id === 'string' ? project.id : name}
                                className="rounded-lg bg-white/70 dark:bg-black/40 ring-1 ring-slate-200 dark:ring-white/10 px-4 py-3"
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div>
                                    <p className="text-xs tracking-widest text-slate-900 dark:text-gray-200">
                                      {name}
                                    </p>
                                    {summary ? (
                                      <p className="mt-1 text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                                        {summary}
                                      </p>
                                    ) : null}
                                  </div>
                                  {type ? (
                                    <span className="shrink-0 rounded border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] tracking-widest text-slate-600 uppercase dark:border-gray-700 dark:bg-black/60 dark:text-gray-400">
                                      {type}
                                    </span>
                                  ) : null}
                                </div>

                                <BadgeRow
                                  competencies={project.google_competencies}
                                  questions={project.interview_questions_answered}
                                  competencyLookup={competencyLookup}
                                  questionLookup={questionLookup}
                                />
                              </div>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default PortfolioTimeline;
