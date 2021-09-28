import express from 'express';
import postRouter from './router/post.js';
import userRouter from './router/user.js';
const app = express();

app.use(express.json()); // REST API, body parse
app.use(express.urlencoded({ extended: false })); //HTML Form-> Body
app.use(express.static('public'));
app.use('/posts', postRouter);
app.use('/users', userRouter);

app.listen(8080);
