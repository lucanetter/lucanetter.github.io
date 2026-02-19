import { useEffect, useState } from 'react';
import Container from '../components/Container';
import PageTransition from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';

export default function ResumePage() {
  const [pdfState, setPdfState] = useState('loading');

  useEffect(() => {
    let isMounted = true;

    async function checkPdf() {
      try {
        const response = await fetch('/resume.pdf', { method: 'HEAD' });
        if (!isMounted) return;
        setPdfState(response.ok ? 'available' : 'missing');
      } catch (error) {
        if (!isMounted) return;
        setPdfState('missing');
      }
    }

    checkPdf();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PageTransition>
      <Container className="py-14 sm:py-20">
        <SectionHeader
          eyebrow="CV"
          title="Resume"
          subtitle="Open the resume as a standalone PDF or download it directly."
        />

        {pdfState === 'loading' ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            Checking for resume.pdf...
          </div>
        ) : null}

        {pdfState === 'missing' ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
            Resume PDF is not available yet. Add a file at <code>/public/resume.pdf</code>.
          </div>
        ) : null}

        {pdfState === 'available' ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <p className="mb-5 text-sm text-slate-600 dark:text-slate-300">
              The resume is available. Open it in a dedicated tab, download it, or preview it below.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-cyan-300"
              >
                Open Resume
              </a>
              <a
                href="/resume.pdf"
                download
                className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-cyan-500 hover:text-cyan-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-cyan-300 dark:hover:text-cyan-300"
              >
                Download Resume
              </a>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
              <iframe
                src="/resume.pdf#view=FitH"
                title="Luca Netter Resume"
                className="h-[760px] w-full bg-white"
                loading="lazy"
              />
            </div>
          </div>
        ) : null}
      </Container>
    </PageTransition>
  );
}
