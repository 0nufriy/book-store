import { CartDTO } from "../../Models/generic/CartDTO"
import "./CartList.css"

function CartList(cart: CartDTO) {
    const handleRemoveFromCart = (id: number) => {
        const updatedCart = cart.getCart.filter((item) => item.id !== id);
        cart.setCart(updatedCart);
    };
  
      const handleCountChange = (id: number, change: number) => {
          const updatedCart = cart.getCart.map((item, index) => {
              if (item.id === id) {
                  const newCount = Math.max(1, item.count + change);
                return { ...item, count: clampCount(newCount, index) };
            }
              return item;
          });
          cart.setCart(updatedCart);
      };
      function clampCount(count: number, id: number){
          return Math.min(Math.max(1, count), cart.getCart[id].stock);
      }

    return (
        <>
        <div className="cart-list-content">
                    {cart.getCart.length === 0 ? (
                      <div className="cart-list-empty-message">Кошик порожній</div>
                    ) : (
                        <ul className="cart-list-items-list">
                            {cart.getCart.map((item) => (
                                <li key={item.id} className="cart-list-item">
                                    <img src={item.image} alt={item.bookName} className="cart-list-item-image" />
                                    <div className="cart-list-item-details">
                                        <p className="cart-list-item-name">{item.bookName}</p>
                                        <p className="cart-list-item-price">Ціна: {item.price} грн</p>
                                        <div className="cart-list-item-quantity">
                                            <button className="cart-list-quantity-button" onClick={() => handleCountChange(item.id, -1)}>-</button>
                                            <span className="cart-list-quantity-value">{item.count}</span>
                                            <button className="cart-list-quantity-button" onClick={() => handleCountChange(item.id, 1)}>+</button>
                                            <button className="cart-list-remove-button" onClick={() => handleRemoveFromCart(item.id)}>Видалити</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="cart-list-modal-footer">
                {cart.getCart.length > 0 && (
                  <p className='cart-list-total'>Загальна вартість: {cart.getCart.reduce((acc,item)=>acc + item.price * item.count,0)} грн</p>
                )}
                  </div>
        </>
    )

}
export default CartList