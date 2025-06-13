'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { changePassword } from '@/api/loginData';

export default function ChangePasswordForm({ loginId }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setMessage('New password and confirmation do not match.');
      return;
    }

    try {
      const result = await changePassword({
        loginId: Number(loginId), // ✅ this line
        newPassword,
        confirmNewPassword,
      });
      setMessage(result.message);
    } catch (err) {
      setMessage(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="d-flex flex-column align-items-center my-5">
      <h2 className="mb-4 text-center">Change Password</h2>
      <form onSubmit={handleSubmit} className="text-center w-50">
        <div className="mb-3">
          <input type="password" placeholder="New Password" className="form-control" onChange={(e) => setNewPassword(e.target.value)} required />
        </div>
        <div className="mb-3">
          <input type="password" placeholder="Confirm New Password" className="form-control" onChange={(e) => setConfirmNewPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-outline-light">
          Change Password
        </button>
        {message && <p className="mt-3 text-white">{message}</p>}
      </form>
    </div>
  );
}

ChangePasswordForm.propTypes = {
  loginId: PropTypes.number.isRequired,
};
