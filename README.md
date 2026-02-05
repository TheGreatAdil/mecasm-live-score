# MECASM '25 Live Score

A real-time Formula 1-themed leaderboard application for MECASM '25, featuring live score updates powered by Supabase realtime subscriptions.

![MECASM '25](https://img.shields.io/badge/MECASM-2025-bb0203)
![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)
![React](https://img.shields.io/badge/React-19.2.3-61DBFB)
![Supabase](https://img.shields.io/badge/Supabase-Realtime-34B27B)

![Screenshot](https://github.com/user-attachments/assets/59fe89a0-4370-427a-9eb9-91a3ce21730e)

## Features

- **Real-time Updates**: Live score synchronization using Supabase realtime subscriptions
- **Responsive Layout**: Optimized for both desktop and mobile devices
- **F1-Inspired Design**: Custom Formula 1 themed UI with team-specific branding
- **Custom Branding**: Integration with team logos and car images

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [Supabase](https://supabase.com/)

## Project Structure

```
mecasm/
├── app/
│   ├── components/
│   │   └── Leaderboard.tsx     # Main leaderboard component
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── fonts/
│   ├── Formula1-Black.woff2    # F1 font (black)
│   └── Formula1-Bold.ttf       # F1 font (bold)
├── public/
│   ├── cars/                   # Team car images
│   ├── aston.png               # Team logos
│   ├── ferrari.png
│   ├── mclaren.png
│   ├── redbull.png
│   ├── mecasm.png              # MECASM logo
│   └── Light Logo.svg          # Tascbar logo
├── utils/
│   └── supabase/
│       └── client.ts           # Supabase client configuration
└── package.json
```

## Database Structure

### Teams Table

| id | name            | points |
|----|-----------------|--------|
| 1  | Scuderia Ferrari| 51     |
| 2  | Aston Martin    | 71     |
| 3  | McLaren         | 63     |
| 4  | Redbull Racing  | 97     |

## How It Works

The application uses Supabase's realtime features to keep the leaderboard synchronized across all connected clients:

1. **Initial Load**: Fetches current team standings from Supabase
2. **Realtime Updates**: Subscribes to database changes (INSERT, UPDATE, DELETE)
3. **Automatic Sorting**: Re-sorts teams by points whenever data changes
4. **Optimistic UI**: Updates the UI immediately when changes are detected
