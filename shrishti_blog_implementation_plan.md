# Implementation Plan — Shrishti Realty Blog System & CMS Admin Panel

Architecting a full-featured Blog System and CMS Admin Panel for Shrishti Realty inspired by GlimmoraWebsite, styled with Shrishti Realty's luxury dark green & gold design system.

---

## 🏗️ System Architecture & Workflow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          SHRISHTI REALTY CMS FLOW                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [ Admin Dashboard / Editor ]  ──(HTTP POST/GET)──>  [ Vercel API Endpoint ]│
│         /admin/new                                      api/admin.mjs       │
│         /admin/edit/:slug                                                   │
│                                                                  │          │
│                                                            (GitHub API)     │
│                                                                  ▼          │
│  [ Public Blog Pages ]         <──(Fetch Static JSON)──  [ GitHub Repo ]    │
│         /blog                                      public/content/blog-index│
│         /blog/:slug                                public/content/blogs/*.json
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Design System Integration (Shrishti Realty Theme)

All blog cards, detail views, and admin dashboard interfaces will follow Shrishti Realty's core design tokens:
- **Primary Color**: `#0b1a0b` / `#0f1f16` (Deep Emerald Dark Green)
- **Accent Color**: `#c9a84c` / `#d4af37` (Gold / Luxury Gold)
- **Backgrounds**: `#f6f4f0` (Warm Cream / Alabaster), `#f0ece6` (Light Cream), `#0a0e0b` (Dark Luxury)
- **Typography**: `font-display` (Playfair Display serif) for headings, `font-sans` (Inter) for body
- **Accents**: Gold diamond separators, subtle card glows (`card-glow`), gold border accents, glassmorphism badges

---

## 📁 Components & Files to Create

### 1. Backend API Endpoint
- **`api/admin.mjs`** [NEW]: Serverless ES Module endpoint supporting actions:
  - `login`: Admin authentication via JWT
  - `blogs`: Fetch blog index
  - `blog`: Fetch specific blog content
  - `publish`: Publish/update blog post (saves to `public/content/blogs/{slug}.json` and updates `public/content/blog-index.json` via GitHub API or local file fallback)
  - `delete`: Delete blog post and update index
  - `upload`: Upload cover images / inline photos to `public/blog-images/`
  - `send-otp` & `change-password`: Security credentials management

### 2. Dependencies
- Install required packages: `jsonwebtoken`, `bcryptjs`, `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-image`, `@tiptap/extension-link`, `@tiptap/extension-underline`

### 3. Public Blog Pages
- **`src/pages/Blog.jsx`** [NEW]: Blog listing page with search, tag filtering, luxury featured blog hero, blog cards with share buttons, pagination.
- **`src/pages/BlogPost.jsx`** [NEW]: Blog post detail page with full article rendering, table of contents, author profile, share buttons (LinkedIn, WhatsApp, X, Copy link), related luxury posts, and lead CTA.
- **`public/content/blog-index.json`** [NEW]: Pre-populated initial index with luxury real estate & interior design articles.
- **`public/content/blogs/*.json`** [NEW]: Pre-populated initial sample blogs for immediate out-of-the-box local testing.

### 4. Admin Panel & CMS Pages (`/admin/*`)
- **`src/components/admin/AdminRoute.jsx`** [NEW]: Auth guard checking JWT token in `localStorage` (`shrishti_admin_token`).
- **`src/components/admin/AdminLayout.jsx`** [NEW]: Branded dark green & gold admin header, navigation bar, and user session menu.
- **`src/components/admin/RichTextEditor.jsx`** [NEW]: Tiptap-powered rich text editor formatted with Shrishti Realty typography and custom image upload handler.
- **`src/pages/admin/Login.jsx`** [NEW]: Sleek luxury admin login interface.
- **`src/pages/admin/Dashboard.jsx`** [NEW]: Admin dashboard showing list of articles, draft/published filter, quick actions (Create, Edit, Delete, Preview).
- **`src/pages/admin/BlogEditor.jsx`** [NEW]: Full blog editor with Title, Slug auto-generation, Excerpt, Cover Image upload, Author, Category/Tags, Meta Title/Description, and Rich Text/HTML toggle.
- **`src/pages/admin/Settings.jsx`** [NEW]: Admin settings for updating username/password with OTP.

### 5. Routing Updates
- **`src/App.jsx`** [MODIFY]: Add routes for `/blog`, `/blog/:slug`, `/admin/login`, `/admin`, `/admin/new`, `/admin/edit/:slug`, `/admin/settings`.
- **`src/components/Navbar.jsx`** [MODIFY]: Add "Blog" to the primary navigation bar.
- **`src/components/Footer.jsx`** [MODIFY]: Add "Blog" link under Quick Links.

---

## 🔒 Security & Environment Variables

Required environment variables in Vercel (documented in `.env.example`):
- `JWT_SECRET` (Strong secret key for JWT signing)
- `ADMIN_USERNAME` (Default: `admin`)
- `ADMIN_PASSWORD` (Default: `Shrishti@2026`)
- `GITHUB_TOKEN` (GitHub Personal Access Token for auto-committing published blogs to repo)
- `GITHUB_REPO` (Repo path e.g. `shrishtirealty/ShrishtiRealty-Website`)
- `GITHUB_BRANCH` (Default: `vaigai` or `main`)

---

## 🛠️ Implementation & Verification Steps

1. **Install Dependencies**: Install `jsonwebtoken`, `bcryptjs`, and `@tiptap/*` packages.
2. **Create API Endpoint**: Build `api/admin.mjs` with full fallback support for dev mode.
3. **Build Sample Content**: Create initial `blog-index.json` and sample blog posts in `public/content/`.
4. **Create Public Pages**: Build `Blog.jsx` and `BlogPost.jsx` styled with Shrishti Realty luxury dark-green & gold theme.
5. **Build Admin CMS**: Implement `Login.jsx`, `Dashboard.jsx`, `BlogEditor.jsx`, `RichTextEditor.jsx`, `Settings.jsx`, and `AdminLayout.jsx`.
6. **Update Navigation**: Add Blog link to `Navbar.jsx`, `Footer.jsx`, and register all routes in `App.jsx`.
7. **Verification**: Run `npm run build` to ensure zero compilation errors and test routing/rendering.

---

## User Approval Required

> [!IMPORTANT]
> Please review the implementation plan above. Once approved, click **Proceed** or let me know if you would like any specific adjustments to the blog feature set or administrative controls!
