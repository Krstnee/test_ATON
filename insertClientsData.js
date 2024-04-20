const mongoose = require('mongoose');
const Client = require('./models/Client');

mongoose.connect('mongodb://localhost:27017/aton', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const clientsData = [
      {
        accountNumber: 1001,
        lastName: 'Иванов',
        firstName: 'Иван',
        patronymic: 'Иванович',
        birthDate: new Date('1980-01-01'),
        INN: '12345678901',
        responsiblePerson: 'Петров Петр Петрович',
        status: 'Не в работе'
      },
      {
        accountNumber: 1002,
        lastName: 'Петров',
        firstName: 'Петр',
        patronymic: 'Петрович',
        birthDate: new Date('1995-05-15'),
        INN: '23456789012',
        responsiblePerson: 'Иванов Иван Иванович',
        status: 'Не в работе'
      },
      {
        accountNumber: 1003,
        lastName: 'Сидоров',
        firstName: 'Сидор',
        patronymic: 'Сидорович',
        birthDate: new Date('1976-11-20'),
        INN: '34567890123',
        responsiblePerson: 'Петров Петр Петрович',
        status: 'Не в работе'
      }
    ];

    await Client.insertMany(clientsData);

    console.log('Clients data inserted successfully');
    mongoose.connection.close();
  })
  .catch(error => console.error(error));
