# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern web application built with Vite + React that provides AI-powered receptionist services and phone number management tools. The project was originally created from the CodeGuide Vite + Supabase starter template.

## Tech Stack

### Frontend
- **Framework:** Vite 6.1.0 + React 18.2.0
- **Language:** TypeScript 5.2.2
- **Styling:** Tailwind CSS 3.4.17 with tailwindcss-animate
- **UI Components:** 
  - shadcn/ui (Radix UI primitives)
  - Lucide React for icons
  - Framer Motion for animations
- **State Management:** TanStack Query 5.66.0
- **Forms:** React Hook Form 7.54.2 with Zod validation
- **Routing:** React Router DOM 7.5.3

### Backend & Services
- **Database:** Supabase (PostgreSQL)
- **Edge Functions:** Supabase Functions
- **Voice AI:** Amazon Nova Sonic (via AWS Bedrock Runtime)
- **Phone Services:** Twilio API with Nomorobo Spam Score Add-on
- **WebSocket Server:** Nova Sonic Server (Node.js)
- **Deployment:** Netlify with serverless functions

## Project Structure

```
ring4-site/
├── src/                      # Frontend source code
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── branding/       # Brand-specific components
│   │   └── [pages].tsx     # Page components
│   ├── lib/                # Utilities and services
│   ├── hooks/              # Custom React hooks
│   └── types/              # TypeScript type definitions
├── supabase/               # Supabase configuration
│   ├── migrations/         # Database migrations
│   ├── functions/          # Edge functions
│   └── seed.sql           # Database seed data
├── nova-sonic-server/      # Voice AI WebSocket server
├── netlify/                # Netlify serverless functions
│   └── functions/
├── scripts/                # Utility scripts
├── documentation/          # Project documentation
└── public/                 # Static assets
```

## Key Features

1. **AI Receptionist with Real Voice**
   - Powered by Amazon Nova Sonic for natural speech-to-speech conversations
   - Real-time voice interaction via WebSocket
   - Intelligent website crawling for business context
   - Professional voice synthesis

2. **Spam Checker Tool**
   - Check if phone numbers are flagged as spam
   - Uses Twilio Lookup API with Nomorobo integration
   - Stores results in Supabase for historical tracking

3. **Phone Number Management**
   - Claim receptionist functionality
   - Separate work line features
   - Phone verification system

## Available Scripts

### Development
- `npm run dev` - Start Vite dev server (http://localhost:5173)
- `npm run dev:full` - Start Supabase + Vite dev server
- `npm run dev:voice` - Start Vite + Nova Sonic server concurrently
- `npm run dev:netlify` - Start Supabase + Netlify dev

### Build & Deploy
- `npm run build` - TypeScript check + Vite production build
- `npm run preview` - Preview production build
- `npm run netlify:deploy` - Deploy to Netlify

### Supabase Management
- `npm run supabase:start` - Start local Supabase
- `npm run supabase:stop` - Stop local Supabase
- `npm run supabase:reset` - Reset database
- `npm run supabase:types` - Generate TypeScript types
- `npm run supabase:push` - Push to remote
- `npm run supabase:pull` - Pull from remote

### Voice Server
- `npm run nova-sonic` - Start Nova Sonic server
- `npm run nova-sonic:install` - Install Nova Sonic dependencies

### Code Quality
- `npm run lint` - Run ESLint

## Environment Variables

Required environment variables (see `.env.example`):

```env
# Supabase
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_DB_PASSWORD=your_db_password

# API Settings
VITE_USE_REAL_API=true

# Twilio API (for serverless function)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_VERIFY_SERVICE_SID=your_twilio_verify_service_sid
NOMOROBO_ADDON_SID=your_nomorobo_addon_sid
```

## Key Configuration Files

- **vite.config.ts** - Vite configuration with path aliases
- **tailwind.config.js** - Tailwind CSS with custom theme
- **tsconfig.json** - TypeScript configuration with path mapping
- **netlify.toml** - Netlify deployment settings
- **eslint.config.js** - ESLint rules for TypeScript/React

## Database Schema

The project includes several Supabase migrations:
1. `create_spam_check_tables.sql` - Spam check functionality
2. `create_spam_checker_function.sql` - Database functions
3. `create_ai_receptionist_tables.sql` - AI receptionist data
4. `add_fallback_columns.sql` - Additional fields

## Important Implementation Details

### Path Aliases
- `@/*` maps to `./src/*` for clean imports

### UI Components
- All UI components are in `src/components/ui/`
- Using shadcn/ui pattern with Radix UI primitives
- Components use `cn()` utility for className merging

### Voice AI Integration
- Nova Sonic server runs separately on port 3001
- WebSocket connection for real-time voice streaming
- AWS Bedrock Runtime SDK for Nova Sonic API

### Supabase Integration
- Client initialized in `src/lib/supabase.ts`
- Types generated from database schema
- Edge functions for serverless operations

### Deployment
- Netlify handles frontend hosting
- Serverless functions in `netlify/functions/`
- Nova Sonic server requires separate deployment (Railway/Render)

## Development Workflow

1. **Local Development**
   ```bash
   npm install
   cp .env.example .env
   # Configure environment variables
   npm run dev:full
   ```

2. **Database Changes**
   - Create migrations in `supabase/migrations/`
   - Run `npm run supabase:reset` to apply
   - Generate types with `npm run supabase:types`

3. **UI Development**
   - Use shadcn/ui components from `src/components/ui/`
   - Follow existing patterns for consistency
   - Test responsive design with Tailwind breakpoints

4. **Voice Features**
   - Start Nova Sonic server separately
   - Configure AWS credentials for Bedrock
   - Test WebSocket connections locally

## Code Style Guidelines

- TypeScript for type safety
- React functional components with hooks
- Tailwind CSS for styling (avoid inline styles)
- ESLint rules enforced (run `npm run lint`)
- Path aliases for imports (`@/` prefix)

## Testing Approach

- Manual testing for UI components
- Supabase local instance for database testing
- Scripts in `scripts/` for API testing
- Browser developer tools for debugging

## Security Considerations

- Environment variables for sensitive data
- Supabase Row Level Security (RLS) policies
- API keys should never be committed
- Use anon key for client-side Supabase

## Performance Optimizations

- Vite's fast HMR for development
- React Query for efficient data fetching
- Lazy loading for code splitting
- Tailwind CSS purging for small bundles

## Troubleshooting

### Common Issues
1. **Supabase connection errors** - Check environment variables
2. **Nova Sonic not working** - Verify AWS credentials and server status
3. **Build failures** - Run `npm ci` to clean install dependencies
4. **Type errors** - Regenerate Supabase types after schema changes

### Useful Commands
- `npm run supabase:types` - Fix TypeScript errors after DB changes
- `npm run lint` - Check for code style issues
- `npm run build` - Verify production build works

## Additional Resources

- [Supabase Docs](https://supabase.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Vite Documentation](https://vitejs.dev/)
- [TanStack Query](https://tanstack.com/query)
- Project documentation in `/documentation/`