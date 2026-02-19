export default function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <header className="mb-8 space-y-3">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-600 dark:text-cyan-300">{eyebrow}</p>
      ) : null}
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">{title}</h2>
      {subtitle ? <p className="max-w-3xl text-sm text-slate-600 dark:text-slate-300 sm:text-base">{subtitle}</p> : null}
    </header>
  );
}
