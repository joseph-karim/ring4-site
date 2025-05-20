[![CodeGuide](/codeguide-backdrop.svg)](https://codeguide.dev)

# CodeGuide Vite + Supabase Starter

A modern web application starter template built with Vite and React, featuring a beautiful UI and Supabase integration.

## Tech Stack

- **Framework:** [Vite](https://vitejs.dev/) + [React](https://react.dev/)
- **Database:** [Supabase](https://supabase.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Data Management:** [TanStack Query](https://tanstack.com/query)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Validation:** [Zod](https://zod.dev/)

## Prerequisites

Before you begin, ensure you have the following:

- Node.js 18+ installed
- A [Supabase](https://supabase.com/) account for database
- Generated project documents from [CodeGuide](https://codeguide.dev/) for best development experience

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd codeguide-vite-supabase
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Variables Setup**

   - Copy the `.env.example` file to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Fill in the environment variables in `.env` (see Configuration section below)

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.**

## Configuration

### Supabase Setup

This project uses Supabase with **public access** (no authentication required).

#### Remote Setup

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Create a new project
3. Go to Project Settings > API
4. Copy the `Project URL` as `VITE_SUPABASE_URL`
5. Copy the `anon` public key as `VITE_SUPABASE_ANON_KEY`
6. In the Authentication settings, disable email signups and enable anonymous access

#### Local Development with Supabase

1. Install the Supabase CLI:
   ```bash
   # macOS
   brew install supabase/tap/supabase
   ```

2. Start the local Supabase services:
   ```bash
   npm run supabase:start
   ```

3. Access the local Supabase Studio at http://localhost:54323

4. Run the application with Supabase:
   ```bash
   npm run dev:full
   ```

For more details, see the [Supabase README](./supabase/README.md).

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_DB_PASSWORD=your_database_password

# API Settings
VITE_USE_REAL_API=true

# Twilio API (for serverless function)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_VERIFY_SERVICE_SID=your_twilio_verify_service_sid
NOMOROBO_ADDON_SID=your_nomorobo_addon_sid
```

## Features

- 📦 Supabase Database Integration
- 🔍 Spam Checker Tool with Supabase Functions
  - Check if phone numbers are flagged as spam
  - Uses Twilio Lookup API with Nomorobo Spam Score Add-on
  - Stores results in the database for historical tracking
- 🎨 Modern UI with Tailwind CSS and Radix UI
- 🚀 Fast Development with Vite
- 🔄 Data Fetching with TanStack Query
- 📱 Responsive Design
- 🎭 Beautiful Animations with Framer Motion
- 📝 Type-Safe Forms with React Hook Form and Zod

## Project Structure

```
codeguide-vite-supabase/
├── src/                # Source files
│   ├── components/    # React components
│   ├── lib/          # Utility functions
│   ├── hooks/        # Custom hooks
│   └── types/        # TypeScript types
├── public/            # Static assets
├── supabase/          # Supabase configuration
│   ├── migrations/   # Database migrations
│   └── seed.sql      # Seed data
├── scripts/           # Utility scripts
└── documentation/     # Generated documentation from CodeGuide
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build
- `npm run dev:full` - Start Supabase and development server together
- `npm run supabase:start` - Start Supabase services
- `npm run supabase:stop` - Stop Supabase services
- `npm run supabase:reset` - Reset the Supabase database
- `npm run supabase:types` - Generate TypeScript types from database schema
- `npm run supabase:push` - Push local changes to remote Supabase project
- `npm run supabase:pull` - Pull remote changes from Supabase project

## Documentation Setup

To implement the generated documentation from CodeGuide:

1. Create a `documentation` folder in the root directory:

   ```bash
   mkdir documentation
   ```

2. Place all generated markdown files from CodeGuide in this directory:

   ```bash
   # Example structure
   documentation/
   ├── project_requirements_document.md
   ├── app_flow_document.md
   ├── frontend_guideline_document.md
   └── backend_structure_document.md
   ```

3. These documentation files will be automatically tracked by git and can be used as a reference for your project's features and implementation details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
