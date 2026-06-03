import { useEffect, useMemo, useState } from 'react';
import resumeMetaUrl from '../../data/resume_meta.json?url';

function toStartSortKey(dateRange) {
  const start = dateRange?.start ?? '';
  const [yearRaw, monthRaw] = String(start).split('-');
  const year = Number.parseInt(yearRaw, 10);
  const month = monthRaw ? Number.parseInt(monthRaw, 10) : 1;
  if (!Number.isFinite(year)) return 0;
  return year * 100 + (Number.isFinite(month) ? month : 1);
}

function formatDatePart(value, granularity) {
  if (!value) return '';
  if (value === 'present') return 'Present';
  if (granularity === 'month') {
    const [yearRaw, monthRaw] = String(value).split('-');
    const year = Number.parseInt(yearRaw, 10);
    const month = Number.parseInt(monthRaw, 10);
    if (!Number.isFinite(year) || !Number.isFinite(month)) return String(value);
    const date = new Date(Date.UTC(year, Math.max(0, month - 1), 1));
    return date.toLocaleString(undefined, { month: 'short', year: 'numeric', timeZone: 'UTC' });
  }
  return String(value);
}

function formatDateRange(dateRange) {
  const granularity = dateRange?.granularity ?? 'year';
  const start = formatDatePart(dateRange?.start, granularity);
  const end = formatDatePart(dateRange?.end, granularity);
  if (!start && !end) return '';
  if (start && end && start !== end) return `${start} — ${end}`;
  return start || end;
}

function toneForCompetency(id) {
  switch (id) {
    case 'COMP-1':
      return 'ring-emerald-400/40 text-emerald-700 bg-emerald-500/10 dark:ring-[#00ff41]/40 dark:text-[#00ff41] dark:bg-[#00ff41]/10';
    case 'COMP-2':
      return 'ring-cyan-400/35 text-cyan-700 bg-cyan-500/10 dark:ring-cyan-300/30 dark:text-cyan-200 dark:bg-cyan-300/10';
    case 'COMP-3':
      return 'ring-fuchsia-400/30 text-fuchsia-700 bg-fuchsia-500/10 dark:ring-fuchsia-300/25 dark:text-fuchsia-200 dark:bg-fuchsia-300/10';
    case 'COMP-4':
      return 'ring-amber-400/35 text-amber-700 bg-amber-500/10 dark:ring-amber-300/30 dark:text-amber-200 dark:bg-amber-300/10';
    case 'COMP-5':
      return 'ring-pink-400/30 text-pink-700 bg-pink-500/10 dark:ring-pink-300/25 dark:text-pink-200 dark:bg-pink-300/10';
    default:
      return 'ring-slate-300 text-slate-700 bg-slate-100 dark:ring-gray-500/25 dark:text-gray-300 dark:bg-white/5';
  }
}

function Chip({ children, className, title, active, onClick }) {
  const base =
    'inline-flex items-center rounded px-2 py-0.5 text-[10px] tracking-widest uppercase ring-1 transition-colors';
  const interactive = onClick
    ? 'cursor-pointer hover:ring-slate-300 hover:bg-slate-100 dark:hover:ring-white/25 dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 dark:focus-visible:ring-[#00ff41]/40'
    : '';
  const emphasis = active ? 'ring-2 ring-slate-400/40 dark:ring-white/30' : '';

  if (onClick) {
    return (
      <button
        type="button"
        title={title}
        onClick={onClick}
        className={[base, interactive, emphasis, className].filter(Boolean).join(' ')}
      >
        {children}
      </button>
    );
  }

  return (
    <span title={title} className={[base, className].filter(Boolean).join(' ')}>
      {children}
    </span>
  );
}

function ProjectRow({ project, competencyIndex, questionIndex }) {
  return (
    <div className="rounded-md bg-white/70 dark:bg-black/40 ring-1 ring-slate-200 dark:ring-white/10 px-4 py-3">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs tracking-widest text-slate-900 dark:text-gray-200">{project?.name}</p>
          {project?.summary ? (
            <p className="mt-1 text-sm text-slate-600 dark:text-gray-400 leading-relaxed">{project.summary}</p>
          ) : null}
        </div>
        {project?.type ? (
          <span className="shrink-0 rounded border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] tracking-widest text-slate-600 uppercase dark:border-gray-700 dark:bg-black/60 dark:text-gray-400">
            {project.type}
          </span>
        ) : null}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {(project?.google_competencies ?? []).map((id) => (
          <Chip
            key={id}
            className={toneForCompetency(id)}
            title={competencyIndex?.get(id)?.definition ?? id}
          >
            {id}
          </Chip>
        ))}
        {(project?.interview_questions_answered ?? []).map((number) => (
          <Chip
            key={number}
            className="ring-slate-300 text-slate-700 bg-slate-100 dark:ring-gray-500/25 dark:text-gray-300 dark:bg-white/5"
            title={questionIndex?.get(number)?.theme ?? `Question ${number}`}
          >
            Q{number}
          </Chip>
        ))}
      </div>
    </div>
  );
}

export default function PortfolioTimeline() {
  const [resumeMeta, setResumeMeta] = useState(null);
  const [loadState, setLoadState] = useState({ status: 'idle', error: null });
  const [openPeriodId, setOpenPeriodId] = useState(null);
  const [competencyFilter, setCompetencyFilter] = useState(null);
  const [questionFilter, setQuestionFilter] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function run() {
      setLoadState({ status: 'loading', error: null });
      try {
        const response = await fetch(resumeMetaUrl, { signal: controller.signal });
        if (!response.ok) throw new Error(`Failed to load resume_meta.json (${response.status})`);
        const json = await response.json();
        setResumeMeta(json);
        setLoadState({ status: 'ready', error: null });
      } catch (error) {
        if (controller.signal.aborted) return;
        setLoadState({ status: 'error', error: error instanceof Error ? error.message : String(error) });
      }
    }

    run();
    return () => controller.abort();
  }, []);

  const competencyIndex = useMemo(() => {
    const map = new Map();
    for (const competency of resumeMeta?.google_competencies ?? []) {
      if (competency?.id) map.set(competency.id, competency);
    }
    return map;
  }, [resumeMeta]);

  const questionIndex = useMemo(() => {
    const map = new Map();
    for (const question of resumeMeta?.interview_questions ?? []) {
      if (Number.isFinite(question?.number)) map.set(question.number, question);
    }
    return map;
  }, [resumeMeta]);

  const periods = useMemo(() => {
    const list = [...(resumeMeta?.periods ?? [])];
    list.sort((a, b) => toStartSortKey(b?.date_range) - toStartSortKey(a?.date_range));
    return list;
  }, [resumeMeta]);

  const filteredPeriods = useMemo(() => {
    return periods.filter((period) => {
      const competencies = period?.google_competencies ?? [];
      const questions = period?.interview_questions_answered ?? [];
      if (competencyFilter && !competencies.includes(competencyFilter)) return false;
      if (questionFilter && !questions.includes(questionFilter)) return false;
      return true;
    });
  }, [periods, competencyFilter, questionFilter]);

  function togglePeriod(periodId) {
    setOpenPeriodId((current) => (current === periodId ? null : periodId));
  }

  const allCompetencies = useMemo(() => resumeMeta?.google_competencies ?? [], [resumeMeta]);
  const allQuestions = useMemo(() => resumeMeta?.interview_questions ?? [], [resumeMeta]);

  return (
    <section className="mt-10 rounded-xl bg-white/60 dark:bg-black/40 ring-1 ring-slate-200/80 dark:ring-[#00ff41]/15 px-5 py-5">
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <p className="text-[10px] tracking-widest text-slate-500 dark:text-gray-500 uppercase">Interactive timeline</p>
          <h2 className="mt-2 text-sm sm:text-base tracking-widest text-[#00ff41] uppercase">
            Periods · Competencies · Interview Coverage
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-gray-400 leading-relaxed max-w-2xl">
            Scan the 3 core periods. Each card shows which Google competencies are active and which interview questions
            it answers.
          </p>
        </div>

        <div className="min-w-[260px]">
          <p className="text-[10px] tracking-widest text-slate-500 dark:text-gray-500 uppercase">Filters</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Chip
              active={!competencyFilter}
              onClick={() => setCompetencyFilter(null)}
              className="ring-slate-300 text-slate-700 bg-slate-100 dark:ring-gray-500/25 dark:text-gray-300 dark:bg-white/5"
              title="Show all competencies"
            >
              ALL
            </Chip>
            {allCompetencies.map((c) => (
              <Chip
                key={c.id}
                active={competencyFilter === c.id}
                onClick={() => setCompetencyFilter((current) => (current === c.id ? null : c.id))}
                className={toneForCompetency(c.id)}
                title={c.definition}
              >
                {c.id}
              </Chip>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <Chip
              active={!questionFilter}
              onClick={() => setQuestionFilter(null)}
              className="ring-slate-300 text-slate-700 bg-slate-100 dark:ring-gray-500/25 dark:text-gray-300 dark:bg-white/5"
              title="Show all questions"
            >
              Q:ALL
            </Chip>
            {allQuestions.map((q) => (
              <Chip
                key={q.number}
                active={questionFilter === q.number}
                onClick={() => setQuestionFilter((current) => (current === q.number ? null : q.number))}
                className="ring-slate-300 text-slate-700 bg-slate-100 dark:ring-gray-500/25 dark:text-gray-300 dark:bg-white/5"
                title={`${q.label}: ${q.theme}`}
              >
                Q{q.number}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      {loadState.status === 'loading' ? (
        <div className="mt-6 rounded-lg bg-white/70 dark:bg-black/50 ring-1 ring-slate-200 dark:ring-white/10 px-4 py-3">
          <p className="text-sm text-slate-700 dark:text-gray-300 tracking-widest">Loading timeline…</p>
        </div>
      ) : null}

      {loadState.status === 'error' ? (
        <div className="mt-6 rounded-lg bg-red-500/10 ring-1 ring-red-400/25 px-4 py-3">
          <p className="text-sm tracking-widest text-red-200">Failed to load timeline</p>
          <p className="mt-1 text-xs text-red-200/80">{loadState.error}</p>
        </div>
      ) : null}

      {loadState.status === 'ready' ? (
        <div className="mt-6">
          {filteredPeriods.length ? (
            <div className="space-y-4">
              {filteredPeriods.map((period, index) => {
                const isOpen = openPeriodId === period.id;
                const range = formatDateRange(period.date_range);
                const location = period?.location
                  ? [period.location.city, period.location.country].filter(Boolean).join(', ')
                  : null;

                return (
                  <div key={period.id} className="relative">
                    <div className="absolute left-2 top-0 bottom-0 w-px bg-[#00ff41]/15 dark:bg-[#00ff41]/15" />
                    <button
                      type="button"
                      onClick={() => togglePeriod(period.id)}
                      className={[
                        'w-full text-left rounded-xl bg-white/70 dark:bg-black/50 ring-1 px-5 py-4 transition-colors',
                        isOpen
                          ? 'ring-[#00ff41]/35'
                          : 'ring-slate-200 hover:ring-slate-300 dark:ring-white/10 dark:hover:ring-white/20',
                      ].join(' ')}
                    >
                      <div className="absolute left-0 top-6 -translate-x-1/2">
                        <div
                          className={[
                            'w-4 h-4 rounded-full ring-2',
                            isOpen
                              ? 'bg-[#00ff41] ring-[#00ff41]/30'
                              : 'bg-white dark:bg-black ring-[#00ff41]/25',
                          ].join(' ')}
                        />
                      </div>

                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="min-w-0">
                          <p className="text-[10px] tracking-widest text-slate-500 dark:text-gray-500 uppercase">
                            {index + 1}. {range || 'Timeline period'}
                          </p>
                          <h3 className="mt-1 text-sm sm:text-base tracking-wide text-slate-900 dark:text-gray-100">
                            {period.title}
                          </h3>
                          {location ? (
                            <p className="mt-1 text-xs text-slate-600 dark:text-gray-400">{location}</p>
                          ) : null}
                          {period.focus ? (
                            <p className="mt-2 text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                              {period.focus}
                            </p>
                          ) : null}
                        </div>

                        <div className="shrink-0 text-right">
                          <span className="inline-flex items-center gap-2 text-[10px] tracking-widest text-slate-500 dark:text-gray-500 uppercase">
                            <span
                              className={[
                                'inline-block w-2 h-2 rounded-full',
                                isOpen ? 'bg-[#00ff41]' : 'bg-slate-400 dark:bg-gray-600',
                              ].join(' ')}
                            />
                            {isOpen ? 'Expanded' : 'Collapsed'}
                          </span>
                          <p className="mt-2 text-[10px] tracking-widest text-slate-500 dark:text-gray-600 uppercase select-none">
                            {period.projects?.length ? `${period.projects.length} projects` : 'No projects'}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {(period.google_competencies ?? []).map((id) => (
                          <Chip
                            key={id}
                            className={toneForCompetency(id)}
                            title={competencyIndex.get(id)?.definition ?? id}
                          >
                            {id}
                          </Chip>
                        ))}
                        {(period.interview_questions_answered ?? []).map((number) => (
                          <Chip
                            key={number}
                            className="ring-slate-300 text-slate-700 bg-slate-100 dark:ring-gray-500/25 dark:text-gray-300 dark:bg-white/5"
                            title={questionIndex.get(number)?.theme ?? `Question ${number}`}
                          >
                            Q{number}
                          </Chip>
                        ))}
                      </div>

                      {isOpen ? (
                        <div className="mt-5 space-y-4">
                          {period.copilot_directive ? (
                            <div className="rounded-lg bg-white/70 dark:bg-black/40 ring-1 ring-[#00ff41]/10 px-4 py-3">
                              <p className="text-[10px] tracking-widest text-slate-500 dark:text-gray-500 uppercase">
                                Directive
                              </p>
                              <p className="mt-2 text-sm text-slate-700 dark:text-gray-300 leading-relaxed">
                                {period.copilot_directive}
                              </p>
                            </div>
                          ) : null}

                          {period.projects?.length ? (
                            <div>
                              <p className="text-[10px] tracking-widest text-slate-500 dark:text-gray-500 uppercase">
                                Projects
                              </p>
                              <div className="mt-2 grid grid-cols-1 gap-3">
                                {period.projects.map((project) => (
                                  <ProjectRow
                                    key={project.id ?? project.name}
                                    project={project}
                                    competencyIndex={competencyIndex}
                                    questionIndex={questionIndex}
                                  />
                                ))}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      ) : null}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-lg bg-white/70 dark:bg-black/50 ring-1 ring-slate-200 dark:ring-white/10 px-4 py-3">
              <p className="text-sm text-slate-700 dark:text-gray-300">No periods match the active filters.</p>
            </div>
          )}
        </div>
      ) : null}
    </section>
  );
}
