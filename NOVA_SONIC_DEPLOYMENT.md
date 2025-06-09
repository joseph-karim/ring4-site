# Nova Sonic Voice Server Deployment Guide

The Nova Sonic voice server needs to be deployed separately from the main Ring4 site because it requires:
- WebSocket support for real-time audio streaming
- Persistent connections to AWS Bedrock
- Node.js runtime (not Deno/Edge Functions)

## 🚀 Deployment Options

### Option 1: Railway (Recommended - Easiest)

1. **Install Railway CLI**:
   ```bash
   npm install -g @railway/cli
   ```

2. **Deploy the server**:
   ```bash
   cd nova-sonic-server
   railway login
   railway init
   railway up
   ```

3. **Set environment variables in Railway dashboard**:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION=us-east-1`
   - `PORT` (Railway sets this automatically)

4. **Get your server URL** from Railway dashboard (e.g., `https://nova-sonic-production.up.railway.app`)

### Option 2: Render

1. **Connect GitHub repo** to Render
2. **Create new Web Service**
3. **Set root directory**: `nova-sonic-server`
4. **Build command**: `npm install`
5. **Start command**: `node server.js`
6. **Add environment variables** (same as above)

### Option 3: Heroku

1. **Create Heroku app**:
   ```bash
   cd nova-sonic-server
   heroku create your-nova-sonic-server
   ```

2. **Set environment variables**:
   ```bash
   heroku config:set AWS_ACCESS_KEY_ID=your_key
   heroku config:set AWS_SECRET_ACCESS_KEY=your_secret
   heroku config:set AWS_REGION=us-east-1
   ```

3. **Deploy**:
   ```bash
   git subtree push --prefix nova-sonic-server heroku main
   ```

## 🔧 Configure Ring4 Site

Once deployed, add the server URL to your Netlify environment variables:

1. Go to Netlify Dashboard → Site Settings → Environment Variables
2. Add: `VITE_NOVA_SONIC_URL=https://your-nova-sonic-server.railway.app`
3. Redeploy the site

## 🧪 Testing

1. **Check server health**:
   ```bash
   curl https://your-nova-sonic-server.railway.app/health
   ```

2. **Test in Ring4**:
   - Go to AI Receptionist demo
   - Click "Test Your AI"
   - Should connect to your deployed Nova Sonic server

## 🏗️ Architecture

```
[User Browser] 
    ↓ HTTPS
[Netlify Site (Ring4)]
    ↓ WebSocket
[Nova Sonic Server (Railway/Render/Heroku)]
    ↓ HTTPS/2
[AWS Bedrock Nova Sonic]
```

## 📝 Notes

- The server supports CORS for your Netlify domain
- WebSocket connections are automatically upgraded from HTTP
- Server includes health checks and graceful shutdown
- Supports multiple concurrent sessions

## 🔒 Security

- Never commit AWS credentials
- Use environment variables only
- Consider using AWS IAM roles in production
- Enable HTTPS (automatic on Railway/Render/Heroku)