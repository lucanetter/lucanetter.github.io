import { Link } from 'react-router-dom';

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
              {index > 0 ? <span>/</span> : null}
              {item.to && !isLast ? (
                <Link to={item.to} className="hover:text-cyan-600 dark:hover:text-cyan-300">
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-slate-700 dark:text-slate-200">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
