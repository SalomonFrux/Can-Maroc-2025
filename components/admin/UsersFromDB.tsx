// components/admin/UserList.tsx
'use client'; // This is a client component because it will interact with Supabase in the browser
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'; // Assuming your Supabase client is set up here

interface Registration {
  id: string;
  user_id: string;
  current_step: number;
  form_data: any; // You might want to create a more specific type for your form data
  created_at: string;
  updated_at: string;
}

const UserList = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('registrations')
          .select('*'); // Select all columns

        if (error) {
          setError(error.message);
        } else {
          setRegistrations(data as Registration[]);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  if (loading) {
    return <p>Chargement des données...</p>;
  }

  if (error) {
    return <p>Erreur de chargement de donnée: {error}</p>;
  }

  return (
    <div>
      <h2>Toute les donneés des utilisateurs </h2>
      {registrations.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Current Step</th>
              <th>Form Data</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((registration) => (
              <tr key={registration.id}>
                <td>{registration.id}</td>
                <td>{registration.user_id}</td>
                <td>{registration.current_step}</td>
                <td>
                  <pre>{JSON.stringify(registration.form_data, null, 2)}</pre>
                </td>
                <td>{registration.created_at}</td>
                <td>{registration.updated_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No user registrations found.</p>
      )}
    </div>
  );
};

export default UserList;