# NextAuth Boilerplate

A modern authentication boilerplate built with Next.js, NextAuth.js, Prisma, and TypeScript. This project provides a secure and scalable authentication system with user management capabilities.

## Features

- 🔐 Secure authentication with NextAuth.js
- 👤 User management system
- 🛡️ Protected routes and API endpoints
- 📝 User registration
- 🔑 Credential authentication
- 🎨 Modern UI with Tailwind CSS
- 🗄️ MongoDB database with Prisma ORM
- 🌐 Type-safe with TypeScript

## Project Structure

```
├── app/                    # App router pages and API routes
│   ├── api/               # API endpoints
│   │   ├── auth/         # Authentication routes
│   │   └── users/        # User management routes
│   ├── dashboard/        # Protected dashboard pages
│   └── page.tsx          # Home page
├── components/            # Reusable components
│   ├── ui/              # UI components
│   └── modal/           # Modal components
├── lib/                  # Utility functions and configurations
│   ├── auth.ts          # NextAuth configuration
│   └── prisma.ts        # Prisma client configuration
├── prisma/              # Database schema and migrations
└── types/               # TypeScript type definitions
```

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nextauth-boilerplate.git
cd nextauth-boilerplate
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
Create a `.env` file in the root directory and add:
```env
DATABASE_URL="mongodb://mongodb:27017/nextauth"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
```

4. Set up Prisma with MongoDB:
```bash
# Generate Prisma Client
npx prisma generate

# Push the schema to your MongoDB database
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Note: For local development without Docker, make sure you have MongoDB installed and running locally, or update the DATABASE_URL to point to your MongoDB instance.

Visit `http://localhost:3000` to see your application.

## Docker Deployment

You can also run this application using Docker. The project includes both a Dockerfile and docker-compose.yml for easy containerization.

### Using Docker Compose (Recommended)

1. Make sure you have Docker and Docker Compose installed on your machine.

2. Run the application stack:
```bash
docker-compose up -d
```

This will start both the Next.js application and a PostgreSQL database. The application will be available at `http://localhost:3000`.

To stop the containers:
```bash
docker-compose down
```

### Using Dockerfile

If you want to build and run only the Next.js application:

1. Build the Docker image:
```bash
docker build -t nextauth-boilerplate .
```

2. Run the container:
```bash
docker run -p 3000:3000 --network imraffydev-network --env-file .env nextauth-boilerplate
```

### Environment Variables for Docker

When using Docker Compose, environment variables are loaded from your `.env` file. Make sure you have the following variables set:
- `DATABASE_URL`: mongodb://mongodb:27017/nextauth
- `NEXTAUTH_URL`: http://localhost:3000
- `NEXTAUTH_SECRET`: your-nextauth-secret (change this in production)

### Docker Network Setup

Before running the containers, ensure you have created the required network:
```bash
docker network create imraffydev-network
```

This external network allows your containers to communicate with other services if needed.

## Features in Detail

### Authentication

- Secure credential-based authentication
- JWT session handling
- Protected routes and API endpoints
- User session management

### User Management

- User registration with password hashing
- User profile management
- Password update functionality
- User listing and management (admin)

### API Routes

- `/api/auth/*` - NextAuth authentication routes
- `/api/auth/register` - User registration
- `/api/users` - User management endpoints
- `/api/users/[id]` - Individual user operations

### Dashboard

- Protected dashboard area
- User settings page
- User management interface
- Responsive layout

## Technologies Used

- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [Prisma](https://www.prisma.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components

## UI Components and Features
- Modern dashboard layout with sidebar navigation
- User management interface with CRUD operations
- Custom components:
  - Dashboard sidebar with navigation
  - User management table
  - Confirmation modals
  - Form elements and inputs
  - Alert and notification system
  - Custom badges and cards
  - Responsive tables
  - Loading skeletons
  - Dialog modals
  - Navigation components

## Security Features

- Password hashing with bcrypt
- JWT-based sessions
- Protected API routes
- CSRF protection
- HTTP-only cookies

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2025 Raffy S. Uanan
