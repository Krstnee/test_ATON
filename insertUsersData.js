const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/aton', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const usersData = [
      {
        fullName: 'Петров Петр Петрович',
        username: 'petr',
        password: '123456'
      },
      {
        fullName: 'Иванов Иван Иванович',
        username: 'ivan',
        password: '654321'
      }
    ];

    await User.insertMany(usersData);

    console.log('Users data inserted successfully');
    mongoose.connection.close();
  })
  .catch(error => console.error(error));
