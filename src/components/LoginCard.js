'use client';

import React from 'react';
import Link from 'next/link';
import { Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { deleteLogin } from '@/api/loginData';

export default function LoginCard({ loginObj, onUpdate }) {
  const deleteLoginFromView = () => {
    if (window.confirm(`Delete ${loginObj.vendorName}?`)) {
      deleteLogin(loginObj.id).then(() => {
        onUpdate();
      });
    }
  };

  return (
    <div className="row align-items-center border my-2" style={{ width: '100%', height: '6rem' }}>
      <div className="col">
        <p className="mb-0">{loginObj.vendorName}</p>
      </div>
      <div className="col">
        <p className="mb-0">{loginObj.username}</p>
      </div>
      <div className="col">
        <p className="mb-0">{loginObj.email}</p>
      </div>
      <div className="col">
        <p className="mb-0">{loginObj.password}</p>
      </div>
      <div className="col">
        <p className="mb-0">{loginObj.regApproved ? 'Yes' : 'No'}</p>
      </div>
      <div className="col">
        <p className="mb-0">{loginObj.trainingComplete ? 'Yes' : 'No'}</p>
      </div>
      <div className="col">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm" />
          <Dropdown.Menu>
            <Dropdown.Item as="div">
              <Link href={`/logins/${loginObj.id}`} passHref>
                Go to Login
              </Link>
            </Dropdown.Item>
            <Dropdown.Item as="div">
              <Link href={`/logins/edit/${loginObj.id}`} passHref>
                Edit Login
              </Link>
            </Dropdown.Item>
            <Dropdown.Item onClick={deleteLoginFromView}>Delete Login</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

LoginCard.propTypes = {
  loginObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    vendorName: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    regApproved: PropTypes.bool,
    trainingComplete: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
