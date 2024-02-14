import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

function ProtectedRoute() {
  
    const location = useLocation();
    const userTypes = location.state;
  
    useEffect(() => {
      console.log("states:", userTypes);
    }, [userTypes]);
  return (
    <div>ProtectedRoute</div>
  )
}

export default ProtectedRoute