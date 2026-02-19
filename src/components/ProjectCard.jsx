import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import TagPill from './TagPill';

export default function ProjectCard({ project }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="group flex h-full flex-col gap-4">
      {imageError || !project.thumbnail ? (
        <div className="h-40 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700" />
      ) : (
        <img
          src={project.thumbnail}
          alt={`${project.title} thumbnail`}
          className="h-40 w-full rounded-xl object-cover"
          onError={() => setImageError(true)}
          loading="lazy"
        />
      )}

      <div className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{project.title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">{project.sections.results?.summary || project.subtitle}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <TagPill key={tag}>{tag}</TagPill>
          ))}
        </div>
      </div>

      <Link
        to={`/projects/${project.slug}`}
        className="mt-auto inline-flex w-fit items-center gap-2 text-sm font-semibold text-cyan-700 transition group-hover:gap-3 dark:text-cyan-300"
      >
        Read more
        <span aria-hidden>→</span>
      </Link>
    </Card>
  );
}
