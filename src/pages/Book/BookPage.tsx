import { useParams } from "react-router-dom";
import Header from "../../Components/Header/Header"
import "./BookPage.css"
import { useEffect, useState } from "react";
import { getOneBook } from "../../http";
import { BookDTO } from "../../Models/res/Book";
import { CartDTO } from "../../Models/generic/CartDTO";
import AddToCartButton from "../../Components/AddToCartButton/AddToCartButton";
 import {BookElementProps} from "../../Components/BookElement/BookElement"
import BackButton from "../../Components/BackButton/BackButton";
import Footer from "../../Components/Footer/Footer";

function BookPage(cart: CartDTO) {

    const {bookid} = useParams();
    const [book, setBook] = useState<BookDTO | null>(null);
    const [bookModal, setBookModal] = useState<BookElementProps | null>(null);

    const [disable, setDisablle] = useState<boolean>(false)

    useEffect(() => {
        if(!book) return
        const existingItemIndex = cart.getCart.findIndex(item => item.id === book.id);
        if (existingItemIndex === -1){
            setDisablle(book.stock <= 0)
        }else{
            setDisablle(book.stock - cart.getCart[existingItemIndex].count <= 0)
        }
    },[cart, book])
    useEffect(()=>{

        if(bookid)
            getOneBook(bookid).then(r => {
                if(r.ok){
                    r.json().then(js => {
                        if(js){
                            setBook(js)
                            const bookModal: BookElementProps = {
                                name: js.bookName,
                                image: js.image,
                                price: js.price,
                                stock: js.stock,
                                id: js.id,
                                cart: cart
                            }
                            setBookModal(bookModal)
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
    },[bookid])

    useEffect(()=>{
        if (bookModal){
            const updatedCart: BookElementProps = {...bookModal, cart: cart}
            setBookModal(updatedCart);
        }
    },[cart])


    return (
    <>
        <Header defaultSearchValue={null} setSeatchCataloge={null} getCart={cart.getCart} setCart={cart.setCart}></Header>
        {book?
        <div>
            <div>
                <BackButton></BackButton>
                <h2 className="book-title">{book.bookName}</h2>
            </div>
            <div className="book-container">
                <div className="book-image-title-cover">
                    <div className="book-cover">
                        <img src={book.image} alt={`Обкладинка книги ${book.bookName}`} className="book-cover-image" />
                    </div>
                </div>
            

            <div className="book-details">
            <div className="book-page-stock" style={{color: disable ?  "#8f8f8f" : book.stock >=20 ? "#8eee7b" : "#ff9900" }}>
                        { disable  ? "Немає в наявності"  : book.stock >=20 ?   "В наявності" : "Закінчується" }
                    </div>
            <div className="book-price-item book-detail-item">
                <strong className="book-label book-price-label">Ціна:</strong>
                <span className="book-value book-price-value">{book.price} грн</span>
            </div>
            <AddToCartButton disable={disable} book={bookModal} class="book-add-to-cart-button" classDisable="book-add-to-cart-button-disable"></AddToCartButton>
                
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
        <Footer></Footer>
       </div>
        : <></>}
    </>
    )

}
export default BookPage