# Luca Netter - Engineering Portfolio

A modern, interactive portfolio website showcasing CAD models and engineering projects. Built with React, Three.js, and Tailwind CSS.

## 🌟 Features

- ✨ Interactive 3D model viewer powered by Three.js
- 🎨 Modern, responsive design with dark mode support
- 📐 12 CAD models organized by project category
- 🔧 Mortise Lock reverse engineering project showcase
- 📱 Fully responsive across all devices
- ⚡ Fast performance with Vite
- 🎯 Ready for GitHub Pages deployment

## 🛠️ Tech Stack

- **Framework**: React 18
- **3D Rendering**: Three.js + React Three Fiber + Drei
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Deployment**: GitHub Pages

## 📁 Project Structure

```
portfolio-website/
├── public/
│   └── models/          # STL 3D model files
├── src/
│   ├── components/      # Reusable React components
│   ├── context/         # React context (theme)
│   ├── data/            # Project and model data
│   ├── pages/           # Page components
│   └── utils/           # Utility functions
├── .github/
│   └── workflows/       # GitHub Actions for deployment
└── dist/                # Production build (generated)
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/portfolio-website.git
cd portfolio-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run clean` - Remove build artifacts

## 📦 Deployment to GitHub Pages

### Automatic Deployment (Recommended)

This project includes GitHub Actions for automatic deployment.

#### Step 1: Create GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit: Luca Netter Portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio-website.git
git push -u origin main
```

#### Step 2: Configure GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**

#### Step 3: Deploy!

- Push to `main` branch triggers automatic deployment
- Monitor progress in the **Actions** tab
- Site goes live at: `https://YOUR_USERNAME.github.io/portfolio-website/`

### Manual Deployment

For manual deployment to any hosting provider:

```bash
npm run build
# Upload the dist/ folder to your hosting provider
```

## 🎨 Customization

### Adding New 3D Models

1. **Export from SOLIDWORKS** as `.stl` (Binary format)
2. **Rename to lowercase** extension (e.g., `MyPart.STL` → `MyPart.stl`)
3. **Place in** `public/models/`
4. **Add entry** to `src/data/models.js`:

```javascript
{
  slug: 'my-model',
  name: 'My Model Name',
  description: 'Description of the model',
  category: 'Mortise Lock Project', // or 'Miscellaneous & Practice'
  tags: ['CAD', 'STL', 'Reverse Engineering'],
  thumbnail: null,
  fileUrl: '/models/MyPart.stl',
  designConstraints: [],
  tools: ['SOLIDWORKS'],
  downloads: {
    stl: '/models/MyPart.stl',
    step: null,
    pdf: null
  }
}
```

### Adding New Projects

Edit `src/data/projects.js` to add project showcases:

```javascript
{
  slug: 'project-slug',
  title: 'Project Title',
  subtitle: 'One-line description',
  date: '2026-02-19',
  tags: ['CAD', 'Simulation', 'Python'],
  featured: true,
  thumbnail: '/images/project-thumbnail.jpg',
  sections: {
    overview: { problem: '...', goal: '...' },
    approach: { steps: [...], assumptions: [...] },
    technicalBreakdown: { bullets: [...], formulas: [...] },
    results: { summary: '...', metrics: [...] },
    tools: ['SOLIDWORKS', 'Python']
  }
}
```

### Theme Colors

Edit `tailwind.config.js` to customize colors:

```javascript
theme: {
  extend: {
    colors: {
      // Add your custom colors here
    }
  }
}
```

### 3D Viewer Settings

Modify `src/components/ModelViewer.jsx`:

- **Scale factor**: Line 90 (currently 4.0)
- **Camera position**: Line 126
- **Material color**: Line 62 (`#00d4ff`)
- **Lighting**: Lines 133-134

## 🌐 Browser Support

- Chrome/Edge (latest 2 versions) ✅
- Firefox (latest 2 versions) ✅
- Safari (latest 2 versions) ✅

## 📝 Content Guide

### Current Models (12 total)

**Mortise Lock Project** (5 models):
- Parts 1, 3, 4, 8, Pivot Arm

**Miscellaneous & Practice** (7 models):
- Homework 2, Model 17, MPD 160, MPD 187, PP4-6, PP6-1, PP6-4

### Current Projects (5 total)

1. Adaptive Suspension Upright Optimization
2. Heat Spreader Topology Study
3. Data-Driven Fatigue Monitoring Pipeline
4. Portfolio Risk Engineering Dashboard
5. Truss Load Path Optimizer

## 🐛 Troubleshooting

### Models not displaying?

- Ensure STL files are in `public/models/`
- Check that file extensions are lowercase (`.stl` not `.STL`)
- Verify fileUrl paths in `src/data/models.js`

### Build fails?

```bash
# Clean and rebuild
npm run clean
rm -rf node_modules package-lock.json
npm install
npm run build
```

### GitHub Pages not deploying?

- Verify **Settings** → **Pages** → **Source** is set to "GitHub Actions"
- Check **Actions** tab for error logs
- Ensure repository is public or has GitHub Pages enabled

## 📄 License

© 2026 Luca Netter. All rights reserved.

## 📧 Contact

For questions or collaboration opportunities, visit the contact page on the website.

---

**Built with ❤️ using React, Three.js, and Tailwind CSS**
