import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllVendors = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/vendors`, {
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

const getVendorById = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/vendors/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const createVendor = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/vendors`, {
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

const updateVendor = (id, payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/vendors/${id}`, {
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

const deleteVendor = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/vendors/${id}`, {
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

export { getAllVendors, getVendorById, createVendor, updateVendor, deleteVendor };
