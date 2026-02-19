import { useEffect, useState } from 'react';
import Container from '../components/Container';
import PageTransition from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import Toast from '../components/Toast';

const initialForm = {
  name: '',
  email: '',
  message: ''
};

export default function ContactPage() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    if (!toast.show) return;
    const timeoutId = setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 2600);

    return () => clearTimeout(timeoutId);
  }, [toast.show]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = 'Name is required.';
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Please enter a valid email.';
    }

    if (!formData.message.trim()) {
      nextErrors.message = 'Message is required.';
    } else if (formData.message.trim().length < 20) {
      nextErrors.message = 'Message should be at least 20 characters.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) {
      setToast({ show: true, message: 'Please correct the form errors.', type: 'error' });
      return;
    }

    setFormData(initialForm);
    setErrors({});
    setToast({ show: true, message: 'Message sent (demo mode).', type: 'success' });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('luca.netter@example.com');
      setToast({ show: true, message: 'Email copied to clipboard.', type: 'success' });
    } catch (error) {
      setToast({ show: true, message: 'Could not copy email in this browser.', type: 'error' });
    }
  };

  return (
    <PageTransition>
      <Container className="py-14 sm:py-20">
        <SectionHeader
          eyebrow="Get In Touch"
          title="Contact"
          subtitle="Reach out for project collaboration, internships, or engineering discussions."
        />

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <a
            href="mailto:luca.netter@example.com"
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Email</h3>
            <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-200">luca.netter@example.com</p>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">LinkedIn</h3>
            <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-200">linkedin.com</p>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">GitHub</h3>
            <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-200">github.com</p>
          </a>
        </div>

        <button
          type="button"
          onClick={copyEmail}
          className="mb-8 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-500 hover:text-cyan-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-cyan-300 dark:hover:text-cyan-300"
        >
          Copy email
        </button>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900"
        >
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-200">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none ring-cyan-400 transition focus:border-cyan-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
            />
            {errors.name ? <p className="mt-1 text-xs text-red-600 dark:text-red-300">{errors.name}</p> : null}
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-200">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none ring-cyan-400 transition focus:border-cyan-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
            />
            {errors.email ? <p className="mt-1 text-xs text-red-600 dark:text-red-300">{errors.email}</p> : null}
          </div>

          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-200">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none ring-cyan-400 transition focus:border-cyan-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
            />
            {errors.message ? <p className="mt-1 text-xs text-red-600 dark:text-red-300">{errors.message}</p> : null}
          </div>

          <button
            type="submit"
            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-cyan-300"
          >
            Send message
          </button>
        </form>

        <Toast show={toast.show} message={toast.message} type={toast.type} onClose={() => setToast((prev) => ({ ...prev, show: false }))} />
      </Container>
    </PageTransition>
  );
}
