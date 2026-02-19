import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import TagPill from './TagPill';

export default function ModelCard({ model }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="flex h-full flex-col gap-4">
      {imageError || !model.thumbnail ? (
        <div className="flex h-40 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-slate-600 dark:text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <p className="mt-2 text-xs font-semibold text-slate-600 dark:text-slate-400">3D Model</p>
          </div>
        </div>
      ) : (
        <img
          src={model.thumbnail}
          alt={`${model.name} thumbnail`}
          className="h-40 w-full rounded-xl object-cover"
          onError={() => setImageError(true)}
          loading="lazy"
        />
      )}
      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{model.name}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-300">{model.description}</p>
      <div className="flex flex-wrap gap-2">
        {model.tags.map((tag) => (
          <TagPill key={tag}>{tag}</TagPill>
        ))}
      </div>
      <Link
        to={`/models/${model.slug}`}
        className="mt-auto inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-cyan-300"
      >
        Open Viewer
      </Link>
    </Card>
  );
}
