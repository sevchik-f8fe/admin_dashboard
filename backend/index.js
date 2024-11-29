import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

mongoose
    .connect('mongodb+srv://ivanivanov06:lILgP3BH6dcIPTnX@admin.qiupu.mongodb.net/?retryWrites=true&w=majority&appName=admin')
    .then(() => console.log('db is ok'))
    .catch((err) => console.log('err: ' + err));

const app = express();

app.use(express.json());

app.post('/auth/login', (req, res) => {
    const token = jwt.sign({
        email: req.body.email,
        password: req.body.password
    }, '1245a04c403535feb8166e5948f5245b');

    res.json({
        token
    })

});

app.listen(4444, () => {
    console.log('server ok')
})