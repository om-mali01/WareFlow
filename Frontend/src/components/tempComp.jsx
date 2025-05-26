import React from 'react';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const { user, loading, error } = useSelector((state) => state.userLogin);

  if (loading) return <p>Loading user information...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>No user information available.</p>;
  console.log(user, "this is usr")

  return (
    <div>
      <h1>Welcome, this is your role:  {user.role}!</h1>
      {/* Display other user information as needed */}
    </div>
  );
};

export default UserProfile;
