# SIKHAWOX - Serverless EdTech Platform

A premium Learning Management System built with modern serverless architecture.

## 🎯 Key Features

- **Manual Purchase Approval**: Admin-controlled course enrollment with automated email notifications
- **Professional Video Streaming**: Mux-powered adaptive bitrate video playback
- **Integrated Coding Environment**: Monaco Editor with Judge0 code execution
- **Student Analytics**: Detailed progress tracking and login history monitoring
- **Premium UI**: Aceternity UI components for stunning visual experience

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database & Auth**: Supabase (PostgreSQL + Row Level Security)
- **Video Streaming**: Mux
- **Email Service**: Resend
- **Code Execution**: Judge0 (RapidAPI)
- **UI Components**: Shadcn/UI + Aceternity UI
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Animations**: Framer Motion

## 🚀 Quick Start

### Prerequisites

1. **Supabase Account**: [supabase.com](https://supabase.com)
2. **Mux Account**: [mux.com](https://mux.com)
3. **Resend Account**: [resend.com](https://resend.com)
4. **RapidAPI Account**: [rapidapi.com](https://rapidapi.com) (for Judge0)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd sikhawox-lms

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev
```

### Supabase Setup

1. Create a new Supabase project
2. Copy the SQL schema from `supabase/schema.sql`
3. Run it in the Supabase SQL Editor
4. Copy your project URL and anon key to `.env.local`

## 📁 Project Structure

```
sikhawox-lms/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── lib/              # Utilities (Supabase, Mux, Resend, Judge0)
│   ├── hooks/            # Custom React hooks
│   └── types/            # TypeScript types
├── supabase/
│   └── schema.sql        # Database schema
└── public/               # Static assets
```

## 🎨 Brand Identity

**SIKHAWOX** uses a premium Emerald Green color palette:
- Secure video streaming with Mux

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines first.

---

Built with ❤️ for the SIKHAWOX community
