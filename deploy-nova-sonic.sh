#!/bin/bash

echo "🚀 Deploying Nova Sonic Server to Railway"

cd nova-sonic-server

# Check if logged in
if ! railway whoami &> /dev/null; then
    echo "📝 Please login to Railway first:"
    echo "Run: railway login"
    echo ""
    echo "Then run this script again."
    exit 1
fi

# Link to project if not already linked
if [ ! -f ".railway" ]; then
    echo "🔗 Linking to Railway project..."
    railway link -p 578720b5-1bfc-4fff-b8e6-af2689060bb6
fi

# Set environment variables using the new syntax
echo "🔧 Setting environment variables..."
echo "⚠️  You need to set AWS credentials manually in Railway dashboard"
echo "   or use: railway variables --set 'AWS_ACCESS_KEY_ID=YOUR_KEY' --set 'AWS_SECRET_ACCESS_KEY=YOUR_SECRET'"

# Set non-sensitive variables
railway variables --set "AWS_REGION=us-east-1" \
                   --set "NODE_ENV=production"

# Deploy
echo "🚂 Deploying to Railway..."
railway up

# Get deployment URL
echo "✅ Deployment complete!"
echo "🌐 Your server URL will be shown above"
echo ""
echo "📝 Next steps:"
echo "1. Copy the server URL from above"
echo "2. Add it to Netlify: VITE_NOVA_SONIC_URL=<your-url>"
echo "3. Redeploy your Netlify site"