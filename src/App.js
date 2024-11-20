import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import HomePage from "./home/HomePage";
import SinglePage from "./components/watch/SinglePage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import SuscripcionPage from "./components/suscripcion/SuscripcionPage";
import SeriesPage from "./components/series/SeriesPage";
import PeliculasPage from "./components/peliculas/PeliculasPage";
import AdminForm from "./components/admin/AdminForm";
import LoginPage from "./components/login/LoginPage";
import UserProfile from "./components/profile/UserProfile";
import ContactPage from "./components/contacto/ContactPage";
import Car from "./components/carrito/Checkout";

function App() {
  useEffect(() => {
    document.title = "FreeMovie";
  }, []);

  const location = useLocation();

  const hideHeaderRoutes = ["/", "/sus"];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader && <Header />} 
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/singlepage/:id" element={<SinglePage />} />
        <Route path="/sus" element={<SuscripcionPage />} />
        <Route path="/series" element={<SeriesPage />} />
        <Route path="/peliculas" element={<PeliculasPage />} />
        <Route path="/admin" element={<AdminForm />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/pago" element={<Car />} />
      </Routes>
      <Footer />
    </>
  );
}

function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWithRouter;
