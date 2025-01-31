import React, { useRef, useState } from 'react';
import './AddToCartModal.css';
import { BookElementProps } from '../../BookElement/BookElement';
import { CartElementDTO } from '../../../Models/generic/CartElementDTO';

interface AddToCartModal {
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    book: BookElementProps
}

function AddToCartModal(props: AddToCartModal) {
    const [count, setCount] = useState<number>(1);
    const modalOverlayRef = useRef<HTMLDivElement>(null);
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        props.setShow(false);
        const toCart: CartElementDTO = {
            id: props.book.id,
            bookName: props.book.name,
            image: props.book.image,
            price: props.book.price,
            count: count,
            stock: props.book.stock
        }
        props.book.cart.setCart( prev => {
            const existingItemIndex = prev.findIndex(item => item.id === toCart.id);

            if (existingItemIndex !== -1) {
                return prev.map((item, index) => 
                    index === existingItemIndex 
                        ? { ...item, count: item.count + toCart.count } 
                        : item
                );
            } else {
                return [...prev, toCart];
            }
        })
    }
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === modalOverlayRef.current) {
            props.setShow(false);
        }
    };

    function clampCount(count: number){
        const existingItemIndex = props.book.cart.getCart.findIndex(item => item.id === props.book.id);
        if (existingItemIndex !== -1)
            return Math.min(Math.max(1, count), props.book.stock - props.book.cart.getCart[existingItemIndex].count);
        else
            return Math.min(Math.max(1, count), props.book.stock);
    }

    const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newCount = parseInt(e.target.value, 10);
        clampCount(newCount)
      };
    const handleAdjustCount = (adjustment: number) => {
        setCount(clampCount(count + adjustment));
    }

    return (
        <div className="add-cart-modal-overlay" ref={modalOverlayRef} onMouseDown={handleOverlayClick}>
        <div className="add-cart-modal">
            <div className="add-cart-modal-header">
                <h2>Додати до Кошика</h2>
                <button className="add-cart-close-button" onClick={() => {props.setShow(false)}}>
                    <span>×</span>
                </button>
            </div>
            
            <div className="add-cart-modal-content">
              <div className="add-cart-book-info">
                <img src={props.book.image} alt={props.book.name} className="add-cart-book-image" />
                <div className="add-cart-book-details">
                  <p className="add-cart-book-name">{props.book.name}</p>
                  <p className="add-cart-book-price">Ціна: {props.book.price} ₴</p>
                  <form onSubmit={handleSubmit}>
                    <div className="add-cart-form-group">
                        <label>Кількість</label>
                    </div>
                    <div className="add-cart-input-group">
                        <button
                        type="button"
                        className="add-cart-button-adjust"
                        onClick={() => handleAdjustCount(-1)}
                        >
                        -
                        </button>
                        <input
                        className="add-cart-input"
                        type="number"
                        id="count"
                        value={count}
                        onChange={handleCountChange}
                        min="1"
                        />
                        <button
                        type="button"
                        className="add-cart-button-adjust"
                        onClick={() => handleAdjustCount(1)}
                        >
                        +
                        </button>
                    </div>
                    <button type="submit" className="add-cart-button">
                        Додати до кошика
                    </button>
                    </form>
                </div>
              </div>
          </div>
        </div>
    </div>
    );
}

export default AddToCartModal;