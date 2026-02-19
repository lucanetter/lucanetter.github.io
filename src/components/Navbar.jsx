import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Container from './Container';
import DarkModeToggle from './DarkModeToggle';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Models', to: '/models' },
  { label: 'Resume', to: '/resume' },
  { label: 'Contact', to: '/contact' }
];

function linkClass({ isActive }) {
  return `rounded-lg px-3 py-2 text-sm font-semibold transition ${
    isActive
      ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
      : 'text-slate-700 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-800'
  }`;
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-slate-50/90 backdrop-blur-lg dark:border-slate-800 dark:bg-slate-950/90">
      <Container className="py-3">
        <div className="flex items-center justify-between gap-4">
          <NavLink
            to="/"
            className="text-base font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-lg"
            onClick={() => setMobileOpen(false)}
          >
            Luca Netter
          </NavLink>

          <div className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass} end={item.to === '/'}>
                {item.label}
              </NavLink>
            ))}
            <DarkModeToggle />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <DarkModeToggle />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:border-cyan-500 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                {mobileOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <nav className="mt-3 grid gap-1 rounded-2xl border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900 md:hidden">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={linkClass}
                onClick={() => setMobileOpen(false)}
                end={item.to === '/'}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        ) : null}
      </Container>
    </header>
  );
}
