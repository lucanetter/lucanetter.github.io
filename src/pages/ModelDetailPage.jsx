import { Link, Navigate, useParams } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import Container from '../components/Container';
import ModelViewer from '../components/ModelViewer';
import PageTransition from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import TagPill from '../components/TagPill';
import { models } from '../data/models';

export default function ModelDetailPage() {
  const { slug } = useParams();
  const model = models.find((item) => item.slug === slug);
  const designConstraints = model?.designConstraints ?? [];
  const tools = model?.tools ?? [];
  const downloads = model?.downloads ?? {};
  const downloadLinks = [
    { label: 'Download STL', href: downloads.stl, download: true },
    { label: 'Download GLB', href: downloads.glb, download: true },
    { label: 'Download STEP', href: downloads.step },
    { label: 'Drawing PDF', href: downloads.pdf }
  ].filter((link) => link.href && link.href !== '#');

  if (!model) {
    return <Navigate to="/404" replace />;
  }

  return (
    <PageTransition>
      <Container className="py-12 sm:py-16">
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Models', to: '/models' },
            { label: model.name }
          ]}
        />

        <header className="mb-8 space-y-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">{model.name}</h1>
          <p className="max-w-3xl text-base text-slate-600 dark:text-slate-300">{model.description}</p>
          <div className="flex flex-wrap gap-2">
            {model.tags.map((tag) => (
              <TagPill key={tag}>{tag}</TagPill>
            ))}
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <ModelViewer fileUrl={model.fileUrl} title={model.name} />
          </section>

          <aside className="space-y-5">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <SectionHeader title="Model Metadata" />
              <p className="text-sm text-slate-600 dark:text-slate-300">{model.description}</p>

              {designConstraints.length > 0 && (
                <>
                  <h3 className="mb-2 mt-5 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Key design constraints
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    {designConstraints.map((constraint) => (
                      <li key={constraint} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 flex-none rounded-full bg-cyan-500 dark:bg-cyan-300" aria-hidden />
                        <span>{constraint}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {tools.length > 0 && (
                <>
                  <h3 className="mb-2 mt-5 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Tools used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tools.map((tool) => (
                      <TagPill key={tool}>{tool}</TagPill>
                    ))}
                  </div>
                </>
              )}
            </section>

            {downloadLinks.length > 0 && (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                <SectionHeader title="Downloads" />
                <div className="flex flex-col gap-3">
                  {downloadLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      download={link.download}
                      className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-500 hover:text-cyan-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-cyan-300 dark:hover:text-cyan-300"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </section>
            )}
          </aside>
        </div>

        <div className="mt-8">
          <Link
            to="/models"
            className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-500 hover:text-cyan-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-cyan-300 dark:hover:text-cyan-300"
          >
            {'<- Back to all models'}
          </Link>
        </div>
      </Container>
    </PageTransition>
  );
}
