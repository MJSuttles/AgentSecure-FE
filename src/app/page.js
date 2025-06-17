'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/utils/context/authContext';
import { getAllLoginsByUserId } from '@/api/loginData';
import { getUserByFirebaseUid } from '@/api/userData';
import LoginCard from '@/components/LoginCard';

function Home() {
  const [logins, setLogins] = useState([]);
  const [dbUserId, setDbUserId] = useState(null);
  const { user } = useAuth();

  const refreshLogins = (resolvedUserId) => {
    getAllLoginsByUserId(resolvedUserId).then((fetchedLogins) => {
      const sortedLogins = fetchedLogins.sort((a, b) => a.vendorName.localeCompare(b.vendorName));
      setLogins(sortedLogins);
    });
  };

  useEffect(() => {
    if (user?.uid) {
      getUserByFirebaseUid(user.uid)
        .then((dbUser) => {
          if (dbUser?.id) {
            setDbUserId(dbUser.id);
            refreshLogins(dbUser.id);
          } else {
            console.error('No matching DB user for UID:', user.uid);
          }
        })
        .catch((err) => {
          console.error('Error fetching user by UID:', err);
        });
    }
  }, [user]);

  return (
    <div className="container text-center my-4" id="logins-page">
      <h1 className="my-3">Home</h1>
      <Link href="/logins/new" passHref>
        <button type="button" className="btn btn-primary my-3">
          Add a Login
        </button>
      </Link>

      <div style={{ width: '70%', margin: '0 auto' }}>
        {logins.map((login) => (
          <LoginCard key={login.id} loginObj={login} onUpdate={() => refreshLogins(dbUserId)} />
        ))}
      </div>
    </div>
  );
}

export default Home;
