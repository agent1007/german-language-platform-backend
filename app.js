const express = require('express');

const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const app = express();

const NotFoundError = require('./errors/not-found-error');

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: true,
  });

app.use('/', require('./routes/users'));

app.use('/cards', require('./routes/cards'));

app.use('/', () => {
  throw new NotFoundError('Ресурс по указанному маршруту не найден.');
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
