# Supabase Setup for Ring4 Site

This directory contains the Supabase configuration for the Ring4 site. It includes database migrations, seed data, and configuration files.

## Public Access Configuration

This Supabase setup is configured for **public access without authentication**:

- Row Level Security (RLS) policies allow all operations (read, write, update, delete) for all users
- The Supabase client is configured to use the anonymous key
- No login or signup is required to use the application

## Spam Checker Integration

The spam checker tool is implemented as a Supabase database function:

- `check_spam_score(phone_number TEXT, secondary_phone_number TEXT)`: Checks if a phone number is likely to be flagged as spam
  - This function simulates the Twilio Lookup API with Nomorobo Spam Score Add-on
  - In production, it would make an actual API call to Twilio
  - The function automatically saves the result to the `spam_check_results` table

### How It Works

1. The client calls the `check_spam_score` function via Supabase RPC
2. The function validates the phone number format
3. The function generates a spam score based on the last digit of the phone number (for demo purposes)
4. The function saves the result to the `spam_check_results` table
5. The function returns the result to the client

### Benefits of Using Supabase Functions

- No need for separate serverless functions
- API keys are securely stored on the server
- Business logic is centralized in the database
- Automatic data persistence
- Better performance (fewer network hops)

## Prerequisites

1. Install the Supabase CLI:

   ```bash
   # macOS
   brew install supabase/tap/supabase

   # Windows (using Scoop)
   scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
   scoop install supabase

   # Linux
   curl -fsSL https://get.supabase.com/install.sh | sh

   # npm / Bun
   npm install -g supabase
   ```

2. Install Docker Desktop (or an alternative like Rancher Desktop, Podman, OrbStack, or colima)

## Local Development

### Starting Supabase Locally

1. Start the Supabase services:

   ```bash
   supabase start
   ```

   This will start all Supabase services locally, including:
   - PostgreSQL database
   - Supabase API
   - Supabase Studio
   - Auth service
   - Storage service
   - Inbucket (email testing)

2. Access the local services:
   - Studio: http://localhost:54323
   - API: http://localhost:54321
   - Database: postgresql://postgres:postgres@localhost:54322/postgres
   - Inbucket: http://localhost:54324

### Database Migrations

The `migrations` directory contains SQL files that define the database schema. These migrations are automatically applied when you run `supabase start`.

To create a new migration:

```bash
supabase migration new <migration_name>
```

This will create a new timestamped SQL file in the `migrations` directory.

### Seeding Data

The `seed.sql` file contains initial data for the database. This data is automatically loaded when you run `supabase start`.

To manually seed the database:

```bash
supabase db reset
```

This will reset the database and apply all migrations and seed data.

### Stopping Supabase

To stop the Supabase services:

```bash
supabase stop
```

## Connecting to Remote Supabase Project

To link your local project to your remote Supabase project:

1. Get your project reference ID from the Supabase dashboard

2. Link your project:

   ```bash
   supabase link --project-ref <project-ref>
   ```

3. Push your local migrations to the remote project:

   ```bash
   supabase db push
   ```

## Database Schema

### spam_check_results

This table stores the results of spam checks for phone numbers.

| Column                | Type        | Description                                      |
|-----------------------|-------------|--------------------------------------------------|
| id                    | UUID        | Primary key                                      |
| phone_number          | TEXT        | The phone number that was checked                |
| secondary_phone_number| TEXT        | Optional secondary phone number                  |
| status                | TEXT        | Status of the spam check (clean, at-risk, flagged)|
| risk_score            | INTEGER     | Numeric risk score (0-100)                       |
| carriers              | JSONB       | Carrier-specific status information              |
| recommendations       | TEXT[]      | Recommended actions based on the spam check      |
| raw_data              | JSONB       | Raw data from the spam check service             |
| created_at            | TIMESTAMPTZ | Timestamp when the record was created            |
| updated_at            | TIMESTAMPTZ | Timestamp when the record was last updated       |

### verification_attempts

This table stores phone number verification attempts.

| Column      | Type        | Description                                      |
|-------------|-------------|--------------------------------------------------|
| id          | UUID        | Primary key                                      |
| phone_number| TEXT        | The phone number being verified                  |
| status      | TEXT        | Status of the verification (pending, approved, canceled, failed) |
| channel     | TEXT        | Channel used for verification (sms, call, email, whatsapp) |
| created_at  | TIMESTAMPTZ | Timestamp when the record was created            |
| updated_at  | TIMESTAMPTZ | Timestamp when the record was last updated       |
