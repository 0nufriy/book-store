import React, { useRef } from 'react';
import './CartModal.css';
import { CartDTO } from '../../../Models/generic/CartDTO';
import { useNavigate } from 'react-router-dom';
import CartList from '../../CartList/CartList';

interface CartModalDTO {
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    cart: CartDTO;
}

function CartModal(props: CartModalDTO) {
    const modalOverlayRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate()

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === modalOverlayRef.current) {
            props.setShow(false);
        }
    };

    return (
        <div className="cart-modal-overlay" ref={modalOverlayRef} onMouseDown={handleOverlayClick}>
            <div className="cart-modal">
                <div className="cart-modal-header">
                    <h2>Кошик</h2>
                    <button className="cart-close-button" onClick={() => { props.setShow(false) }}>
                        <span>×</span>
                    </button>
                </div>

                <CartList getCart={props.cart.getCart} setCart={props.cart.setCart}></CartList>
                 { props.cart.getCart.length !== 0 && <button className="cart-done-button" onClick={() => {navigate("/orderConfirm")}}>Оформити замовлення</button>}

            </div>
        </div>
    );
}

export default CartModal;