#!/bin/bash

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "Supabase CLI is not installed. Please install it first."
    echo "macOS: brew install supabase/tap/supabase"
    echo "Windows: scoop bucket add supabase https://github.com/supabase/scoop-bucket.git && scoop install supabase"
    echo "Linux: curl -fsSL https://get.supabase.com/install.sh | sh"
    echo "npm: npm install -g supabase"
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "Docker is not running. Please start Docker Desktop or your Docker alternative."
    exit 1
fi

# Function to start Supabase
start_supabase() {
    echo "Starting Supabase services..."
    supabase start
}

# Function to stop Supabase
stop_supabase() {
    echo "Stopping Supabase services..."
    supabase stop
}

# Function to reset the database
reset_database() {
    echo "Resetting the database..."
    supabase db reset
}

# Function to create a new migration
create_migration() {
    if [ -z "$1" ]; then
        echo "Please provide a name for the migration."
        echo "Usage: $0 create-migration <migration_name>"
        exit 1
    fi
    
    echo "Creating new migration: $1"
    supabase migration new "$1"
}

# Function to link to remote project
link_remote() {
    if [ -z "$1" ]; then
        echo "Please provide the project reference ID."
        echo "Usage: $0 link-remote <project-ref>"
        exit 1
    fi
    
    echo "Linking to remote project: $1"
    supabase link --project-ref "$1"
}

# Function to push local changes to remote
push_remote() {
    echo "Pushing local changes to remote project..."
    supabase db push
}

# Function to pull remote changes
pull_remote() {
    echo "Pulling remote changes..."
    supabase db pull
}

# Function to generate types
generate_types() {
    echo "Generating TypeScript types from database schema..."
    supabase gen types typescript --local > src/types/supabase.ts
    echo "Types generated at src/types/supabase.ts"
}

# Function to show help
show_help() {
    echo "Supabase Setup Script"
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  start                Start Supabase services"
    echo "  stop                 Stop Supabase services"
    echo "  reset                Reset the database"
    echo "  create-migration     Create a new migration"
    echo "  link-remote          Link to remote project"
    echo "  push-remote          Push local changes to remote"
    echo "  pull-remote          Pull remote changes"
    echo "  generate-types       Generate TypeScript types from database schema"
    echo "  help                 Show this help message"
}

# Main script logic
case "$1" in
    start)
        start_supabase
        ;;
    stop)
        stop_supabase
        ;;
    reset)
        reset_database
        ;;
    create-migration)
        create_migration "$2"
        ;;
    link-remote)
        link_remote "$2"
        ;;
    push-remote)
        push_remote
        ;;
    pull-remote)
        pull_remote
        ;;
    generate-types)
        generate_types
        ;;
    help|*)
        show_help
        ;;
esac
