import React from 'react';

const Logout = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/logout', {
        method: 'POST',
        credentials: 'include' // Include cookies (if using session-based auth)
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
