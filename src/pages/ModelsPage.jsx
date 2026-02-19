import Container from '../components/Container';
import ModelCard from '../components/ModelCard';
import PageTransition from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import { models } from '../data/models';

export default function ModelsPage() {
  // Group models by category
  const modelsByCategory = models.reduce((acc, model) => {
    const category = model.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(model);
    return acc;
  }, {});

  const categories = Object.keys(modelsByCategory).sort();

  return (
    <PageTransition>
      <Container className="py-14 sm:py-20">
        <SectionHeader
          eyebrow="3D Library"
          title="Models Gallery"
          subtitle="Browse CAD models and open them in the interactive in-browser viewer."
        />

        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-50">
              {category}
            </h2>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {modelsByCategory[category].map((model) => (
                <ModelCard key={model.slug} model={model} />
              ))}
            </div>
          </div>
        ))}
      </Container>
    </PageTransition>
  );
}
