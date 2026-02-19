export function getProjectNeighbors(projects, slug) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: null, next: null };

  return {
    previous: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null
  };
}

export function getRelatedProjects(projects, slug, limit = 3) {
  const current = projects.find((project) => project.slug === slug);
  if (!current) return [];

  return projects
    .filter((project) => project.slug !== slug)
    .map((project) => {
      const sharedTags = project.tags.filter((tag) => current.tags.includes(tag)).length;
      return { project, sharedTags };
    })
    .filter((entry) => entry.sharedTags > 0)
    .sort((a, b) => b.sharedTags - a.sharedTags)
    .slice(0, limit)
    .map((entry) => entry.project);
}
