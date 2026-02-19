import { Link } from 'react-router-dom';
import Container from '../components/Container';
import PageTransition from '../components/PageTransition';
import ProjectCard from '../components/ProjectCard';
import SectionHeader from '../components/SectionHeader';
import TagPill from '../components/TagPill';
import { projects } from '../data/projects';

const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);

const skills = {
  CAD: ['SolidWorks', 'Onshape', 'GD&T'],
  Simulation: ['FEA', 'Thermal Analysis', 'CFD Basics'],
  Programming: ['Python', 'MATLAB', 'React'],
  Data: ['Pandas', 'Visualization', 'Optimization']
};

const highlights = [
  'Mechanical Engineering student focused on practical design decisions grounded in analysis.',
  'Comfortable moving from CAD concepting to simulation and test-data validation.',
  'Strong interest in building reproducible engineering workflows with code and automation.',
  'Collaborative communicator with experience presenting technical results to mixed audiences.'
];

export default function HomePage() {
  return (
    <PageTransition>
      <section className="relative overflow-hidden border-b border-slate-200 py-16 dark:border-slate-800 sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(6,182,212,0.14),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.12),transparent_35%)]" />
        <Container className="relative">
          <div className="max-w-3xl space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">Engineering Portfolio</p>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl">Luca Netter</h1>
            <p className="text-lg font-medium text-slate-700 dark:text-slate-200">
              Mechanical Engineering | Data-Driven Modeling | CAD &amp; Simulation
            </p>
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
              I design and analyze mechanical systems with a focus on robust performance and clear technical communication.
              My projects blend CAD, simulation, and data workflows to turn uncertain constraints into defensible engineering
              decisions. This portfolio highlights both the process and the measurable outcomes.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/projects"
                className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-cyan-300"
              >
                View Projects
              </Link>
              <Link
                to="/models"
                className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-cyan-500 hover:text-cyan-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-cyan-300 dark:hover:text-cyan-300"
              >
                View Models
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <SectionHeader
          eyebrow="Highlights"
          title="Featured Projects"
          subtitle="Selected engineering work spanning structural design, simulation, and data-driven modeling."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>

      <section className="border-y border-slate-200 bg-white/70 py-12 dark:border-slate-800 dark:bg-slate-900/40">
        <Container>
          <SectionHeader
            eyebrow="Capabilities"
            title="Skills"
            subtitle="Core technical skills grouped by workflow area."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group} className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">{group}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <TagPill key={item}>{item}</TagPill>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Container className="grid gap-8 py-16 lg:grid-cols-2 lg:items-start">
        <section>
          <SectionHeader eyebrow="About" title="Engineering Mindset" />
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
            {highlights.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-2 w-2 flex-none rounded-full bg-cyan-500 dark:bg-cyan-300" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <aside className="rounded-2xl border border-slate-200 bg-gradient-to-br from-cyan-500 to-sky-600 p-8 text-white shadow-soft dark:border-slate-700">
          <h3 className="text-2xl font-bold">Resume</h3>
          <p className="mt-3 text-sm text-cyan-50">
            Download a concise summary of coursework, project outcomes, and technical tooling.
          </p>
          <Link
            to="/resume"
            className="mt-5 inline-flex rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Download Resume
          </Link>
        </aside>
      </Container>
    </PageTransition>
  );
}
