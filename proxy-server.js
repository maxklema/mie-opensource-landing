const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

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
    }
});

// Use the proxy middleware
app.use('/api/projects', apiProxy);
app.listen(3001);