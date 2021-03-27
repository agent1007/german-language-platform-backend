const express = require('express');
const { PORT = 3000, BASE_PATH } = process.env;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb',
                {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
} );

app.use((req, res, next) => {
  req.user = {
    _id: '605d7bacef18313fcc5820af' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});


app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));



// app.get('/users', (req, res) => {
//   res.send(users);
// })



app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});