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

const getLoginById = async (id) => {
  const res = await fetch(`${endpoint}/api/logins/${id}`);
  if (!res.ok) throw new Error('Failed to fetch login');
  return res.json();
};

const createLogin = (payload) => {
  console.log('Creating login with payload:', payload);
  return new Promise((resolve, reject) => {
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
};

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

const revealPasswordById = async (id) => {
  const res = await fetch(`${endpoint}/api/logins/reveal-password/${id}`);
  if (!res.ok) throw new Error('Failed to reveal password');
  return res.text(); // since your endpoint returns plain string, not JSON
};

const changePassword = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/logins/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        loginId: Number(payload.loginId), // ✅ ensure it's a number
        newPassword: payload.newPassword,
        confirmNewPassword: payload.confirmNewPassword,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            reject(new Error(error.message || 'Password update failed'));
          });
        }
        return response.json();
      })
      .then(resolve)
      .catch(reject);
  });

export { getAllLoginsByUserId, getLoginById, createLogin, updateLogin, deleteLogin, revealPasswordById, changePassword };
