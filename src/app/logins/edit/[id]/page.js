'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../../../../components/forms/LoginForm';
import { getLoginById } from '../../../../api/loginData';

export default function EditLogin({ params }) {
  const { id: loginId } = params;
  const [formInput, setFormInput] = useState(null);

  useEffect(() => {
    getLoginById(loginId).then(setFormInput);
  }, [loginId]);

  return (
    <div>
      {formInput ? (
        <>
          <LoginForm obj={formInput} />
          <hr />
          {/* <ChangePasswordForm loginId={loginId} /> */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

EditLogin.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
