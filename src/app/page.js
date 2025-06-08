'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/utils/context/authContext';
import { getAllLoginsByUserId } from '@/api/loginData';
import LoginCard from '@/components/LoginCard';

function Home() {
  const [logins, setLogins] = useState([]);
  const { user } = useAuth();

  const refreshLogins = () => {
    getAllLoginsByUserId(user.id).then((fetchedLogins) => {
      const sortedLogins = fetchedLogins.sort((a, b) => a.vendorName.localeCompare(b.vendorName));
      setLogins(sortedLogins);
    });
  };

  useEffect(() => {
    if (user) refreshLogins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="container text-center my-4" id="logins-page">
      <h1 className="my-3">Home</h1>
      <Link href="/logins/new" passHref>
        <button type="button" className="btn btn-primary my-3">
          Add a Login
        </button>
      </Link>

      {/* Shared wrapper ensures perfect alignment */}
      <div style={{ width: '70%', margin: '0 auto' }}>
        {/* Header Row */}
        <div className="row fw-bold border-bottom text-start" style={{ height: '3rem' }}>
          <div className="col">Vendor</div>
          <div className="col">Username</div>
          <div className="col">Email</div>
          <div className="col">Password</div>
          <div className="col">Reg Approved</div>
          <div className="col">Training Complete</div>
          <div className="col">Actions</div>
        </div>

        {/* Login Cards */}
        {logins.map((login) => (
          <LoginCard key={login.id} loginObj={login} onUpdate={refreshLogins} />
        ))}
      </div>
    </div>
  );
}

export default Home;
