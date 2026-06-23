# College Discovery Platform

A comprehensive platform to discover, compare, review, and save colleges across India. Features a warm cinematic dark UI built with modern web technologies.

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | TypeScript |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Database** | PostgreSQL (Neon) |
| **ORM** | [Prisma 7](https://www.prisma.io/) with `@prisma/adapter-pg` |
| **Auth** | Custom JWT (jsonwebtoken + bcryptjs) |
| **Validation** | [Zod](https://zod.dev/) |
| **HTTP Client** | [Axios](https://axios-http.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Notifications** | [React Hot Toast](https://react-hot-toast.com/) |
| **Font** | [Poppins](https://fonts.google.com/specimen/Poppins) (Google Fonts) |

## 🎨 Design System

The UI follows a **warm, cinematic dark theme** with:

- **Background**: `#0F0F0F` / Surface: `#171717` / Cards: `#1E1E1E`
- **Accent**: Warm Amber `#F59E0B`
- **Typography**: Poppins (weights 300–700)
- **Border Radius**: 10px on cards, buttons, inputs
- **Animations**: Fade-in, slide-down, soft pulse for skeletons

## 📄 Pages

### 1. Home — College Listing (`/`)
- Search bar with 300ms debounce
- Filter panel: Location (dropdown), Min/Max Fees, Sort (fees asc/desc, rating)
- Responsive card grid (1 col mobile → 3 col desktop)
- Pagination with page numbers
- Save/Unsave toggle (authenticated users)
- Loading skeleton & empty state

### 2. College Detail (`/college/[id]`)
- Hero banner with image, name, location, rating
- Overview section
- Key info grid: Fees, Rating, Placements, Courses count
- Course cards listing
- Reviews section with all reviews listed
- Add Review form with interactive star rating (authenticated)
- Save/Unsave button

### 3. Compare Colleges (`/compare`)
- Search-to-add selector (up to 3 colleges)
- Side-by-side comparison table: Location, Fees, Rating, Placements
- Remove college from comparison
- Horizontally scrollable on mobile

### 4. Login (`/login`)
- Email & Password fields with validation
- Show/Hide password toggle
- Remember me checkbox
- Redirects to home on success
- Link to Register

### 5. Register (`/register`)
- Name, Email, Password fields with validation
- Show/Hide password toggle
- Redirects to login on success
- Link to Login

### 6. Saved Colleges (`/saved`)
- Protected route (redirects to `/login` if not authenticated)
- Grid of saved college cards with remove option
- Empty state with CTA to browse colleges

## 🗄️ Database Schema

| Model | Description |
|-------|-------------|
| **User** | Credentials, role (`USER`/`ADMIN`), saved colleges |
| **College** | Name, location, fees, rating, overview, placements, image |
| **Course** | Course name, duration, fees — belongs to College |
| **Review** | Comment, rating, user name — belongs to College |
| **SavedCollege** | Join table — User ↔ College (unique per pair) |

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register new user (name, email, password) |
| `POST` | `/api/auth/login` | Login → returns JWT (7-day expiry) |

### Colleges
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/colleges` | List colleges (search, location, minFees, maxFees, sort, pagination) |
| `GET` | `/api/colleges/[id]` | Get college detail with courses & reviews |
| `POST` | `/api/colleges/[id]/review` | Add a review (🔒 auth required) |
| `POST` | `/api/colleges/[id]/save` | Save a college (🔒 auth required) |
| `DELETE` | `/api/colleges/[id]/save` | Unsave a college (🔒 auth required) |

### Saved
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/saved` | Get all saved colleges for user (🔒 auth required) |

## 🧩 Components

| Component | Purpose |
|-----------|---------|
| `Navbar` | Sticky nav with logo, links, auth buttons, mobile hamburger |
| `Footer` | Minimal footer with copyright |
| `CollegeCard` | College preview card with image, rating, save button |
| `SearchInput` | Debounced search with clear button |
| `FilterBar` | Dropdown panel with location, fees, sort filters |
| `ReviewCard` | Review with avatar, stars, comment, date |
| `CourseCard` | Course row with name, duration, fees |
| `ComparisonTable` | Side-by-side college comparison |
| `Pagination` | Page numbers with prev/next |
| `LoaderSkeleton` | Animated skeleton loaders (card grid, detail) |
| `EmptyState` | Icon + message + optional CTA |

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in DATABASE_URL and JWT_SECRET

# Run Prisma migrations
npx prisma migrate dev

# Seed the database (optional)
npx prisma db seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret key for JWT signing |
