# MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Click "Try Free" or "Sign Up"
3. Fill in your details and create an account

## Step 2: Create a New Cluster
1. After logging in, click "Build a Database"
2. Choose the **FREE** tier (M0 Sandbox)
3. Select your preferred cloud provider and region (choose one close to your location)
4. Name your cluster (e.g., "mern-todo-cluster")
5. Click "Create Cluster"

## Step 3: Set Up Database Access
1. In the left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter a username (e.g., "mern-todo-user")
5. Enter a strong password
6. Under "Database User Privileges", select "Read and write to any database"
7. Click "Add User"

## Step 4: Configure Network Access
1. In the left sidebar, click "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

## Step 5: Get Connection String
1. In the left sidebar, click "Clusters"
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<database>` with your desired database name (e.g., "mern-todo-db")

## Step 6: Update Environment Variables
1. In your backend `.env` file, update the `MONGODB_URI`:
   ```
   MONGODB_URI=mongodb+srv://mern-todo-user:yourpassword@cluster0.xxxxx.mongodb.net/mern-todo-db?retryWrites=true&w=majority
   ```

## Security Notes
- Never commit your `.env` file to version control
- Use strong, unique passwords
- Consider restricting IP access in production (don't use 0.0.0.0/0)
- Regularly rotate database passwords

## Troubleshooting
- If connection fails, check your IP whitelist
- Ensure your database user has correct permissions
- Verify the connection string format
- Check if your cluster is fully provisioned (can take a few minutes)
