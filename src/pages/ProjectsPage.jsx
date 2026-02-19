import { useMemo, useState } from 'react';
import Container from '../components/Container';
import PageTransition from '../components/PageTransition';
import ProjectCard from '../components/ProjectCard';
import SectionHeader from '../components/SectionHeader';
import TagPill from '../components/TagPill';
import { projects, projectTagOptions } from '../data/projects';

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    setSelectedTags((previous) =>
      previous.includes(tag) ? previous.filter((item) => item !== tag) : [...previous, tag]
    );
  };

  const filteredProjects = useMemo(() => {
    const lowerSearch = searchQuery.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        !lowerSearch ||
        project.title.toLowerCase().includes(lowerSearch) ||
        project.subtitle.toLowerCase().includes(lowerSearch) ||
        project.tags.join(' ').toLowerCase().includes(lowerSearch);

      const matchesTag = selectedTags.length === 0 || selectedTags.some((tag) => project.tags.includes(tag));
      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTags]);

  return (
    <PageTransition>
      <Container className="py-14 sm:py-20">
        <SectionHeader
          eyebrow="Portfolio"
          title="Projects Gallery"
          subtitle="Filter by domain tags and search outcomes to quickly find relevant engineering work."
        />

        <div className="mb-8 space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200" htmlFor="project-search">
            Search projects
          </label>
          <input
            id="project-search"
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by title, subtitle, or tag..."
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none ring-cyan-400 transition focus:border-cyan-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
          />

          <div>
            <p className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-200">Filter tags</p>
            <div className="flex flex-wrap gap-2">
              {projectTagOptions.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  aria-pressed={selectedTags.includes(tag)}
                >
                  <TagPill active={selectedTags.includes(tag)}>{tag}</TagPill>
                </button>
              ))}
            </div>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
            No projects match your current filters.
          </div>
        )}
      </Container>
    </PageTransition>
  );
}
