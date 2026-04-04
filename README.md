## Content Management System

The SBI site uses a **file-based CMS** where content is managed through markdown files. This provides version control, automatic deployment, and team collaboration through GitHub.

### Quick Start - Adding Content

#### Create a New Article
To create a new intelligence brief, run the following command in the **project root** terminal:
```bash
npm run new:article "Article Title" author-id

# Example:
npm run new:article "Bitcoin Mining in Switzerland" marcus-dapp
```
*Note: This script automatically generates the next SBI ID, sets the date, and populates basic metadata.*

#### Create a New Author
```bash
npm run new:author "Full Name" "Role" "email@example.com"

# Example:
npm run new:author "Jane Doe" "Senior Researcher" "jane@example.com"
```

### Detailed Article Publishing Guide

#### 1. File Locations (Where does everything go?)
- **Markdown File**: Created at `src/content/articles/SBI-XXX.md`.
- **Header Image**: Place in `public/sbi-research-headers/`. Preferred format is `.webp`.
- **Article Figures**: Place in `public/sbi-intelligence-brief-figures/SBI-XXX/` and reference in markdown.

#### 2. YAML Frontmatter (Manual vs. Automatic)
When you run `npm run new:article`, the following is handled:
- **Automatic**: `id`, `title`, `author`, `date`, `published: false`.
- **Manual (Author Action Required)**:
  - `blockHeight`: Must be updated to the current Bitcoin block height.
  - `excerpt`: Provide a 1-2 sentence summary for SEO and index pages.
  - `tags`: Update the categories (e.g., `["Technology", "Swiss Context"]`).
  - `headerImage`: Add the filename of your image from `public/sbi-research-headers/`.
  - `readTime`: (Optional) Can be manually set or left for the system to estimate.

#### 3. Publishing Workflow
1. Create the article via the npm command.
2. Add your markdown content and images.
3. Preview locally by running `npm run dev` at [localhost:3000](http://localhost:3000).
4. **Glossary Audit**: Manually check the rendered article for any glossary links that should be excluded (e.g., terms used in a non-Bitcoin context). Use `<!-- no-glossary -->` tags or update `ARTICLE_GLOSSARY_EXCLUSIONS` as needed (see Glossary Management).
5. Set `published: true` in the frontmatter once finalized.
6. Push your changes to the `main` branch to trigger the production deployment.

### Content Structure
- **Articles**: `src/content/articles/` - The `.md` content files.
- **Authors**: `src/content/authors/` - Author profiles/biographies.
- **Templates**: `templates/` - Base files used by the creation scripts.
- **Header Images**: `public/sbi-research-headers/` - Banner images for articles.
- **Figures**: `public/sbi-intelligence-brief-figures/` - Diagrams and charts used inside articles.

### Glossary Management

The website automatically parses articles and links terms that exist in the [Glossary](src/content/glossary/).

#### Disabling Glossary Links
If you want to prevent certain terms from being linked in specific contexts, use one of the following methods:

**1. Manual Toggle Tags**  
Wrap any section of text with HTML comments to disable/enable linking:
```markdown
<!-- no-glossary -->
Text in this section will NOT have any glossary terms linked.
<!-- end-no-glossary -->
```
Also inline disable is possible:
#Example
```
The Gold Coast of Ghana faces the need to import drinking water, as rivers are poisoned by gold <!-- no-glossary -->mining<!-- end-no-glossary -->.
```

**2. Automatic Code Block Skipping**  
Any text inside triple backticks (```) is automatically ignored.

**3. Reference Section Exclusion**  
Any content appearing after a heading that contains the word "References" (e.g., `### References`) will not be processed for glossary links.

**4. Article-Specific Exclusions**  
To exclude specific terms for an entire article (e.g., when "mining" refers to gold mining), edit the `ARTICLE_GLOSSARY_EXCLUSIONS` constant in [ArticleWithGlossary.tsx](src/components/articles/ArticleWithGlossary.tsx).

> [!IMPORTANT]
> You must use the **term slug** (e.g., `gold-standard`) in this configuration, not the display name.

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

### Next Event Popup

The next event popup on the site is configured in `src/config/NextEvent-config.json`. 

```json
{
  "alerts": [
    {
      "id": "unique-id",
      "startDate": "YYYY-MM-DD",
      "endDate": "YYYY-MM-DD",
      "alertText": "Banner message text",
      "buttonText": "Button label",
      "buttonLink": "/destination-url",
      "isActive": true
    }
  ]
}
```

- **id**: A unique identifier for the alert.
- **startDate / endDate**: The banner will only appear between these dates (inclusive).
- **alertText**: The main message displayed in the banner.
- **buttonText**: The text shown on the call-to-action button.
- **buttonLink**: The internal or external link for the button.
- **isActive**: Set to `true` to enable the alert, or `false` to disable it regardless of the dates.

It is possible to add multiple events. The first event meeting the criteria for getting displayed will be displayed. The banner automatically handles height adjustments for the header and main content.

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
