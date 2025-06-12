'use client';

import React, { useState } from 'react';

import PropTypes from 'prop-types';

export default function ChangePasswordForm({ loginId }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ loginId, currentPassword, newPassword }),
    });

    const result = await response.text();
    setMessage(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="password" placeholder="Current Password" onChange={(e) => setCurrentPassword(e.target.value)} />
      <input type="password" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} />
      <button type="submit">Change Password</button>
    </form>
  );
}

ChangePasswordForm.propTypes = {
  loginId: PropTypes.number.isRequired, // or PropTypes.string if it's a string
};
