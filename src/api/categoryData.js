import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllCategories = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(data); // or Object.values(data) if backend returns an object
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

const getCategoryById = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/categories/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const createCategory = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/categories`, {
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

const updateCategory = (id, payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/categories/${id}`, {
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

const deleteCategory = async (id) => {
  const response = await fetch(`${endpoint}/api/categories/${id}`, {
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

export { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
