// Minimal test server for Railway debugging
const http = require('http');

const PORT = process.env.PORT || 3000;

console.log('Starting minimal test server...');
console.log('Environment:', {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    RAILWAY_ENVIRONMENT: process.env.RAILWAY_ENVIRONMENT,
    NODE_VERSION: process.version
});

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    
    if (req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: 'ok',
            port: PORT,
            timestamp: new Date().toISOString()
        }));
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});

// Try binding to :: for IPv6
server.listen(PORT, '::', (err) => {
    if (err) {
        console.error('Failed to bind to ::', err);
        // Fallback to default
        server.listen(PORT, () => {
            const addr = server.address();
            console.log(`Test server running on ${addr.address}:${addr.port}`);
        });
    } else {
        const addr = server.address();
        console.log(`Test server running on [::]:${PORT}`);
        console.log('Address info:', addr);
    }
});

server.on('error', (err) => {
    console.error('Server error:', err);
});

// Keep the process alive
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down...');
    server.close(() => {
        process.exit(0);
    });
});