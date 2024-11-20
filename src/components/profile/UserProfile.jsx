import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profilepage.css";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedUserEmail = localStorage.getItem("userEmail");

    if (storedUserEmail) {
      // Fetch user data based on stored email
      fetch(`http://localhost:5000/api/users/${storedUserEmail}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("User not found");
          }
          return response.json();
        })
        .then((data) => {
          setUserData(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setError("No user email found");
      navigate("/"); 
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/"); 
  };

  if (loading) {
    return <p className="loading">Loading user data...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src={userData?.image || process.env.PUBLIC_URL + "/images/usuario.png"}
          alt="User Profile"
          className="profile-image"
        />
        <h2 className="profile-name">{userData?.name}</h2>
        <p className="profile-email">Correo electronico: {userData?.email}</p>
        <p className="profile-role">Rol: {userData?.role}</p>

        {userData?.subscription && (
          <p className="profile-subscription">Subscription Plan: {userData.subscription}</p>
        )}

        <button onClick={handleLogout} className="logout-button">Salir</button>
      </div>
    </div>
  );
};

export default UserProfile;
