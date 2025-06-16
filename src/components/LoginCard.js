'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { Card, Dropdown, ButtonGroup } from 'react-bootstrap';
import { deleteLogin, revealPasswordByLoginId } from '@/api/loginData'; // adjust as needed

export default function LoginCard({ loginObj, onUpdate }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [decryptedPassword, setDecryptedPassword] = useState(null);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${loginObj.username}?`)) {
      deleteLogin(loginObj.id).then(() => onUpdate());
    }
  };

  const handleTogglePassword = async () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      try {
        const revealed = await revealPasswordByLoginId(loginObj.id);
        console.log('Revealed password:', revealed);
        setDecryptedPassword(revealed);
        setShowPassword(true);
      } catch (err) {
        console.error('Failed to reveal password:', err);
      }
    }
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>
          <strong>{loginObj.vendorName}</strong>
        </Card.Title>
        <Card.Text>
          <strong>Username:</strong> {loginObj.username}
          <br />
          <strong>Email:</strong> {loginObj.email}
          <br />
          <strong>Password:</strong>{' '}
          <button type="button" className="btn btn-link p-0 align-baseline" onClick={handleTogglePassword}>
            {showPassword ? decryptedPassword : '[HIDDEN]'}
          </button>
          <br />
          <strong>Reg Approved:</strong> {loginObj.regApproved ? 'Yes' : 'No'}
          <br />
          <strong>Training Complete:</strong> {loginObj.trainingComplete ? 'Yes' : 'No'}
        </Card.Text>

        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
            Options
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => router.push(`/logins/${loginObj.id}`)}>Go to Login</Dropdown.Item>
            <Dropdown.Item onClick={() => router.push(`/logins/edit/${loginObj.id}`)}>Edit Login</Dropdown.Item>
            <Dropdown.Item onClick={handleDelete} className="text-danger">
              Delete Login
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Card.Body>
    </Card>
  );
}

LoginCard.propTypes = {
  loginObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    vendorName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string,
    regApproved: PropTypes.bool.isRequired,
    trainingComplete: PropTypes.bool.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
