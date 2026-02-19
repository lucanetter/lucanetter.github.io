# 🚀 GitHub Pages Deployment Guide

## ✅ Pre-Deployment Checklist

Your portfolio is now ready for GitHub Pages! Here's what's been configured:

### Files Created/Updated:
- ✅ `.gitignore` - Excludes node_modules and build files
- ✅ `vite.config.js` - Configured for GitHub Pages
- ✅ `.github/workflows/deploy.yml` - Automatic deployment workflow
- ✅ `README.md` - Comprehensive documentation
- ✅ `package.json` - Updated with metadata

### Build Status:
- ✅ Production build successful
- ✅ Build size: ~1.2MB (includes Three.js for 3D viewer)
- ✅ All 12 models configured and ready
- ✅ All routes working correctly

---

## 📋 Deployment Steps

### Step 1: Initialize Git Repository

```bash
# Navigate to your project
cd "c:\Users\lucan\Downloads\portfolio-website"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Luca Netter Portfolio

- Interactive 3D STL model viewer
- 12 CAD models (Mortise Lock Project + Miscellaneous)
- 5 engineering project showcases
- Dark mode support
- Fully responsive design"
```

### Step 2: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `portfolio-website` (or `YOUR_USERNAME.github.io` for user site)
3. Description: "Luca Netter's Engineering Portfolio - CAD models & projects"
4. Make it **Public**
5. **Do NOT** initialize with README (you already have one)
6. Click **Create repository**

### Step 3: Push to GitHub

```bash
# Add remote repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/portfolio-website.git

# Set main as default branch
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. In the left sidebar, click **Pages**
4. Under **Source**, select **GitHub Actions**
5. Click **Save**

### Step 5: Wait for Deployment

- Go to the **Actions** tab
- You should see a workflow running: "Deploy to GitHub Pages"
- Wait 2-3 minutes for it to complete
- Once done, your site will be live!

### Step 6: Access Your Site

Your portfolio will be available at:

**If repository is named `portfolio-website`:**
```
https://YOUR_USERNAME.github.io/portfolio-website/
```

**If repository is named `YOUR_USERNAME.github.io`:**
```
https://YOUR_USERNAME.github.io/
```

---

## 🔄 Making Updates

After making changes locally:

```bash
# Save your changes
git add .
git commit -m "Description of changes"
git push

# GitHub Actions will automatically rebuild and deploy!
```

---

## 🐛 Troubleshooting

### Build Failing?

**Check Actions Tab:**
1. Go to repository → **Actions** tab
2. Click on the failed workflow
3. Read the error logs

**Common Issues:**

1. **Node version mismatch**
   - Workflow uses Node 20
   - Ensure `package.json` dependencies are compatible

2. **Missing dependencies**
   ```bash
   npm install
   npm run build  # Test locally first
   ```

3. **Path issues**
   - Ensure all imports use relative paths
   - Check that model files exist in `public/models/`

### Page Shows 404?

1. Verify GitHub Pages is enabled (Settings → Pages)
2. Check that **Source** is set to **GitHub Actions**
3. Wait 5-10 minutes after first deployment
4. Clear browser cache (Ctrl+Shift+R)

### Models Not Loading?

1. Ensure STL files are in `public/models/`
2. Check file names match exactly (case-sensitive)
3. Verify `src/data/models.js` has correct paths
4. STL extensions must be lowercase (`.stl` not `.STL`)

### Deployment Not Triggering?

Check `.github/workflows/deploy.yml`:
- Triggers on push to `main` branch
- Ensure you're pushing to `main`, not `master`

```bash
# Check current branch
git branch

# Switch to main if needed
git checkout main
```

---

## 📊 Performance Tips

### Current Build Size:
- **Total**: ~1.2MB (includes Three.js library)
- **Gzipped**: ~340KB

### Future Optimizations:

1. **Enable code splitting** (for larger projects):
   ```javascript
   // Use dynamic imports
   const ModelViewer = lazy(() => import('./components/ModelViewer'));
   ```

2. **Compress STL files** (if needed):
   - Current models: 25-124KB each
   - Consider reducing polygon count for web

3. **Add image thumbnails**:
   - Generate screenshots of 3D models
   - Set in `src/data/models.js` → `thumbnail` field

---

## 📈 Analytics (Optional)

To track visitors, add Google Analytics:

1. Get tracking ID from [analytics.google.com](https://analytics.google.com)
2. Add to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🔐 Custom Domain (Optional)

To use a custom domain (e.g., lucanetter.com):

1. Purchase domain from registrar
2. Add DNS records:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153

   Type: A
   Name: @
   Value: 185.199.109.153

   Type: A
   Name: @
   Value: 185.199.110.153

   Type: A
   Name: @
   Value: 185.199.111.153

   Type: CNAME
   Name: www
   Value: YOUR_USERNAME.github.io
   ```
3. In GitHub: Settings → Pages → Custom domain
4. Enter your domain and save
5. Wait 24-48 hours for DNS propagation

---

## ✅ Success!

Your portfolio is now live and automatically deploys on every push to main!

**Next Steps:**
1. Share your portfolio URL
2. Add more projects as you complete them
3. Update models with new CAD work
4. Customize colors and styling to your preference

---

**Need Help?**
- GitHub Pages Docs: https://docs.github.com/pages
- Vite Docs: https://vitejs.dev
- Three.js Docs: https://threejs.org/docs

**Questions?**
- Check GitHub Discussions in your repository
- Review the Actions logs for detailed error messages
