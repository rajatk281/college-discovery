# College Discovery Platform

A comprehensive platform designed to help users discover, review, and save colleges. Built using modern web technologies, this project provides a robust backend API for managing college information, user authentication, and interactive features like course listings and reviews.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: [Prisma](https://www.prisma.io/) (with `@prisma/adapter-pg`)
- **Authentication**: Custom JWT-based authentication using `jsonwebtoken` and `bcryptjs`
- **Validation**: [Zod](https://zod.dev/)

## 🗄️ Database Schema Overview

The database is built using Prisma with the following core models:

- **User**: Stores user credentials, roles (`USER`, `ADMIN`), and references to saved colleges.
- **College**: Contains detailed information about colleges including location, fees, rating, overview, and placements.
- **Course**: Maps to colleges to list specific courses offered, along with their duration and fees.
- **Review**: Allows users to leave comments and ratings for specific colleges.
- **SavedCollege**: A join table mapping users to their bookmarked/saved colleges.

## 🔌 API Features Implemented

The following REST API endpoints have been implemented under the `/api` directory:

### Authentication APIs (`/api/auth`)
- `POST /api/auth/register`: Registers a new user. Hashes passwords using bcrypt and validates input via Zod.
- `POST /api/auth/login`: Authenticates an existing user and returns a signed JSON Web Token (JWT) valid for 7 days.

### Colleges APIs (`/api/colleges`)
- `GET /api/colleges`: Retrieves a paginated list of colleges. Supports:
  - **Search**: `?search=Name`
  - **Filtering**: `?location=City`, `?minFees=50000`
  - **Sorting**: `?sort=fees_asc` or `?sort=fees_desc`
  - **Pagination**: `?page=1&limit=10`
- `GET /api/colleges/[id]`: Fetches detailed information for a specific college, including its related **courses** and **reviews**.
- `POST /api/colleges/[id]/review`: Allows an authenticated user to submit a rating and comment for a specific college. *(Endpoint file exists, assuming implementation)*
- `POST /api/colleges/[id]/save`: Allows an authenticated user to bookmark/save a specific college to their profile. *(Endpoint file exists, assuming implementation)*

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database

### Installation

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Set up your environment variables:
   Create a `.env` file in the root directory and add the necessary variables:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/college_discovery"
   JWT_SECRET="your_super_secret_jwt_key"
   ```

3. Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```

4. Seed the database (Optional):
   ```bash
   npm run prisma seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The server will start on [http://localhost:3000](http://localhost:3000). You can test the API endpoints using tools like Postman or cURL.
