'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { Form } from 'react-bootstrap';
import { useAuth } from '@/utils/context/authContext';
import { createLogin, updateLogin } from '@/api/loginData';
import { getAllVendors } from '@/api/vendorData';
import ChangePasswordForm from './ChangePasswordForm';

const initialFormState = {
  vendorId: '',
  username: '',
  email: '',
  password: '',
  regApproved: false,
  trainingComplete: false,
};

export default function LoginForm({ obj = initialFormState }) {
  const { user } = useAuth();
  const router = useRouter();
  const isEditMode = !!obj.id;

  const [formInput, setFormInput] = useState(obj);
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    getAllVendors().then((data) => {
      const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
      setVendors(sorted);
    });

    if (obj.id) {
      setFormInput(obj);
    }
  }, [obj]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormInput((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // Callback for ChangePasswordForm
  const handlePasswordChanged = () => {
    setFormInput((prev) => ({
      ...prev,
      password: '[HIDDEN]',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      user: { uid: user.uid },
      vendorId: parseInt(formInput.vendorId, 10),
      username: formInput.username,
      email: formInput.email,
      regApproved: formInput.regApproved,
      trainingComplete: formInput.trainingComplete,
    };

    // Only include password if it's not blank and not '[HIDDEN]'
    if (typeof formInput.password === 'string' && formInput.password.trim() !== '' && formInput.password !== '[HIDDEN]') {
      payload.password = formInput.password;
    }

    const redirectPath = formInput.id ? `/logins/${formInput.id}` : '/';

    const submitAction = formInput.id ? updateLogin(formInput.id, payload) : createLogin(payload);

    submitAction.then(() => {
      setFormInput({ ...initialFormState, password: '' });
      router.push(redirectPath);
    });
  };

  return (
    <div className="d-flex flex-column align-items-center my-4" id="add-update-logins">
      <h1 className="my-5">{isEditMode ? 'Update' : 'Create'} Login</h1>

      <Form onSubmit={handleSubmit} className="text-center" style={{ width: '75%' }}>
        <Form.Group className="mb-3">
          <Form.Label>Vendor</Form.Label>
          <Form.Select name="vendorId" value={formInput.vendorId} onChange={handleChange} required>
            <option value="">Select a Vendor</option>
            {vendors.map((vendor) => (
              <option key={vendor.id} value={vendor.id}>
                {vendor.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Username" name="username" value={formInput.username} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email" name="email" value={formInput.email} onChange={handleChange} required />
        </Form.Group>

        {/* Password field only during creation */}
        {!isEditMode && (
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" value={formInput.password} onChange={handleChange} required />
          </Form.Group>
        )}

        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Registration Approved" name="regApproved" checked={formInput.regApproved} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Training Complete" name="trainingComplete" checked={formInput.trainingComplete} onChange={handleChange} />
        </Form.Group>

        <button className="btn btn-primary" type="submit">
          {isEditMode ? 'Update' : 'Create'} Login
        </button>
      </Form>

      {/* Show Change Password and Back button only in edit mode */}
      {isEditMode && (
        <>
          <hr className="my-5" />
          <div className="d-flex justify-content-center align-items-center gap-3">
            <ChangePasswordForm loginId={obj.id} onPasswordChanged={handlePasswordChanged} />
            <button type="button" className="btn btn-secondary ms-3" onClick={() => router.push('/')}>
              Back to Logins
            </button>
          </div>
        </>
      )}
    </div>
  );
}

LoginForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    vendorId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    username: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    regApproved: PropTypes.bool,
    trainingComplete: PropTypes.bool,
  }),
};
