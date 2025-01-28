import Header from "../../Components/Header/Header"
import "./BooksEditPage.css"
import { CartDTO } from "../../Models/generic/CartDTO"
import BackButton from "../../Components/BackButton/BackButton"
import { useEffect, useState } from "react"
import { CreateBook, getAllGenre, getCatalogeBooks, getUser, UpdateBook } from "../../http"
import { UserDTO } from "../../Models/res/UserDTO"
import { CatalogeDTO } from "../../Models/req/CatalogeDTO"
import { BookDTO } from "../../Models/res/Book"
import { GenreDTO } from "../../Models/res/Genre"
import AdminBookCard from "../../Components/EditBook/EditBookElement"
import { UpdateBookDTO } from "../../Models/req/UpdateBookDTO"
import Message from "../../Components/Message/Message"
import { CreateBookDTO } from "../../Models/req/CreateBookDTO"
import Loading from "../../Components/Loading/Loading"



function  BooksEditPage(cart: CartDTO) {
    const [user,setUser] = useState<UserDTO | null>(null)
    const [searchValue,setSearchValue] = useState<string>("")

    const [books, setBooks] = useState<BookDTO[]>([])
    const [bookToAdd, setBookToAdd] = useState<BookDTO>({bookName: "", autor: "", genreId: 1, id: -1, description: "", pagecount: 0, format: "", isbn: "", cover: "", image:"", price: 0, stock: 0, gener: {id: 1, genreName: ""}} )
   
    const [iter, setIter] = useState<number>(1)
    const [showLoadButton, setShowLoadButton] = useState<boolean>(false)
    const [showAddForm, setShowAddForm] = useState<boolean>(true)
    const [genres, setGenres] = useState<GenreDTO[]>([])
    const [messageText, setMessageText] = useState<string>("")
    const [messageType, setMessageType] = useState<"success" | "error">("success")
    const [showMessage, setShowMessage] = useState<boolean>(false)

    const [isLoadingErr, setIsLoadingErr] = useState<boolean>(false)
    const [isAuthErr, setIsAuthErr] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)


    


    useEffect(()=> {
        fetchUser()
      },[])
      
      function fetchUser(){
        setIsAuthErr(false)
        getUser().then(r => {
            if(r.status == 401){
                localStorage.removeItem("TOKEN")
                setIsAuthErr(true)
                return
            }
            if(r.ok){
                r.json().then(js => {
                    setUser(js)
                })
            }else{
                setIsLoadingErr(true)
            }
        }).catch(() => {
            setIsLoadingErr(true)
        }).finally(() => {
            setIsLoading(false)
        })
    }
    useEffect(()=> {
        if(user && user.role != "user"){
            loadBooks(1)
            getAllGenre().then(res => {
                if(!res.ok){
                    setIsLoadingErr(true)
                }else{
                    res.json().then(js => {
                        setGenres(js)
                    })
                }
             }).catch(()=>{
                setIsLoadingErr(true)
             }).finally(()=> {
                setIsLoading(false)
             })
        }
    },[user])

    function loadBooks(i: number){
        setIsLoading(true)
        setIsLoadingErr(false)
        setShowLoadButton(false)
        setShowAddForm(searchValue.length < 3)
        const catalogeSearch: CatalogeDTO = {
            minPrice: 0,
            maxPrice: 9999,
            genreId: 0,
            sort: "def",
            search: searchValue
        }
        getCatalogeBooks(5, i , catalogeSearch).then(r => {
            if(r.ok){
                r.json().then(js => {
                    setIter(i + 1)
                    if(i == 1)
                        setBooks([...js])
                    else 
                        setBooks([...books, ...js])
                    if(js.length != 0) setShowLoadButton(true)   
                })
            }else{
                setIsLoadingErr(true)
            }
        }).catch(()=>{
            setIsLoadingErr(true)
        }).finally(()=>{
            setIsLoading(false)
        })
    }


    useEffect(()=> {
        if(books && books?.length % 5 != 0){
            setIter(-1)
        }
    },[books])

    function onBookSave(book: BookDTO){
        const updatedBook: UpdateBookDTO = {
            id: book.id,
            genreId: book.genreId,
            bookName: book.bookName,
            autor: book.autor,
            description: book.description,
            pagecount: book.pagecount,
            format: book.format,
            isbn: book.isbn,
            cover: book.cover,
            image: book.image,
            price: book.price,
            stock: book.stock
        }
        UpdateBook(updatedBook).then(r => {
            if(r.ok){
                setMessageText("Книгу успішно оновленно")
                setMessageType("success")
                setShowMessage(true)
            }else{
                setMessageText("Не вдалося оновити книгу")
                setMessageType("error")
                setShowMessage(true)
            }
        }).catch(()=>{
            setMessageText("Не вдалося оновити книгу")
            setMessageType("error")
            setShowMessage(true)
        })
    }

    function onBookCreate(book: BookDTO){
        const createBook: CreateBookDTO = {
            genreId: book.genreId,
            bookName: book.bookName,
            autor: book.autor,
            description: book.description,
            pagecount: book.pagecount,
            format: book.format,
            isbn: book.isbn,
            cover: book.cover,
            image: book.image,
            price: book.price,
            stock: book.stock
        }
        CreateBook(createBook).then(r => {
            if(r.ok){
                setMessageText("Книгу успішно додано")
                setMessageType("success")
                setShowMessage(true)
                setBookToAdd({bookName: "", autor: "", genreId: 1, id: -1, description: "", pagecount: 0, format: "", isbn: "", cover: "", image:"", price: 0, stock: 0, gener: {id: 1, genreName: ""}} )
                loadBooks(1)
            }else{
                setMessageText("Не вдалося додати книгу")
                setMessageType("error")
                setShowMessage(true)
            }
        }).catch(()=>{
            setMessageText("Не вдалося додати книгу")
            setMessageType("error")
            setShowMessage(true)
        })
    }

    return (
        <>
            <Header onLogin={fetchUser} defaultSearchValue={searchValue} setSeatchCataloge={setSearchValue} getCart={cart.getCart} setCart={cart.setCart} ></Header>
            <div>
                <BackButton></BackButton>
            </div>
            {user && user.role != "user" &&
                <div>
                    <button className="main-load-more-button" onClick={()=> loadBooks(1)}  >Застосувати пошук</button>
                    <div className="edit-books-container">
                        <div className="edit-books">
                        {showAddForm && <AdminBookCard 
                            key={0} 
                            book={bookToAdd}
                            genres={genres} 
                            onSave={onBookCreate}>
                        </AdminBookCard>}
                            {books.map((item, _) => 
                                <AdminBookCard key={item.id} book={item} genres={genres} onSave={onBookSave}></AdminBookCard>
                            )}
                            {books.length == 0 && <div className="edit-books-no-result">Немає результатів</div>}
                        </div>
                    </div>
                    {showMessage && <Message message={messageText} type={messageType} onClose={()=> setShowMessage(false)}></Message>}
                    
                    {books.length > 0 && iter != -1 && showLoadButton && <button className="main-load-more-button" onClick={()=> loadBooks(iter)} >Завантажити ще</button> }
                </div>
            }
            <Loading isLoading={isLoading}></Loading>
            {isLoadingErr && <div className="general-error-message">Не вдалося завантажити книги</div>}
            {( isAuthErr && (!user || user.role == "user")) && <div className="general-error-message">Для того, щоб редагувати книги необхідно бути адміністратором</div>}
        </>
    )

}
export default BooksEditPage