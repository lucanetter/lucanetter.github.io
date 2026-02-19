import { useMemo, useState, useCallback } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import Container from '../components/Container';
import PageTransition from '../components/PageTransition';
import ProjectCard from '../components/ProjectCard';
import SectionHeader from '../components/SectionHeader';
import TagPill from '../components/TagPill';
import { projects } from '../data/projects';
import { getProjectNeighbors, getRelatedProjects } from '../utils/projectHelpers';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  const [imageError, setImageError] = useState(false);
  const images = project?.images || (project?.thumbnail ? [project.thumbnail] : []);
  const [activeImage, setActiveImage] = useState(0);
  const handlePrev = useCallback(() => setActiveImage((i) => (i - 1 + images.length) % images.length), [images.length]);
  const handleNext = useCallback(() => setActiveImage((i) => (i + 1) % images.length), [images.length]);

  const { previous, next } = useMemo(() => getProjectNeighbors(projects, slug), [slug]);
  const relatedProjects = useMemo(() => getRelatedProjects(projects, slug, 3), [slug]);

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  return (
    <PageTransition>
      <Container className="py-12 sm:py-16">
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Projects', to: '/projects' },
            { label: project.title }
          ]}
        />

        <header className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-600 dark:text-cyan-300">{project.date}</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">{project.title}</h1>
          <p className="max-w-3xl text-base text-slate-600 dark:text-slate-300">{project.subtitle}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <TagPill key={tag}>{tag}</TagPill>
            ))}
          </div>
          {imageError || images.length === 0 ? (
            <div className="h-72 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700" />
          ) : (
            <div className="relative">
              <img
                src={images[activeImage]}
                alt={`${project.title} screenshot ${activeImage + 1}`}
                className="h-72 w-full rounded-2xl object-cover"
                onError={() => setImageError(true)}
              />
              {images.length > 1 && (
                <>
                  <button onClick={handlePrev} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-1.5 text-white hover:bg-black/60">‹</button>
                  <button onClick={handleNext} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-1.5 text-white hover:bg-black/60">›</button>
                  <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                    {images.map((_, i) => (
                      <button key={i} onClick={() => setActiveImage(i)} className={`h-2 w-2 rounded-full ${i === activeImage ? 'bg-white' : 'bg-white/40'}`} />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </header>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <SectionHeader title="Overview" />
            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
              <p>
                <span className="font-semibold text-slate-900 dark:text-slate-100">Problem:</span> {project.sections.overview.problem}
              </p>
              <p>
                <span className="font-semibold text-slate-900 dark:text-slate-100">Goal:</span> {project.sections.overview.goal}
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <SectionHeader title="Approach" />
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Steps</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
              {project.sections.approach.steps.map((step) => (
                <li key={step} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 flex-none rounded-full bg-cyan-500 dark:bg-cyan-300" aria-hidden />
                  <span>{step}</span>
                </li>
              ))}
            </ul>

            <h3 className="mb-2 mt-5 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Assumptions</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
              {project.sections.approach.assumptions.map((assumption) => (
                <li key={assumption} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 flex-none rounded-full bg-slate-400 dark:bg-slate-500" aria-hidden />
                  <span>{assumption}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <SectionHeader title="Technical Breakdown" />
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
              {project.sections.technicalBreakdown.bullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 flex-none rounded-full bg-cyan-500 dark:bg-cyan-300" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {project.sections.technicalBreakdown.formulas.length > 0 && (
              <div className="mt-4 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">
                {project.sections.technicalBreakdown.formulas.map((formula) => (
                  <code key={formula} className="block">
                    {formula}
                  </code>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <SectionHeader title="Results" />
            <p className="text-sm text-slate-600 dark:text-slate-300 sm:text-base">{project.sections.results.summary}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {project.sections.results.metrics.map((metric) => (
                <div key={metric.label} className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950">
                  <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">{metric.label}</p>
                  <p className="mt-1 text-base font-bold text-slate-900 dark:text-slate-100">{metric.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {project.sections.results.plots.map((plot) => (
                <div
                  key={plot}
                  className="rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400"
                >
                  {plot}
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <SectionHeader title="Tools Used" />
          <div className="flex flex-wrap gap-2">
            {project.sections.tools.map((tool) => (
              <TagPill key={tool}>{tool}</TagPill>
            ))}
          </div>
        </section>

        {(project.links.github || project.links.report || project.links.video) && (
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <SectionHeader title="Links" />
            <div className="flex flex-wrap gap-3">
              {project.links.github && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-cyan-500 hover:text-cyan-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-cyan-300 dark:hover:text-cyan-300">
                  GitHub
                </a>
              )}
              {project.links.report && (
                <a href={project.links.report} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-cyan-500 hover:text-cyan-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-cyan-300 dark:hover:text-cyan-300">
                  Slideshow PDF
                </a>
              )}
              {project.links.video && (
                <a href={project.links.video} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-cyan-500 hover:text-cyan-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-cyan-300 dark:hover:text-cyan-300">
                  Demo Video
                </a>
              )}
            </div>
          </section>
        )}

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Previous Project</p>
            {previous ? (
              <Link className="mt-2 inline-block text-base font-semibold text-slate-900 hover:text-cyan-600 dark:text-slate-100 dark:hover:text-cyan-300" to={`/projects/${previous.slug}`}>
                {previous.title}
              </Link>
            ) : (
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">No previous project.</p>
            )}
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Next Project</p>
            {next ? (
              <Link className="mt-2 inline-block text-base font-semibold text-slate-900 hover:text-cyan-600 dark:text-slate-100 dark:hover:text-cyan-300" to={`/projects/${next.slug}`}>
                {next.title}
              </Link>
            ) : (
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">No next project.</p>
            )}
          </div>
        </section>

        <section className="mt-10">
          <SectionHeader title="Related Projects" subtitle="Projects that share similar technical tags." />
          {relatedProjects.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedProjects.map((relatedProject) => (
                <ProjectCard key={relatedProject.slug} project={relatedProject} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-400">
              No related projects found.
            </div>
          )}
        </section>
      </Container>
    </PageTransition>
  );
}
