import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const CartIcon = () => {
    const { cartItems } = useCart();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className='cart-icon'>
            <button onClick={toggleDropdown}>
                <i className='fa fa-shopping-cart'></i>
                {totalItems > 0 && <span className='cart-count'>{totalItems}</span>}
            </button>
            {isDropdownOpen && (
                <div className='cart-dropdown'>
                    <h4>Carrito de Compras</h4>
                    <ul>
                        {cartItems.map((movie) => (
                            <li key={movie.id}>
                                {movie.title} - ${movie.price} x {movie.quantity}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CartIcon;
