import { useEffect, useRef, useState } from "react"
import "./Header.css"
import AuthModal from "../Modal/Auth/AuthModal"
import RegistModal from "../Modal/Registr/RegistModal"
import { useNavigate } from "react-router-dom"
import CartModal from "../Modal/Cart/CartModal"
import { getSearchBooks } from "../../http"
import { BookDTO } from "../../Models/res/Book"
import { CartElementDTO } from "../../Models/generic/CartElementDTO"

interface HeaderDTO {
    getCart: CartElementDTO[]
    setCart: React.Dispatch<React.SetStateAction<CartElementDTO[]>>,
    setSeatchCataloge: React.Dispatch<React.SetStateAction<string>> | null
    defaultSearchValue: string | null
}

function Header(cart: HeaderDTO) {

    useEffect(()=> {
        let price: number = 0;
        cart.getCart.forEach(item => {
            price += item.price * item.count
        })
        setCartPrice(price)
    },[cart])

    const [cartPrice, setCartPrice] = useState<number>(0)

    const [showAuthModal, setAuthModal] = useState<boolean>(false)
    const [showRegistModal, setRegistModal] = useState<boolean>(false)
    const [showCartModal, setCartModal] = useState<boolean>(false)
    const navigate = useNavigate()
    function CabinetButton(){
        if(!localStorage.getItem("TOKEN")) {
            setAuthModal(true)
            return
        }
    }


    const [searchValue, setSearchValue] = useState<string>(cart.defaultSearchValue? cart.defaultSearchValue :"");
    const [searchResults, setSearchResults] = useState<BookDTO[] | null>(null);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const searchContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchBooks = async () => {
           if (searchValue.length >= 3) {
            getSearchBooks(searchValue).then(r => {
                if(r.ok){
                    r.json().then(js => {
                        setSearchResults(js)
                    })
                }else{
                    //error
                }
            })

           } else {
             setSearchResults([]);
           }
        };

        fetchBooks();
    }, [searchValue]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
        if(cart.setSeatchCataloge){
            cart.setSeatchCataloge(event.target.value)
        }
    };

    const handleInputFocus = () => {
        setIsFocused(true);
    }
    function countStock(stock: number, id: number): number{
         const existingItemIndex = cart.getCart.findIndex(item => item.id === id);
              if (existingItemIndex === -1){
                  return stock
              }else{
                  return stock - cart.getCart[existingItemIndex].count
              }
        
    }
    useEffect(() => {
        const handleMouseDown = (event: MouseEvent) => {
          if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
            setIsFocused(false);
          }
        };
        document.addEventListener('mousedown', handleMouseDown);
        return () => {
          document.removeEventListener('mousedown', handleMouseDown);
        };
      }, []);

    return (
    <div className="header-container">
        <div onClick={()=> {navigate("/")}} className="header-item" style={{ fontSize: '20px', fontWeight: 'bold', textTransform: 'uppercase', cursor: "pointer" }}>
            Книжковий
        </div>
        <button onClick={()=> {navigate("/cataloge")}} className="header-button header-item">Каталог</button>
        <div className="search-container" ref={searchContainerRef}>
            <input
                className="header-input"
                type="text"
                placeholder="Знайдіть свою книжку..."
                value={searchValue}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
            />
            {isFocused && searchResults && searchResults.length > 0 && (
                <ul className="search-results">
                    {searchResults && searchResults.map((book) => (
                        <li key={book.id} className="search-result-item" onClick={() => {navigate("/book/" + book.id); setIsFocused(false)}}>
                            <img className="search-results-image" src={book.image}/>
                            <div className="search-result-info">
                                <div>{book.bookName}</div>
                                <div style={{color: countStock(book.stock, book.id) == 0 ?  "#8f8f8f" : countStock(book.stock, book.id)  >=20 ? "#8eee7b" : "#ff9900" }}>
                                    { countStock(book.stock, book.id)  == 0  ? "Немає в наявності"  : countStock(book.stock, book.id)  >=20 ?   "В наявності" : "Закінчується" }
                                </div>
                                <div className="search-result-price" >{book.price} грн.</div>
                                <div className="search-result-author"> by {book.autor}</div>
                            </div>
                        </li>
                    ))}
                    <li className="search-result-item" onClick={() => {navigate("/cataloge", { state: { search: searchValue } }); setIsFocused(false)}}>
                        <div className="search-result-show-more" >Подивитися ще</div>
                    </li>
                </ul>
            )}
             {isFocused && searchResults && searchResults.length === 0 && searchValue.length >=3 && (
                <div className='search-results'>
                     <p className="search-result-not-found">Нічого не знайдено</p>
                </div>

             )}
        </div>
        <div className="header-button-group">
            <button onClick={() => {setCartModal(true)}} className="header-button header-item">Кошик: {cartPrice} грн</button>
            <button onClick={CabinetButton} className="header-button header-item">Особистий кабінет</button>
        </div>
        {showAuthModal ? <AuthModal setShow={setAuthModal} setRegistrShow={setRegistModal}></AuthModal> : <></>}
        {showRegistModal ? <RegistModal setShow={setRegistModal} setLoginShow={setAuthModal}></RegistModal> : <></>}
        {showCartModal ? <CartModal cart={cart} setShow={setCartModal}></CartModal> : <></>}
    </div>
    )

}
export default Header