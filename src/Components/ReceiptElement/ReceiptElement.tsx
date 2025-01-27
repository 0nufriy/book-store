import { useRef, useState } from "react";
import { ReceiptDTO } from "../../Models/res/ReceiptDTO";
import "./ReceiptElement.css"
import { UpdateStatus } from "../../http";

interface ReceiptProps {
    receipt: ReceiptDTO;
    isAdmin: boolean;
  }
const ReceiptComponent: React.FC<ReceiptProps> = ({ receipt, isAdmin }) => {
    const [isBooksExpanded, setIsBooksExpanded] = useState(false);
    const [receiptState, setReceiptState] = useState<ReceiptDTO>(receipt);
    const button1Ref = useRef(null)
    const button2Ref = useRef(null)
  
    const toggleBooksExpansion = (e: React.MouseEvent<HTMLDivElement>) => {
      if(e.target != button1Ref.current && e.target != button2Ref.current)
        setIsBooksExpanded(!isBooksExpanded);
    };
  
    const statusMap: { [key: number]: string } = {
      0: 'Очікує на обробку',
      1: 'В обробці',
      2: 'Відправлено',
      3: 'Скасовано'
    };
  
    function changeStatus(){
      UpdateStatus(receiptState.id, receiptState.status + 1).then(r => {
        if(r.ok){
          setReceiptState({...receiptState, status: receiptState.status +1})
        }else{
          //error
        }
      })
    }
    function cancelOrder(){
      if(receiptState.status == 0){
        UpdateStatus(receiptState.id, 3).then(r => {
          if(r.ok){
            setReceiptState({...receiptState, status: 3})
          }else{
            //error
          }
        })
      }
    }

    return (
      <div className="receipt-element-container" onClick={toggleBooksExpansion}>
        <div className="receipt-element-header" >
          <p className="receipt-element-id">Замовлення № {receiptState.id}</p>
          <p className="receipt-element-address">Адреса доставки: {receiptState.address}</p>
          {isAdmin && 
            <div>
              <p className="receipt-element-user">Користувач: {receiptState.user?.name}</p>
              <p className="receipt-element-user">Email: {receiptState.user?.email}</p>
              <p className="receipt-element-user">Телефон: {receiptState.user?.phone}</p>
            </div>}
          <div>
            <p className="receipt-element-status" style={{color: receiptState.status == 0 ? "#e0982e"  : receiptState.status == 1 ? "#e0c82e" : receiptState.status == 2 ? "#61982b" : "red" }} >{statusMap[receiptState.status] || 'Невідомий статус'}</p>
            {isAdmin && receiptState.status < 2 && <button ref={button1Ref} className="receipt-element-status-button" onClick={changeStatus}>Позначити { receiptState.status == 0 ? "\"В обробці\"" : "\"Відправлено\""}</button> } 
            {isAdmin && receiptState.status < 1 && <button ref={button2Ref} className="receipt-element-status-button receipt-element-cancel-button" onClick={cancelOrder}>Скасувати</button>}
          </div>
          <div className="receipt-element-books-total">
              Сума чеку: {receiptState.books.reduce((sum, book) => sum + book.price * book.count, 0)} грн
            </div>
        </div>
  
        {isBooksExpanded && (
          <div className="receipt-element-books-list">
            <p className="receipt-element-books-header">Товари в чеку:</p>
            <ul>
              {receiptState.books.map((book) => (
                <li key={book.id} className="receipt-element-book-item">
                  <img src={book.image} alt={book.bookName} className="receipt-element-book-image" />
                  <div className="receipt-element-book-details">
                    <p className="receipt-element-book-name">{book.bookName}</p>
                    <p className="receipt-element-book-author">Автор: {book.autor}</p>
                    <p className="receipt-element-book-price">Ціна: {book.price} грн</p>
                    <p className="receipt-element-book-count">Кількість: {book.count}</p>
                    <div className="receipt-element-books-price-count">
                        Сума: {book.price * book.count} грн
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
          </div>
        )}
      </div>
    );
  };
  
  export default ReceiptComponent;