# SBI Site - Strategic Bitcoin Intelligence

A Next.js website for the Swiss Bitcoin Institute, providing strategic Bitcoin intelligence for business leaders and executives.

## Getting Started

### 1. Install Dependencies

```bash
npm install
# or
bun install
```

### 2. Start Local Database

Ensure Docker is running, then start Supabase:

```bash
supabase start
```

This starts PostgreSQL and all Supabase services. Copy the `service_role key` from the output.

> **First time?** Install the CLI with `brew install supabase/tap/supabase` or `npm install -g supabase`

### 3. Configure Environment

Create `.env.local` in the project root:

```bash
# Supabase (from supabase start output)
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-from-above

# Optional: for email/newsletter features
RESEND_API_KEY=re_xxxxxxxxxxxx
MAILERLITE_API_KEY=your-mailerlite-key
```

### 4. Run Development Server

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Quick Reference

| Service | URL |
|---------|-----|
| Website | http://localhost:3000 |
| Supabase Studio | http://127.0.0.1:54323 |
| Supabase API | http://127.0.0.1:54321 |

## Content Management System

The SBI site uses a **file-based CMS** where content is managed through markdown files. This provides version control, automatic deployment, and team collaboration through GitHub.

### Quick Start - Adding Content

#### Create a New Article
```bash
npm run new:article "Article Title" author-id

# Example:
npm run new:article "Bitcoin Mining in Switzerland" marcus-dapp
```

#### Create a New Author
```bash
npm run new:author "Full Name" "Role" "email@example.com"

# Example:
npm run new:author "Jane Doe" "Senior Researcher" "jane@example.com"
```

### Content Structure
- **Articles**: `src/content/articles/` - Research articles and blog posts
- **Authors**: `src/content/authors/` - Author profiles and bios
- **Templates**: `templates/` - Templates for new content
- **Header Images**: `public/sbi-research-headers/` - Article header images

### Publishing Workflow
1. Create content with `published: false`
2. Test locally with `npm run dev`
3. Set `published: true` when ready
4. Push to GitHub for automatic deployment

For detailed instructions, see [CMS-GUIDE.md](./CMS-GUIDE.md).

## Configurable Content

### Course Schedules

Update course offerings in `src/lib/courses.ts`:

```typescript
export const bitcoinForExecutivesCourses: CourseOffering[] = [
  {
    id: "bfe-feb-2026",
    timeDescription: "4 afternoons (14-17h)",
    dates: ["12th February", "19th February", "26th February", "5th March 2026"]
  },
  // Add new cohort:
  {
    id: "bfe-may-2026",
    timeDescription: "4 afternoons (14-17h)",
    dates: ["6th May", "13th May", "20th May", "27th May 2026"]
  }
];
```

### Email Templates

Update confirmation and notification emails in `src/lib/emails.ts`:

- `SERVICE_EMAIL_CONTENT` - Customer confirmation messages per service type
- `getContactTeamNotificationEmail()` - Team notification for contact form
- `getContactCustomerConfirmationEmail()` - Customer confirmation for contact form
- `getInquiryTeamNotificationEmail()` - Team notification for inquiry forms
- `getInquiryCustomerConfirmationEmail()` - Customer confirmation for inquiries

## Project Structure

- `src/app/` - Next.js app directory with routing
- `src/components/` - Reusable UI components
- `src/pages/` - Page components
- `src/content/` - Content files (articles, authors)
- `src/lib/` - Utility functions and configurations

## Features

- **Strategic Intelligence**: Research and analysis on Bitcoin adoption
- **Executive Education**: Programs for business leaders
- **Team Expertise**: World-class Bitcoin researchers and practitioners
- **Modern UI**: Built with Next.js, TypeScript, and Tailwind CSS

## Build

```bash
npm run build
# or
yarn build
# or
bun build
```

## Start Production Server

```bash
npm start
# or
yarn start
# or
bun start
```

## Supabase Setup

This project uses Supabase for database storage. You can run Supabase locally for development.

### Prerequisites

Install the Supabase CLI:

```bash
# macOS
brew install supabase/tap/supabase

# npm
npm install -g supabase

# Or via npx (no install needed)
npx supabase --version
```

Ensure Docker is running (required for local Supabase).

### Start Local Supabase

```bash
# Start all Supabase services (Postgres, Auth, Storage, etc.)
supabase start

# This will output your local credentials:
# API URL: http://127.0.0.1:54321
# anon key: eyJ...
# service_role key: eyJ...
```

### Database Migrations

Migrations are stored in `supabase/migrations/` and run automatically on `supabase start`.

```bash
# Apply migrations to local database
supabase db reset

# Create a new migration
supabase migration new your_migration_name

# Push migrations to production (requires linking)
supabase db push
```

### Stop Supabase

```bash
# Stop and preserve data
supabase stop

# Stop and delete all data
supabase stop --no-backup
```

### Supabase Studio

Access the local database UI at [http://127.0.0.1:54323](http://127.0.0.1:54323) when Supabase is running.

## Environment Variables

Create a `.env.local` file in the project root:

```bash
# Supabase (get these from `supabase start` output or Supabase dashboard)
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Email - Resend (https://resend.com)
RESEND_API_KEY=re_xxxxxxxxxxxx

# Newsletter - MailerLite (https://www.mailerlite.com)
MAILERLITE_API_KEY=your-mailerlite-api-key
```

### Getting Dev API Keys

#### Supabase (Local Development)
Run `supabase start` and copy the credentials from the output. For production, create a project at [supabase.com](https://supabase.com) and get keys from Project Settings > API.

#### Resend (Email)
1. Sign up at [resend.com](https://resend.com)
2. Go to API Keys and create a new key
3. Free tier includes 100 emails/day (dev) or 3,000/month

#### MailerLite (Newsletter)
1. Sign up at [mailerlite.com](https://www.mailerlite.com)
2. Go to Integrations > API
3. Generate a new API token

### Production Environment

For production deployment, set these in your hosting provider (Vercel, etc.):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-production-service-role-key
RESEND_API_KEY=your-production-resend-key
MAILERLITE_API_KEY=your-production-mailerlite-key
```

## Technologies Used

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Content**: Markdown with gray-matter
- **Database**: Supabase (PostgreSQL)
- **Email**: Resend
- **Newsletter**: MailerLite
