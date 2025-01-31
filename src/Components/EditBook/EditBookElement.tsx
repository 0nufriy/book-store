import React, { useState, useEffect } from 'react';
import './EditBookElement.css'; // Імпортуємо CSS модуль
import { BookDTO } from '../../Models/res/Book';
import { GenreDTO } from '../../Models/res/Genre';

interface AdminBookCardProps {
    book: BookDTO;
    genres: GenreDTO[]; 
    onSave: (updatedBook: BookDTO) => void;
}

const AdminBookCard: React.FC<AdminBookCardProps> = ({ book, genres, onSave }) => {
    const [editedBook, setEditedBook] = useState<BookDTO>(book);
    const [isImgBroken, setIsImgBroken] = useState<boolean>(true);


    const [nameErr, setNameErr] = useState<boolean>(false)
    const [autorErr, setAutorErr] = useState<boolean>(false)
    const [descErr, setDescErr] = useState<boolean>(false)
    const [imageErr, setImageErr] = useState<boolean>(false)
    const [isbnErr, setIsbnErr] = useState<boolean>(false)

    useEffect(() => {
        setEditedBook(book);
        setIsImgBroken(true)
    }, [book]);

    useEffect(()=>{
        setIsImgBroken(false)
    },[editedBook.image])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedBook(prevBook => ({
            ...prevBook,
            [name]: value,
        }));
    };

    function isValidISBN13Regex(isbn: string): boolean {
        const cleanedISBN = isbn.replace(/-/g, '');
      
        if (!/^\d{13}$/.test(cleanedISBN)) {
          return false;
        }
      
        const digits = cleanedISBN.split('').map(Number);
      
        let sum = 0;
        for (let i = 0; i < 12; i++) {
          const digit = digits[i];
          if (i % 2 === 0) { 
            sum += digit;
          } else {        
            sum += digit * 3;
          }
        }
      
        const checkDigit = (10 - (sum % 10)) % 10; 
      
        return checkDigit === digits[12];
      }

    const handleSave = () => {

        if(editedBook.bookName.length < 3){
            setNameErr(true)
            setAutorErr(false)
            setDescErr(false)
            setImageErr(false)
            setIsbnErr(false)
            return
        }
        if(editedBook.autor.length < 3){
            setNameErr(false)
            setAutorErr(true)
            setDescErr(false)
            setImageErr(false)
            setIsbnErr(false)
            return
        }
        if(editedBook.description.length < 3){
            setNameErr(false)
            setAutorErr(false)
            setDescErr(true)
            setImageErr(false)
            setIsbnErr(false)
            return
        }
        if(isImgBroken){
            setNameErr(false)
            setAutorErr(false)
            setDescErr(false)
            setImageErr(true)
            setIsbnErr(false)
            return
        }
        if(!isValidISBN13Regex(editedBook.isbn)){
            setNameErr(false)
            setAutorErr(false)
            setDescErr(false)
            setImageErr(false)
            setIsbnErr(true)
            return
        }
        setNameErr(false)
        setAutorErr(false)
        setDescErr(false)
        setImageErr(false)
        setIsbnErr(false)
        onSave(editedBook);
    };

    const handleCancelClick = () => {
        setEditedBook(book); 
        setNameErr(false)
        setAutorErr(false)
        setDescErr(false)
        setImageErr(false)
        setIsbnErr(false)
    };

    return (
        <div className={'edit-book-element-card'}>
            <h2 className={'edit-book-element-title'}> {book.id != -1? editedBook.bookName + "(#"+ editedBook.id + ")" : "Додати нову книгу"}</h2>

            <div className={'edit-book-element-form-group'}>
                <label htmlFor="bookName" className={'edit-book-element-label'}>Назва книги*:</label>
                <input
                    type="text"
                    id="bookName"
                    name="bookName"
                    value={editedBook.bookName}
                    onChange={handleInputChange}
                    className={nameErr ? "edit-book-element-input-error" : 'edit-book-element-input'}
                />
            </div>

            <div className={'edit-book-element-form-group'}>
                <label htmlFor="genreId" className={'edit-book-element-label'}>Жанр*:</label>
                <select
                    id="genreId"
                    name="genreId"
                    value={editedBook.genreId}
                    onChange={handleInputChange}
                    className={'edit-book-element-input'}
                >
                    {genres.map(genre => (
                        <option key={genre.id} value={genre.id}>{genre.genreName}</option>
                    ))}
                </select>
            </div>

            <div className={'edit-book-element-form-group'}>
                <label htmlFor="autor" className={'edit-book-element-label'}>Автор*:</label>
                <input
                    type="text"
                    id="autor"
                    name="autor"
                    value={editedBook.autor}
                    onChange={handleInputChange}
                    className={autorErr ? "edit-book-element-input-error" :'edit-book-element-input'}
                />
            </div>

            <div className={'edit-book-element-form-group'}>
                <label htmlFor="description" className={'edit-book-element-label'}>Опис*:</label>
                <textarea
                    id="description"
                    name="description"
                    value={editedBook.description}
                    onChange={handleInputChange}
                    className={descErr ? "edit-book-element-input-error" :'edit-book-element-textarea'}
                />
            </div>

            <div className={'edit-book-element-form-group'}>
                <label htmlFor="pagecount" className={'edit-book-element-label'}>Кількість сторінок (якщо невідомо, залиште 0)*:</label>
                <input
                    type="number"
                    id="pagecount"
                    name="pagecount"
                    min={0}
                    value={editedBook.pagecount}
                    onChange={handleInputChange}
                    className={'edit-book-element-input'}
                />
            </div>
            
            <div className={'edit-book-element-form-group'}>
                <label htmlFor="image" className={'edit-book-element-label'}>Зображення (посилання)*:</label>
                <input
                    type="text"
                    id="image"
                    name="image"
                    value={editedBook.image}
                    onChange={handleInputChange}
                    className={imageErr ? "edit-book-element-input-error" :'edit-book-element-input'}
                />
                <div className='edit-book-element-image-container'>
                    {isImgBroken ? 
                    <div className='edit-book-element-image-error'>Не вдалося завантажити зображення</div>
                    :
                    <img onLoad={() => setIsImgBroken(false)} onError={() => setIsImgBroken(true)} alt='Не вдалося завантажити зображення' className='edit-book-element-image' src= {editedBook.image}/>}
                </div>
            </div>
            <div className={'edit-book-element-form-group'}>
                <label htmlFor="format" className={'edit-book-element-label'}>Формат:</label>
                <input
                    type="text"
                    id="format"
                    name="format"
                    value={editedBook.format}
                    onChange={handleInputChange}
                    className={'edit-book-element-input'}
                />
            </div>


            <div className={'edit-book-element-form-group'}>
                <label htmlFor="cover" className={'edit-book-element-label'}>Обкладинка (тип):</label>
                <input
                    type="text"
                    id="cover"
                    name="cover"
                    value={editedBook.cover}
                    onChange={handleInputChange}
                    className={'edit-book-element-input'}
                />
            </div>

          

            <div className={'edit-book-element-form-group'}>
                <label htmlFor="isbn" className={'edit-book-element-label'}>ISBN*:</label>
                <input
                    type="text"
                    id="isbn"
                    name="isbn"
                    value={editedBook.isbn}
                    onChange={handleInputChange}
                    className={isbnErr ? "edit-book-element-input-error" :'edit-book-element-input'}
                />
            </div>
            <div className={'edit-book-element-form-group'}>
                <label htmlFor="price" className={'edit-book-element-label'}>Ціна (грн.)*:</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    min={0}
                    value={editedBook.price}
                    onChange={handleInputChange}
                    className={'edit-book-element-input'}
                />
            </div>

            <div className={'edit-book-element-form-group'}>
                <label htmlFor="stock" className={'edit-book-element-label'}>Залишок на складі*:</label>
                <input
                    type="number"
                    id="stock"
                    name="stock"
                    min={0}
                    value={editedBook.stock}
                    onChange={handleInputChange}
                    className={'edit-book-element-input'}
                />
            </div>

            <div className={'edit-book-element-buttons'}>
                <button className={'edit-book-element-button-save'} onClick={handleSave}>Зберегти</button>
                <button className={'edit-book-element-button-cancel'} onClick={handleCancelClick}>Скасувати</button>
            </div>
        </div>
    );
};

export default AdminBookCard;