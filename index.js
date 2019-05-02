import express from 'express'
import usersRoute from './api/routes/users'

const app = express();
app.use(express.json());

app.use('/api/v1/users', usersRoute);

// if the page is not found
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  res.status(error.status || 500).send({ error: { message: error.message } });
});

app.listen(4000, () => console.log('listening on port 4000'));
