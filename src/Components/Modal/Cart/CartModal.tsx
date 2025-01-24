import React, { useRef } from 'react';
import './CartModal.css';
import { CartDTO } from '../../../Models/generic/CartDTO';

interface CartModalDTO {
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    cart: CartDTO;
}

function CartModal(props: CartModalDTO) {
    const modalOverlayRef = useRef<HTMLDivElement>(null);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === modalOverlayRef.current) {
            props.setShow(false);
        }
    };

    const handleRemoveFromCart = (id: number) => {
      const updatedCart = props.cart.getCart.filter((item) => item.id !== id);
      props.cart.setCart(updatedCart);
  };

    const handleCountChange = (id: number, change: number) => {
        const updatedCart = props.cart.getCart.map((item, index) => {
            if (item.id === id) {
                const newCount = Math.max(1, item.count + change);
              return { ...item, count: clampCount(newCount, index) };
          }
            return item;
        });
        props.cart.setCart(updatedCart);
    };
    function clampCount(count: number, id: number){
        return Math.min(Math.max(1, count), props.cart.getCart[id].stock);
    }

    return (
        <div className="cart-modal-overlay" ref={modalOverlayRef} onMouseDown={handleOverlayClick}>
            <div className="cart-modal">
                <div className="cart-modal-header">
                    <h2>Кошик</h2>
                    <button className="cart-close-button" onClick={() => { props.setShow(false) }}>
                        <span>×</span>
                    </button>
                </div>

                <div className="cart-modal-content">
                    {props.cart.getCart.length === 0 ? (
                      <div className="cart-empty-message">Кошик порожній</div>
                    ) : (
                        <ul className="cart-items-list">
                            {props.cart.getCart.map((item) => (
                                <li key={item.id} className="cart-item">
                                    <img src={item.image} alt={item.bookName} className="cart-item-image" />
                                    <div className="cart-item-details">
                                        <p className="cart-item-name">{item.bookName}</p>
                                        <p className="cart-item-price">Ціна: {item.price} грн</p>
                                        <div className="cart-item-quantity">
                                            <button className="cart-quantity-button" onClick={() => handleCountChange(item.id, -1)}>-</button>
                                            <span className="cart-quantity-value">{item.count}</span>
                                            <button className="cart-quantity-button" onClick={() => handleCountChange(item.id, 1)}>+</button>
                                            <button className="cart-remove-button" onClick={() => handleRemoveFromCart(item.id)}>Видалити</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="cart-modal-footer">
                {props.cart.getCart.length > 0 && (
                  <p className='cart-total'>Загальна вартість: {props.cart.getCart.reduce((acc,item)=>acc + item.price * item.count,0)} грн</p>
                )}
                  </div>
                 { props.cart.getCart.length !== 0 && <button className="cart-done-button" onClick={() => {}}>Оформити замовлення</button>}

            </div>
        </div>
    );
}

export default CartModal;