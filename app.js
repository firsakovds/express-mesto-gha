const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
 useNewUrlParser: true,
}).then(() => {
  console.log('Хьюстон! Мы на связи!');
});
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '6494b360c1eeb0c0cda3100b' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use('/', userRouter);
app.use('/', cardRouter);


app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)
})
//router.get('/books', getBooks);
//router.post('/books', createBook);
//router.put('/books/:id', replaceBook);
//router.patch('/books/:id', updateBookInfo);
//router.delete('/books/:id', deleteBook);