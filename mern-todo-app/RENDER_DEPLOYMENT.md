# Backend Deployment to Render

## Step 1: Create Render Account
1. Go to [Render](https://render.com)
2. Sign up with GitHub account (recommended for CI/CD)

## Step 2: Connect GitHub Repository
1. After signing up, click "New +" → "Web Service"
2. Connect your GitHub account
3. Select your `mern-todo-app` repository
4. Click "Connect"

## Step 3: Configure Web Service
1. **Name**: `mern-todo-backend` (or similar)
2. **Environment**: `Node`
3. **Build Command**: `npm install`
4. **Start Command**: `npm start`
5. **Root Directory**: `backend` (important!)

## Step 4: Environment Variables
Add these environment variables in Render dashboard:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=your_mongodb_atlas_connection_string
```

## Step 5: Deploy
1. Click "Create Web Service"
2. Wait for deployment to complete
3. Note the service URL (e.g., `https://mern-todo-backend.onrender.com`)

## Step 6: Update Frontend Environment
Update your frontend `.env` file:
```
REACT_APP_API_URL=https://mern-todo-backend.onrender.com
```

## Step 7: Enable Auto-Deploy
1. In Render dashboard, go to your service
2. Under "Settings" → "Build & Deploy"
3. Enable "Auto-Deploy" for pushes to main branch

## Troubleshooting
- Check build logs in Render dashboard
- Ensure all environment variables are set
- Verify MongoDB Atlas connection string
- Check that backend directory is correctly set as root
- Test health endpoint: `https://your-service.onrender.com/health`

## Free Tier Limitations
- 750 hours/month free
- Sleeps after 15 minutes of inactivity
- May take a few seconds to wake up
