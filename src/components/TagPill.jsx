export default function TagPill({ children, active = false, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide transition ${
        active
          ? 'border-cyan-500 bg-cyan-500 text-white dark:border-cyan-400 dark:bg-cyan-400 dark:text-slate-900'
          : 'border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
      } ${className}`}
    >
      {children}
    </span>
  );
}
