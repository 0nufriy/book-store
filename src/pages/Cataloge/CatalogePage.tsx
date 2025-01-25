import { useEffect, useState } from "react"
import BookElement from "../../Components/BookElement/BookElement"
import Footer from "../../Components/Footer/Footer"
import Header from "../../Components/Header/Header"
import "./CatalogePage.css"
import { getAllGenre, getCatalogeBooks } from "../../http"
import { BookDTO } from "../../Models/res/Book"
import { CartDTO } from "../../Models/generic/CartDTO"
import { GenreDTO } from "../../Models/res/Genre"
import PriceSlider from "../../Components/PriceSlider/PriceSlider"
import { CatalogeDTO } from "../../Models/req/CatalogeDTO"
import { useLocation } from "react-router-dom"



function  CatalogePage(cart: CartDTO) {


    const [books, setBooks] = useState<BookDTO[] | null>(null)
   
    const [iter, setIter] = useState<number>(1)
    const [showLoadButton, setShowLoadButton] = useState<boolean>(false)
    const [genres, setGenres] = useState<GenreDTO[]>([])

    const {state} = useLocation();

    var genreIdDef = 0;
    try{
        const id = state.id; 
        if(id) genreIdDef = id;
    }catch{
        
    }
  
    var searchValue = "";
    try{
        const search = state.search; 
        if(search) searchValue = search;
    }catch{
        
    }

    const [selectedGenre, setSelectedGenre] = useState<number>(genreIdDef);
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(2000);
    const [sortOption, setSortOption] = useState<string>('default');
    const [searchString, setSeatchString] = useState<string>(searchValue);
    const [catalogeDTO, setCatalogeDTO] = useState<CatalogeDTO>({maxPrice: 2000, minPrice: 0, sort: "default", genreId: genreIdDef, search: searchValue})

    const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const ganreId = parseInt(e.target.value)
        setSelectedGenre(ganreId);
      };
    
      const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(e.target.value);
      };
  
     
    function load() {
        setShowLoadButton(false)
        getCatalogeBooks(10,iter, catalogeDTO).then(res =>{
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
        if(books && books?.length % 10 != 0){
            setIter(-1)
        }
    },[books])

    useEffect(() => {
        getAllGenre().then(res => {
            if(!res.ok){
                //error
            }else{
                res.json().then(js => {
                    setGenres(js)
                })
            }
         })
    },[])


  

    const handlePriceChange = (newMin: number, newMax: number) => {
        setMinPrice(newMin);
        setMaxPrice(newMax);
      }
    function applyFilters(){
        setCatalogeDTO({maxPrice: maxPrice, minPrice: minPrice, sort: sortOption, genreId: selectedGenre, search: searchString})
    }

    useEffect(() => {

       

        getCatalogeBooks(10, 1, catalogeDTO).then(res =>{
            if(!res.ok){
                //error
            }else{
                res.json().then(js => {
                    setBooks(js);
                    setIter(2)
                    if(js.length !=0) setShowLoadButton(true)
                })
            }
        })
    },[catalogeDTO])

    useEffect(() => {

        try{
            const search = state.search; 
            if(search) {
                searchValue = search;
                const updatedDTO = { ...catalogeDTO, search: searchValue }
                console.log(updatedDTO)
                setCatalogeDTO(updatedDTO)
            }
        }catch{
        }
    },[state])

    return (
        <>
            <Header defaultSearchValue={searchValue} setSeatchCataloge={setSeatchString} getCart={cart.getCart} setCart={cart.setCart} ></Header>
            
            <p style={{ fontSize: '20px', fontWeight: 'bold', margin: "10px"}}>Каталог</p>
            <div className="filter-and-sort">
                <div className="sort">
                
                    <label htmlFor="sortOptions">Сортувати: </label>
                    <select id="sortOptions" value={sortOption} onChange={handleSortChange}>
                        <option value="default">За замовчуванням</option>
                        <option value="price_asc">Ціна: від низької до високої</option>
                        <option value="price_desc">Ціна: від високої до низької</option>
                        <option value="newest">Спочатку нові</option>
                        <option value="oldest">Спочатку старі</option>
                    </select>
                </div>
                <div className="filter">
                
                    <label htmlFor="genreFilter">Жанр: </label>
                    <select id="genreFilter" value={selectedGenre} onChange={handleGenreChange}>
                        <option value="0">Всі</option>
                        {genres.map(g => (
                        <option key={g.id} value={g.id}>{g.genreName}</option>
                        ))}
                    </select>
                    
                    <label>Ціна:</label>
                     <PriceSlider min={0} max={2000} valueMin={minPrice} valueMax={maxPrice} onChange={handlePriceChange} />
                    </div>
                    
                
                <button className="apply-filter-button" onClick={applyFilters}>Застосувати</button>
            </div>
                <div>
                    <div className="main-cataloge">
                        {books?.map((item, _) => 
                            <BookElement key={item.id} cart={cart} id={item.id} name={item.bookName} price={item.price} stock={item.stock} image={item.image}></BookElement>
                        ) }
                    </div>
                </div>
            
            {books && books.length > 0 && iter != -1 && showLoadButton ? <button onClick={load} className="main-load-more-button">Завантажити ще</button> : <div></div> }
            
            <Footer></Footer>
        </>
    )

}
export default CatalogePage