'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { getLoginById, deleteLogin } from '@/api/loginData';

export default function ViewLogin({ params }) {
  const [login, setLogin] = useState(null);
  const router = useRouter();
  const { id } = params;

  const refreshLogin = async () => {
    try {
      const fetchedLogin = await getLoginById(id);
      setLogin(fetchedLogin);
    } catch (error) {
      console.error('Error fetching login:', error);
    }
  };

  useEffect(() => {
    refreshLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDelete = async () => {
    if (!login) return;

    if (window.confirm(`Delete login for vendor "${login.vendorName}"?`)) {
      deleteLogin(login.id).then(() => {
        console.log(`Login for ${login.vendorName} deleted.`);
        router.push('/');
      });
    }
  };

  return (
    <div className="text-center my-3">
      <h1>Login Details</h1>
      {login ? (
        <div className="my-4 login-info">
          <p>
            Vendor: <strong>{login.vendorName}</strong>
          </p>
          <p>
            Username: <strong>{login.username}</strong>
          </p>
          <p>
            Email: <strong>{login.email}</strong>
          </p>
          <p>
            Password: <strong>{login.password}</strong>
          </p>
          <p>
            Registration Approved: <strong>{login.regApproved ? 'Yes' : 'No'}</strong>
          </p>
          <p>
            Training Complete: <strong>{login.trainingComplete ? 'Yes' : 'No'}</strong>
          </p>
        </div>
      ) : (
        <p>Login is unavailable or was deleted.</p>
      )}

      <div className="d-flex justify-content-center align-items-center gap-3 my-3">
        <svg onClick={handleDelete} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16" style={{ cursor: 'pointer' }}>
          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
        </svg>

        <button type="button" className="btn btn-secondary" onClick={() => router.push('/')}>
          Back to Logins
        </button>
      </div>

      <hr className="my-4" />
    </div>
  );
}

ViewLogin.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
