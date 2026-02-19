import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { ThemeProvider } from './context/ThemeContext';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import ModelDetailPage from './pages/ModelDetailPage';
import ModelsPage from './pages/ModelsPage';
import NotFoundPage from './pages/NotFoundPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ProjectsPage from './pages/ProjectsPage';
import ResumePage from './pages/ResumePage';

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:slug" element={<ProjectDetailPage />} />
          <Route path="models" element={<ModelsPage />} />
          <Route path="models/:slug" element={<ModelDetailPage />} />
          <Route path="resume" element={<ResumePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
