# PicksArena - Sports Prediction Game

A cyberpunk-themed sports prediction game where friends compete by making weekly picks on real matches.

## Setup

### Prerequisites
- Node.js 18+ installed
- A Supabase account and project

### Environment Variables

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Fill in your Supabase credentials in `.env`:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Installation

```bash
npm install
npm run dev
```

## Supabase Setup

**IMPORTANT**: You are connected to Supabase but no project is selected. Please select a project in the chat box before proceeding with database operations.

Once you have selected a Supabase project, the database schema will be created automatically.

## Features

- 🎮 Create and join prediction arenas
- 🏆 Make picks on upcoming matches
- 📊 Track your performance on leaderboards
- 🎯 Compete with friends across seasons
- 🎨 Cyberpunk-themed UI with glowing effects

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Supabase (Backend & Database)
- Lucide React (Icons)
