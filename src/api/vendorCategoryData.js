import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const createVendorCategory = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/vendorCategories`, {
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

const deleteVendorCategory = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/vendorCategories/${id}`, {
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

export { createVendorCategory, deleteVendorCategory };
