import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import BookPage from './pages/Book/BookPage';
import { useState } from 'react';
import { CartElementDTO } from './Models/generic/CartElementDTO';
import CatalogePage from './pages/Cataloge/CatalogePage';

function App() {
  let [cart, setCart] = useState<CartElementDTO[]>([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={
            <MainPage getCart={cart} setCart={setCart}></MainPage>
        }></Route>
        <Route index path='/book/:bookid' element={
            <BookPage getCart={cart} setCart={setCart}></BookPage>
        }></Route>
        <Route index path='/cataloge' element={
            <CatalogePage getCart={cart} setCart={setCart}></CatalogePage>
        }></Route>

      <Route index path='*' element={
            <Navigate to="/"></Navigate>
        }></Route>
      </Routes>
    </BrowserRouter>
   
  )
}

export default App
