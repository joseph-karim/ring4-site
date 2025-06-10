# Railway Deployment Fix for Nova Sonic Server

## Problem
Railway was attempting to connect to the Nova Sonic server via IPv6 address (e.g., `[fd12:692:4e42:0:a000:6:b43c:45f1]:3000`) but getting "connection refused" errors.

## Root Cause
Railway's infrastructure uses IPv6 for internal networking. Node.js applications must be configured to properly bind to IPv6 addresses to accept connections from Railway's health checks and routing layer.

## Solution Applied

### 1. Server Binding Configuration
Updated `server.js` to explicitly bind to `::` (all IPv6 addresses), which enables dual-stack support for both IPv4 and IPv6:

```javascript
const host = '::';
server.listen(PORT, host, () => {
    console.log(`Server listening on :: (all IPv6 and IPv4 interfaces)`);
});
```

### 2. CORS Configuration
Enhanced CORS settings to include Railway's domain patterns:
- Added `https://*.up.railway.app`
- Added `http://*.up.railway.app` for testing

### 3. Error Handling
Added specific error handling for IPv6 binding issues with automatic fallback to IPv4 if needed.

## Key Points for Railway Deployment

1. **Port Configuration**: Always use `process.env.PORT` - Railway automatically sets this
2. **Host Binding**: Use `::` to bind to all interfaces (IPv4 and IPv6)
3. **Single Port**: Socket.IO and Express must share the same port on Railway
4. **Health Checks**: Ensure `/health` endpoint responds correctly
5. **Environment Variables**: Set AWS credentials in Railway dashboard, not in code

## Testing the Fix

1. Deploy to Railway with these changes
2. Check deployment logs for "Listening on :: (all IPv6 and IPv4 interfaces)"
3. Verify health check passes at `https://your-app.up.railway.app/health`
4. Test WebSocket connections from your frontend

## Additional Notes

- Railway uses IPv6 internally but presents IPv4 addresses externally
- The `::` binding allows the server to accept connections on both protocols
- This is the recommended approach per Railway's documentation and community solutions