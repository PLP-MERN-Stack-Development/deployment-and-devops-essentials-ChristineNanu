# Frontend Deployment to Vercel

## Step 1: Create Vercel Account
1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub account (recommended for CI/CD)

## Step 2: Connect GitHub Repository
1. After signing up, click "New Project"
2. Import your GitHub repository (`mern-todo-app`)
3. Vercel should automatically detect it as a React project

## Step 3: Configure Project Settings
1. **Project Name**: `mern-todo-frontend` (or similar)
2. **Root Directory**: `frontend` (important!)
3. **Build Settings**:
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

## Step 4: Environment Variables
Add these environment variables in Vercel dashboard:

```
REACT_APP_API_URL=https://your-render-backend-service.onrender.com
```

## Step 5: Deploy
1. Click "Deploy"
2. Wait for deployment to complete
3. Note the deployment URL (e.g., `https://mern-todo-app.vercel.app`)

## Step 6: Enable Auto-Deploy
1. In Vercel dashboard, go to your project
2. Under "Settings" → "Git"
3. Ensure "Auto-deploy on push to main" is enabled

## Step 7: Custom Domain (Optional)
1. In project settings, go to "Domains"
2. Add your custom domain
3. Follow DNS configuration instructions

## Troubleshooting
- Check build logs in Vercel dashboard
- Ensure environment variables are set correctly
- Verify frontend directory is set as root
- Test API calls work with your Render backend
- Check browser console for CORS or API errors

## Free Tier Features
- Unlimited deployments
- Automatic HTTPS
- Global CDN
- Custom domains
- Preview deployments for PRs

## Performance Optimization
- Vercel automatically optimizes React apps
- Code splitting is enabled by default
- Static assets are served from CDN
- Automatic image optimization available
