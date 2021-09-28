import express from 'express';

import fs from 'fs';
import fsAsync from 'fs/promises';
import {} from 'express-async-errors';
const app = express();
app.use(express.json());
app.all('/api', (req, res, next) => {
  console.log('all');
  next();
});

app.use('/zz', (req, res, next) => {
  console.log('use');
  next();
});

app.post('/', (req, res, next) => {
  console.log(req.body);
});

app.get(
  '/',
  (req, res, next) => {
    //   console.log(req.path);
    //   console.log(req.headers);
    console.log('first');
    // next('route');
    next();
  },
  (req, res, next) => {
    console.log('first2');

    next('route');
  },
);

app.get('/', (req, res, next) => {
  //   console.log(req.path);
  //   console.log(req.headers);
  console.log('second');
  return res.send('///');
  //   next();
});

app.get('/sky/:id', (req, res, next) => {
  //   console.log(req.path);
  //   console.log(req.headers);
  const { id } = req.params;
  console.log(req.params);
  console.log(req.query);
  res.setHeader('key', 'values');
  return res.json({ id }).status(201);
});

// express 5부턴 express-async-errors 필요없음
app.get('/file1', (req, res) => {
  fs.readFile('./file.txt', (err, data) => {
    if (err) {
      res.status(404).send('File not found');
    }
  });
  //   try {
  //     const data = fs.readFileSync('./file.txt');
  //   } catch (error) {
  //     res.status(404).send('File not found');
  //   }
});

app.get('/file2', (req, res) => {
  try {
    fsAsync
      .readFile('./file.txt')
      .then((data) => {})
      .catch((error) => {
        next();
      });
  } catch (error) {
    res.status(404).send('File not found');
  }
});

app.get('/file3', async (req, res, next) => {
  try {
    const data = await fsAsync.readFile('./file.txt');
  } catch (error) {
    next();
  }
});

app.get('/file4', (req, res) => {
  return fsAsync.readFile('./file.txt');
});

app.get('/file5', async (req, res, next) => {
  const data = await fsAsync.readFile('./file.txt');
});

app.use((req, res, next) => {
  return res.status(404).send('404');
});

app.use((error, req, res, next) => {
  console.error(error);
  return res.status(500).send('sorry return');
});

app
  .route('posts')
  .get((req, res, next) => {
    res.status(201).send('GET: post');
  })
  .post((req, res, next) => {
    res.status(201).send('POST: post');
  });

app
  .route('posts/:id')
  .put((req, res, next) => {
    res.status(201).send(`PUT: post${req.params.id}`);
  })
  .delete((req, res, next) => {
    res.status(201).send(`DELETE: post${req.params.id}`);
  });

app.listen(8080);
