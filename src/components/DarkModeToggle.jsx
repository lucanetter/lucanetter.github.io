import { useTheme } from '../context/ThemeContext';

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:border-cyan-500 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-cyan-300 dark:hover:text-cyan-300"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 3v2.25M12 18.75V21M4.97 4.97l1.59 1.59M17.44 17.44l1.59 1.59M3 12h2.25M18.75 12H21M4.97 19.03l1.59-1.59M17.44 6.56l1.59-1.59" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M21 12.79A9 9 0 1 1 11.21 3c-.02.27-.03.54-.03.81A8.99 8.99 0 0 0 21 12.79Z" />
        </svg>
      )}
    </button>
  );
}
