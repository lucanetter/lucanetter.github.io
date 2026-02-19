import { Link } from 'react-router-dom';
import Container from '../components/Container';
import PageTransition from '../components/PageTransition';

export default function NotFoundPage() {
  return (
    <PageTransition>
      <Container className="py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-cyan-600 dark:text-cyan-300">404</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">Page not found</h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">The requested page does not exist.</p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-cyan-300"
        >
          Back Home
        </Link>
      </Container>
    </PageTransition>
  );
}
