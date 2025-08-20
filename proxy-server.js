const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Create proxy middleware
const apiProxy = createProxyMiddleware({
    target: 'http://10.15.20.69:3000',
    changeOrigin: true,
    pathRewrite: {
        '^/api/projects': '', 
    },
    onError: (err, req, res) => {
        console.error('Proxy error:', err.message);
        res.status(500).json({ error: 'Proxy error', message: err.message });
    },
    onProxyReq: (proxyReq, req, res) => {
        console.log(`Proxying ${req.method} ${req.url} to ${proxyReq.path}`);
    },
    onProxyRes: (proxyRes, req, res) => {
        console.log(`Response: ${proxyRes.statusCode} for ${req.url}`);
    }
});

// Use the proxy middleware
app.use('/api/projects', apiProxy);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'Proxy server is running' });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`API proxy: http://localhost:${PORT}/api/projects/[project-name]`);
});