import { useParams } from "react-router-dom";
import Header from "../../Components/Header/Header"
import "./BookPage.css"
import { useEffect, useState } from "react";
import { getOneBook } from "../../http";
import { BookDTO } from "../../Models/res/Book";


function BookPage() {

    const {bookid} = useParams();
    const [book, setBook] = useState<BookDTO | null>(null);

    useEffect(()=>{

        if(bookid)
            getOneBook(bookid).then(r => {
                if(r.ok){
                    r.json().then(js => {
                        if(js){
                            setBook(js)
                        }else{
                            //error
                        }
                    })
                }else{
                    //error
                }
            })
        else{
            //error
        }
    },[])

    return (
    <>
        <Header></Header>
        {book?
        <div>
            <h2 className="book-title">{book.bookName}</h2>
            <div className="book-container">
                <div className="book-image-title-cover">
                    <div className="book-cover">
                        <img src={book.image} alt={`Обкладинка книги ${book.bookName}`} className="book-cover-image" />
                    </div>
                </div>
            

            <div className="book-details">
            <div className="book-price-item book-detail-item">
                    <strong className="book-label book-price-label">Ціна:</strong>
                    <span className="book-value book-price-value">{book.price} грн</span>
                </div>
                <button className="book-add-to-cart-button">До кошику</button>
                <div className="book-detail-item">
                    <strong className="book-label">Автор:</strong>
                    <span className="book-value">{book.autor}</span>
                </div>
                <div className="book-detail-item">
                    <strong className="book-label">Жанр:</strong>
                    <span className="book-value">{book.gener.genreName}</span>
                </div>
                <div className="book-detail-item">
                    <strong className="book-label">Опис:</strong>
                    <p className="book-value book-description">{book.description}</p>
                </div>
                <div className="book-detail-item">
                    <strong className="book-label">Кількість сторінок:</strong>
                    <span className="book-value">{book.pagecount}</span>
                </div>
                <div className="book-detail-item">
                    <strong className="book-label">Формат:</strong>
                    <span className="book-value">{book.format}</span>
                </div>
                <div className="book-detail-item">
                    <strong className="book-label">Обкладинка:</strong>
                    <span className="book-value">{book.cover}</span>
                </div>
                <div className="book-detail-item">
                    <strong className="book-label">ISBN:</strong>
                    <span className="book-value">{book.isbn}</span>
                </div>
            </div>
        </div>
       </div>
        : <></>}
    </>
    )

}
export default BookPage