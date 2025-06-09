'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { Form } from 'react-bootstrap';
import { useAuth } from '@/utils/context/authContext';
import { createLogin, updateLogin } from '@/api/loginData';

const initialFormState = {
  vendorName: '',
  username: '',
  email: '',
  password: '',
  regApproved: false,
  trainingComplete: false,
};

export default function LoginForm({ obj = initialFormState }) {
  const { user } = useAuth();
  const router = useRouter();

  const [formInput, setFormInput] = useState(obj);

  useEffect(() => {
    if (obj.id) {
      setFormInput(obj); // populate if editing
    }
  }, [obj]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const updatedValue = type === 'checkbox' ? checked : value;

    setFormInput((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateLogin(obj.id, formInput).then(() => router.push('/logins/{obj.id}'));
    } else {
      const payload = { ...formInput, userId: user.id };
      createLogin(payload).then(() => router.push('/logins/new'));
    }
  };

  return (
    <div className="d-flex flex-column align-items-center my-4" id="add-update-logins">
      <h1 className="my-5">{obj.id ? 'Update' : 'Create'} Login</h1>

      <Form onSubmit={handleSubmit} className="text-center" style={{ width: '75%' }}>
        {/* VENDOR NAME INPUT */}
        <Form.Group className="mb-3">
          <Form.Label>Vendor Name</Form.Label>
          <Form.Control type="text" placeholder="Name of vendor" name="vendorName" value={formInput.vendorName || ''} onChange={handleChange} required />
          <Form.Text className="text-muted">required</Form.Text>
        </Form.Group>

        {/* USERNAME INPUT */}
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Username" name="username" value={formInput.username || ''} onChange={handleChange} required />
          <Form.Text className="text-muted">required</Form.Text>
        </Form.Group>

        {/* EMAIL INPUT */}
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" value={formInput.email || ''} onChange={handleChange} required />
          <Form.Text className="text-muted">required</Form.Text>
        </Form.Group>

        {/* PASSWORD INPUT */}
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" name="password" value={formInput.password || ''} onChange={handleChange} required />
          <Form.Text className="text-muted">required</Form.Text>
        </Form.Group>

        {/* REG APPROVED CHECKBOX */}
        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Registration Approved" name="regApproved" checked={formInput.regApproved} onChange={handleChange} />
        </Form.Group>

        {/* TRAINING COMPLETE CHECKBOX */}
        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Training Complete" name="trainingComplete" checked={formInput.trainingComplete} onChange={handleChange} />
        </Form.Group>

        <button className="btn btn-primary" type="submit">
          {obj.id ? 'Update' : 'Create'} Login
        </button>
      </Form>
    </div>
  );
}

LoginForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    vendorName: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    regApproved: PropTypes.bool,
    trainingComplete: PropTypes.bool,
  }),
};
