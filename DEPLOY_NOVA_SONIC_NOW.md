# 🚀 Deploy Nova Sonic Server NOW

Follow these steps in your terminal to deploy the Nova Sonic server:

## Step 1: Login to Railway
```bash
railway login
```

## Step 2: Navigate to server directory
```bash
cd /Users/josephkarim/ring4-site/nova-sonic-server
```

## Step 3: Link to your Railway project
```bash
railway link -p 578720b5-1bfc-4fff-b8e6-af2689060bb6
```

## Step 4: Set environment variables
```bash
railway variables --set "AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY" \
                   --set "AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_KEY" \
                   --set "AWS_REGION=us-east-1" \
                   --set "NODE_ENV=production"
```

**Note**: Get your AWS credentials from the Supabase secrets dashboard or your AWS account.

## Step 5: Deploy!
```bash
railway up
```

## Step 6: Get your server URL
After deployment, Railway will show your server URL. It will look like:
```
https://nova-sonic-production.up.railway.app
```

## Step 7: Add to Netlify
1. Go to your Netlify dashboard
2. Site Settings → Environment Variables
3. Add:
   ```
   VITE_NOVA_SONIC_URL=https://your-nova-sonic-server.railway.app
   ```
4. Redeploy your Netlify site

## Step 8: Test it!
Visit your site and test the AI receptionist - it should now have voice!

---

### Quick Copy-Paste Version:
```bash
# Run these commands one by one:
railway login
cd /Users/josephkarim/ring4-site/nova-sonic-server
railway link -p 578720b5-1bfc-4fff-b8e6-af2689060bb6
railway variables --set "AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY" --set "AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_KEY" --set "AWS_REGION=us-east-1" --set "NODE_ENV=production"
railway up
```