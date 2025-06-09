# Railway Deployment Steps for Nova Sonic Server

## 1. Login to Railway

Open a terminal and run:
```bash
railway login
```

This will open your browser for authentication.

## 2. Navigate to the server directory

```bash
cd /Users/josephkarim/ring4-site/nova-sonic-server
```

## 3. Link to your Railway project

```bash
railway link -p 578720b5-1bfc-4fff-b8e6-af2689060bb6
```

## 4. Set environment variables

```bash
# Set AWS credentials
railway variables set AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY
railway variables set AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_KEY
railway variables set AWS_REGION=us-east-1
railway variables set NODE_ENV=production
```

**Note**: Get your AWS credentials from the Supabase secrets dashboard or your AWS account.

## 5. Deploy the server

```bash
railway up
```

## 6. Get your server URL

After deployment, Railway will show your URL. It will look like:
```
https://nova-sonic-production.up.railway.app
```

## 7. Update Netlify environment variables

1. Go to Netlify Dashboard
2. Site Settings → Environment Variables
3. Add:
   ```
   VITE_NOVA_SONIC_URL=https://your-nova-sonic-server.railway.app
   ```
4. Trigger a redeploy

## 8. Test the deployment

```bash
# Test health endpoint
curl https://your-nova-sonic-server.railway.app/health
```

Should return:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "novaSonicReady": true
}
```

## 9. Monitor logs

```bash
railway logs
```

## ✅ Done!

Your Nova Sonic server is now deployed and the Ring4 site will automatically connect to it for voice AI functionality.