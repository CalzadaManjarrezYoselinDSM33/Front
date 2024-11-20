import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./header.css";


const Header = () => {
  const [Mobile, setMobile] = useState(false);
  const [userData, setUserData] = useState(null); 
  const [searchTerm, setSearchTerm] = useState("");
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const userEmail = JSON.parse(localStorage.getItem("userInfo"))?.email;

  useEffect(() => {
    if (userEmail) {
      fetch(`http://localhost:5000/api/users/${userEmail}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("User not found");
        })
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [userEmail]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const goToCart = () => {
    navigate("/pago");
  };

  const goToProfile = () => {
    navigate("/profile" );
  };

  return (
    <>
      <header>
        <div className="container flexSB">
          <nav className="flexSB">
            <div className="logo">
              <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="Logo" />
            </div>
            <ul
              className={Mobile ? "navMenu-list" : "flexSB"}
              onClick={() => setMobile(false)}
            >
              <li><a href="/home">Inicio</a></li>
              <li><a href="/series">Series</a></li>
              <li><a href="/peliculas">Películas</a></li>
              <li><a href="/contact">Contacto</a></li>
            </ul>
            <button className="toggle" onClick={() => setMobile(!Mobile)}>
              {Mobile ? <i className="fa fa-times"></i> : <i className="fa fa-bars"></i>}
            </button>
          </nav>

          <div className="account flexSB">
          <div className="cart-container" onClick={goToCart}>
  <FontAwesomeIcon icon={faShoppingCart} className="icon" />
  {getTotalItems() > 0 && (
    <span className="cart-badge">{getTotalItems()}</span>
  )}
</div>
  <div 
    className="user-info" 
    onClick={goToProfile} 
    style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
  >
    <FontAwesomeIcon icon={faUser} className="icon" />
    {userData && <span className="username" style={{ marginLeft: "10px" }}>{userData.name}</span>}
  </div>
</div>

        </div>
      </header>
    </>
  );
};

export default Header;
