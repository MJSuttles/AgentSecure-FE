import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getUserById = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const createUser = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const updateUser = (id, payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const deleteUser = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 204) {
          resolve(null);
        } else {
          response.json().then(reject);
        }
      })
      .catch(reject);
  });

export { getUserById, createUser, updateUser, deleteUser };
