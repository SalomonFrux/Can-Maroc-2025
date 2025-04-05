import React from 'react';
import UserFromDB from "@/components/admin/UsersFromDB.tsx";

const AdminPage = () => {
  return (
    <div>
      <h1>Admin Page</h1>
      <UserFromDB />
    </div>
  );
}
export default AdminPage;