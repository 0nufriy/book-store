import { useEffect, useState } from "react"
import BookElement from "../../Components/BookElement/BookElement"
import Genre from "../../Components/Ganre/Genre"
import Header from "../../Components/Header/Header"
import "./MainPage.css"
import { getFiveGenre, getSomeBooks } from "../../http"
import { BookDTO } from "../../Models/res/Book"
import { GenreDTO } from "../../Models/res/Genre"
import { CartDTO } from "../../Models/generic/CartDTO"



function  MainPage(cart: CartDTO) {
    const [books, setBooks] = useState<BookDTO[] | null>(null)
    const [genre, setGenre] = useState<GenreDTO[] | null>(null)
   
    const [iter, setIter] = useState<number>(1)
    const [showLoadButton, setShowLoadButton] = useState<boolean>(false)

    function load() {
        setShowLoadButton(false)
        getSomeBooks(5,iter).then(res =>{
            if(!res.ok){
                //error
            }else{
                res.json().then(js => {
                    
                    setBooks((prevArray) => [...(prevArray || []), ...js]);
                    setIter(iter + 1)    
                    if(js.length != 0) setShowLoadButton(true)                
                })
            }
        })
    }

    useEffect(()=> {
        if(books && books?.length % 5 != 0){
            setIter(-1)
        }
    },[books])

    useEffect(() => {
        setIter(1)
        getSomeBooks(5,iter).then(res =>{
            if(!res.ok){
                //error
            }else{
                res.json().then(js => {
                    setBooks(js);
                    setIter(iter + 1)
                    if(js.length != 0) setShowLoadButton(true)
                })
            }
        })
        getFiveGenre().then(res => {
            if(!res.ok){
                //error
            }else{
                res.json().then(js => {
                    setGenre(js)
                })
            }
        })
    },[])

    return (
        <>
            <Header onLogin={()=> {}} defaultSearchValue={null} setSeatchCataloge={null} getCart={cart.getCart} setCart={cart.setCart}></Header>
            <div className="main-ganre">
                {genre?.map((item, _) => 
                    <Genre name={item.genreName} key = {item.id} id = {item.id} image="https://hips.hearstapps.com/hmg-prod/images/best-romance-novels-2023-643811403d9fa.jpg?crop=0.6697674418604651xw:1xh;center,top&resize=1200:*"></Genre>
                )}
                {genre ? 
                <Genre name="Інше" key = {0} id = {0} image="https://hips.hearstapps.com/hmg-prod/images/best-romance-novels-2023-643811403d9fa.jpg?crop=0.6697674418604651xw:1xh;center,top&resize=1200:*"></Genre> : <></>}
                
            </div>
            <p style={{ fontSize: '20px', fontWeight: 'bold', margin: "10px"}}>Новинки</p>
            <div className="main-cataloge">
                {books?.map((item, _) => 
                    <BookElement key={item.id} cart={cart} id={item.id} name={item.bookName} price={item.price} stock={item.stock} image={item.image}></BookElement>
                ) }
            </div>
            
            {iter != -1 && showLoadButton ? <button onClick={load} className="main-load-more-button">Завантажити ще</button> : <div></div> }
            
        </>
    )

}
export default MainPage