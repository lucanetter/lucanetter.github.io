export default function Toast({ show, message, type = 'success', onClose }) {
  if (!show) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 animate-fadeUp rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-soft dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="flex items-center gap-3">
        <span
          className={`inline-block h-2.5 w-2.5 rounded-full ${
            type === 'error' ? 'bg-red-500' : 'bg-emerald-500'
          }`}
        />
        <p className="text-sm text-slate-700 dark:text-slate-200">{message}</p>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md px-2 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Close
        </button>
      </div>
    </div>
  );
}
