# Streamifyy - Netflix Clone

A fully functional Netflix clone built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

- 🎬 Browse popular, top-rated, now playing, and upcoming movies
- 🔍 Search functionality for movies
- 👤 User authentication (signup/login)
- 📱 Responsive design for all devices
- 🎨 Netflix-inspired UI/UX
- ⚡ Fast loading with optimized images

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Custom CSS
- **Database**: SQLite with Prisma ORM
- **Authentication**: Custom auth with bcrypt
- **API**: TMDB (The Movie Database) API

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd streamifyy
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

4. **Get TMDB API Key**
   - Go to [TMDB](https://www.themoviedb.org/)
   - Create a free account
   - Go to Settings → API
   - Copy your API key and add it to `.env.local`

5. **Set up the database**
```bash
npx prisma generate
npx prisma db push
```

6. **Run the development server**
```bash
npm run dev
```

7. **Open your browser**
   - Navigate to `http://localhost:3000`

## Project Structure

```
streamifyy/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── api/            # API routes
│   │   ├── auth/           # Authentication pages
│   │   ├── movie/          # Movie detail pages
│   │   ├── search/         # Search page
│   │   └── profile/        # User profile
│   └── components/         # Reusable components
├── prisma/                 # Database schema
├── public/                 # Static assets
└── ...config files
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push database changes
- `npm run db:generate` - Generate Prisma client

## Features in Detail

### Authentication
- User registration with email/password
- Secure login system
- Password hashing with bcrypt

### Movie Browsing
- Hero section with featured movie
- Multiple movie categories
- Smooth horizontal scrolling
- Movie detail pages with similar recommendations

### Search
- Real-time movie search
- Search results with movie posters and ratings
- Responsive grid layout

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions

## Environment Variables

Required environment variables (add to `.env.local`):

```bash
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Manual Deployment

1. Build the project: `npm run build`
2. Start the server: `npm run start`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes only.

## Acknowledgments

- [TMDB](https://www.themoviedb.org/) for the movie data
- [Netflix](https://netflix.com) for design inspiration
- [Next.js](https://nextjs.org/) for the amazing framework
