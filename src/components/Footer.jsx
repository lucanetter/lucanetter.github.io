import { Link } from 'react-router-dom';
import Container from './Container';

const quickLinks = [
  { label: 'Projects', to: '/projects' },
  { label: 'Models', to: '/models' },
  { label: 'Resume', to: '/resume' },
  { label: 'Contact', to: '/contact' }
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white/80 py-10 dark:border-slate-800 dark:bg-slate-950/80">
      <Container>
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Luca Netter</h3>
            <p className="mt-3 max-w-sm text-sm text-slate-600 dark:text-slate-300">
              Mechanical Engineering portfolio focused on simulation, CAD workflows, and data-driven decision making.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Quick Links</h4>
            <ul className="mt-3 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link className="text-sm text-slate-700 hover:text-cyan-600 dark:text-slate-200 dark:hover:text-cyan-300" to={link.to}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Socials</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-slate-700 hover:text-cyan-600 dark:text-slate-200 dark:hover:text-cyan-300">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-700 hover:text-cyan-600 dark:text-slate-200 dark:hover:text-cyan-300">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-8 text-xs text-slate-500 dark:text-slate-400">(c) {new Date().getFullYear()} Luca Netter. All rights reserved.</p>
      </Container>
    </footer>
  );
}
