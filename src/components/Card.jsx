export default function Card({ className = '', children }) {
  return (
    <article
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 ${className}`}
    >
      {children}
    </article>
  );
}
