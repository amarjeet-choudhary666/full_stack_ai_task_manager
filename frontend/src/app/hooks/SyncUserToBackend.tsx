'use client';

import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';

const SyncUserToBackend = () => {
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    const syncUser = async () => {
      try {
        const token = await getToken();

        if (!token) {
          console.warn('❌ No Clerk token found');
          return;
        }

        await axios.post('http://localhost:5000/v1/users/me', {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('✅ Synced user to backend');
      } catch (error) {
        console.error('❌ Error syncing user:', error);
      }
    };

    if (isSignedIn) {
      syncUser();
    }
  }, [getToken, isSignedIn]);

  return null;
};

export default SyncUserToBackend;
