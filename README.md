# SBI Site - Strategic Bitcoin Intelligence

A Next.js website for the Swiss Bitcoin Institute, providing strategic Bitcoin intelligence for business leaders and executives.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

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

### Publishing Workflow
1. Create content with `published: false`
2. Test locally with `npm run dev`
3. Set `published: true` when ready
4. Push to GitHub for automatic deployment

For detailed instructions, see [CMS-GUIDE.md](./CMS-GUIDE.md).

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

## Technologies Used

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Content**: Markdown with gray-matter
# sbi-deploy
