import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [clients, setClients] = useState([]);
  const [status, setStatus] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    axios.post('http://localhost:5000/login', { username, password })
      .then(response => {
        const { fullName } = response.data;
        setLoggedIn(true);
        setFullName(fullName);
        fetchClients(fullName);
      })
      .catch(error => {
        console.error(error);
        setError('Ошибка авторизации. Неверный логин или пароль.');
      });
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
    setPassword('');
    setClients([]);
    setFullName('');
    setError('');
  };

  const fetchClients = (fullName) => {
    axios.get(`http://localhost:5000/clients/${fullName}`)
      .then(response => {
        const formattedClients = response.data.map(client => ({
          ...client,
          birthDate: formatDate(client.birthDate)
        }));
        setClients(formattedClients);
      })
      .catch(error => {
        console.error(error);
        setError('Ошибка загрузки клиентов.');
      });
  };

  const updateStatus = (accountNumber) => {
    axios.put(`http://localhost:5000/clients/${accountNumber}`, { status, fullName })
      .then(response => {
        fetchClients(fullName);
      })
      .catch(error => {
        console.error(error);
        setError('Ошибка обновления статуса клиента.');
      });
  };

  return (
    <div className="container">
      {!loggedIn ? (
        <div className="login-form">
          <h1>Пожалуйста, авторизируйтесь</h1>
          <input type="text" className="input-field__in" placeholder="Логин" value={username} onChange={e => setUsername(e.target.value)} />
          <input type="password" className="input-field__in" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} />
          <button className="button__in" onClick={handleLogin}>Войти</button>
          {error && <p className="error-message">{error}</p>}
        </div>
      ) : (
        <div>
          <div className="logout-btn">
            <h1>Здравствуйте, {fullName}</h1>
            <button className="button__out" onClick={handleLogout}>Выйти</button>
          </div>

          <h2>Список клиентов</h2>
          <table className="client-table">
            <thead>
              <tr>
                <th>Номер счета</th>
                <th>Фамилия</th>
                <th>Имя</th>
                <th>Отчество</th>
                <th>Дата рождения</th>
                <th>ИНН</th>
                <th>Ответственный</th>
                <th>Статус</th>
                <th>Изменить статус</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.accountNumber}>
                  <td>{client.accountNumber}</td>
                  <td>{client.lastName}</td>
                  <td>{client.firstName}</td>
                  <td>{client.patronymic}</td>
                  <td>{client.birthDate}</td>
                  <td>{client.INN}</td>
                  <td>{client.responsiblePerson}</td>
                  <td>{client.status}</td>
                  <td>
                    <select className="input-field" onChange={e => setStatus(e.target.value)}>
                    <option value="В работе"></option>
                      <option value="В работе">В работе</option>
                      <option value="Отказ">Отказ</option>
                      <option value="Сделка закрыта">Сделка закрыта</option>
                    </select>
                    <button className="button" onClick={() => updateStatus(client.accountNumber)}>Сохранить</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}
    </div>
  );
}

export default App;
