const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 5000;

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) return console.error(err);
  console.log('Connected to Database');

  const db = client.db('aton');
  const usersCollection = db.collection('users');
  const clientsCollection = db.collection('clients');
  app.use(bodyParser.json());

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

  app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  usersCollection.findOne({ username, password }, (err, user) => {
    if (err) return res.status(500).send('Ошибка сервера');
    if (!user) return res.status(401).send('Неверный логин или пароль');

    const fullName = user.fullName;

    res.status(200).send({ message: 'Авторизация успешна', fullName });
  });
});


  app.get('/clients/:fullName', (req, res) => {
    const fullName = req.params.fullName;
    clientsCollection.find({ responsiblePerson: fullName }).toArray((err, clients) => {
      if (err) return res.status(500).send('Ошибка сервера');
      res.status(200).json(clients);
    });
  });


app.put('/clients/:accountNumber', (req, res) => {
  const accountNumber = parseInt(req.params.accountNumber);
  const { status, fullName } = req.body;
  clientsCollection.updateOne({ accountNumber }, { $set: { status } }, (err, result) => {
    if (err) return res.status(500).send('Ошибка сервера');

    clientsCollection.find({ responsiblePerson: fullName }).toArray((err, clients) => {
      if (err) return res.status(500).send('Ошибка сервера');
      res.status(200).json(clients);
    });
  });
});


  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
