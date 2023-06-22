const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
//const cardRouter = require('./routes/users');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
 useNewUrlParser: true,
  //useCreateIndex: true,
   // useFindAndModify: false
});

app.use('/', userRouter);
//app.use('/cards', cardRouter);


app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)
})
//router.get('/books', getBooks);
//router.post('/books', createBook);
//router.put('/books/:id', replaceBook);
//router.patch('/books/:id', updateBookInfo);
//router.delete('/books/:id', deleteBook);