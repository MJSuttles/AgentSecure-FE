import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllLoginsByUserId = (userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/logins/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

const getLoginById = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/logins/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const createLogin = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/logins`, {
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

const updateLogin = (id, payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/logins/${id}`, {
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

const deleteLogin = async (id) => {
  const response = await fetch(`${endpoint}/api/logins/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export { getAllLoginsByUserId, getLoginById, createLogin, updateLogin, deleteLogin };
