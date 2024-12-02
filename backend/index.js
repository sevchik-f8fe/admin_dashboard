import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import jwt from "jsonwebtoken";
import { createProxyMiddleware } from 'http-proxy-middleware';
import axiosRetry from 'axios-retry';
import { config } from 'dotenv';

config({ path: './src/.env' });

const app = express();

app.use(express.json());
app.use(cors());

// const proxyMiddleware = createProxyMiddleware({
//     target: 'https://poizon-api.com/api/dewu/',
//     changeOrigin: true,
// });

// app.use('/api', proxyMiddleware);

mongoose
    .connect(`mongodb+srv://${process.env.BD_TOKEN}@admin.qiupu.mongodb.net/?retryWrites=true&w=majority&appName=admin`)
    .then(() => console.log('db is ok'))
    .catch((err) => console.log('err: ' + err));

app.post('/admin_dashboard/auth/login', (req, res) => {
    const adminToken = jwt.sign({
        email: process.env.VANO_LOGIN,
        password: process.env.VANO_PASSWORD
    }, '1245a04c403535feb8166e5948f5245b');

    const token = jwt.sign({
        email: req.body.login,
        password: req.body.password
    }, '1245a04c403535feb8166e5948f5245b');

    if (token === adminToken) {
        res.json({
            access: true
        });
    } else {
        res.json({
            access: false
        });
    }
});

app.listen(3000, () => {
    console.log('server ok')
})