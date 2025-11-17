# Foresight App Live - Starter Project

Minimal starter project for running the Foresight App Live Docker container with custom configurations.

## What's Included

This starter project includes:
- **`agent/convo/`** - Customizable agent conversation pages
- **`public/`** - Static assets and public files
- **`.env.example`** - Environment variable template
- **`package.json`** - NPM scripts for easy Docker management

## Quick Start

### 1. Clone or Download This Project

```bash
git clone <your-repo-url> 4sight-app-live-starter
cd 4sight-app-live-starter
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

**Important:** The Docker image was built with environment variables. If you need to change environment variables:
1. Contact the development team for a rebuild with your `.env.local` values, OR
2. Use the main project to build your own Docker image

### 3. Install Dependencies (Optional)

```bash
npm install
```

### 4. Start the Application

```bash
./start.sh
```

This will:
- Pull the latest Docker image from Docker Hub
- Start the container with volume mounts
- Expose the app on `http://localhost:3000`

## Available Commands

```bash
# Pull the latest Docker image
npm run docker:pull

# Start the container
npm run docker:start

# Stop the container
npm run docker:stop
# or
npm stop

# Restart the container
npm run docker:restart
# or
npm restart

# View logs (follow mode)
npm run docker:logs:follow
# or
npm run logs

# View logs (static)
npm run docker:logs

# Remove the container
npm run docker:remove

# Reset (stop, remove, and start fresh)
npm run docker:reset
```

## Customization

### Modifying Agent Conversation Pages

Edit files in `app/agent/convo/`:
- **`page.tsx`** - Main agent conversation page
- **`config.tsx`** - Page configuration (layout, providers, etc.)
- **`layout.tsx`** - Page layout wrapper

**Changes are reflected immediately** - no need to rebuild or restart the container! The dev server will hot-reload automatically.

### Modifying Public Assets

Edit or add files in `public/`:
- Images
- Fonts
- Static files
- Icons

**Changes are reflected immediately** - the public folder is mounted directly.

## How Volume Mounts Work

The Docker container uses volume mounts to read files from your local directories:

```
Local Directory                Container Directory
----------------               -------------------
./agent/convo       →      /app/app/agent/convo
./public                →      /app/public
```

When you edit files locally, the running container sees the changes immediately because it's running in development mode (`pnpm dev`).

## Folder Structure

```
4sight-app-live-starter/
├── /
│   └── agent/
│       └── convo/
│           ├── page.tsx           # Main conversation page
│           ├── config.tsx         # Page configuration
│           └── layout.tsx         # Layout wrapper
├── public/
│   └── (static assets)
├── .env.example                   # Environment template
├── package.json                   # NPM scripts
└── README.md                      # This file
```

## Environment Variables

### Optional Variables (HeyGen Avatar)

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_HEYGEN_API_TOKEN` | HeyGen API token | `your-token` |
| `NEXT_PUBLIC_HEYGEN_AVATAR_ID` | HeyGen avatar ID | `avatar-id` |
| `NEXT_PUBLIC_HEYGEN_VOICE_ID` | HeyGen voice ID | `voice-id` |

If HeyGen variables are not set, the avatar feature will be disabled gracefully.

## Troubleshooting

### Container Won't Start

```bash
# Check if container already exists
docker ps -a | grep foresight-app

# Remove existing container
npm run docker:remove

# Start fresh
npm run docker:start
```

### Port Already in Use

If port 3000 is already in use, modify the `docker:start` script in `package.json`:

```json
"docker:start": "docker run -d --name foresight-app -p 3001:3000 -v $(pwd)/agent/convo:/app/app/agent/convo -v $(pwd)/public:/app/public nematix/foresight-app-live:latest"
```

### Changes Not Reflecting

1. Check logs: `npm run logs`
2. Verify files are in correct directories
3. Restart container: `npm restart`

### View Container Status

```bash
docker ps | grep foresight-app
```

## Docker Image Details

- **Image:** `nematix/foresight-app-live:latest`
- **Mode:** Development (hot reload enabled)
- **Base:** Node.js 20 Alpine
- **Port:** 3000
- **User:** nextjs (non-root)

## Support

For issues or questions:
1. Check the logs: `npm run logs`
2. Verify environment variables in `.env.local`
3. Ensure Docker is running
4. Contact the development team

## License

Nematix
