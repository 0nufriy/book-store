import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import BookPage from './pages/Book/BookPage';
import { useState } from 'react';
import { CartElementDTO } from './Models/generic/CartElementDTO';
import CatalogePage from './pages/Cataloge/CatalogePage';
import AccountPage from './pages/Account/AccountPage';
import OrderConfirmPage from './pages/OrderConfirm/OrderConfirmPage';
import Footer from './Components/Footer/Footer';
import OrderList from './pages/OrderList/OrderList';
import BooksEditPage from './pages/BookaEdit/BooksEditPage';

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
        <Route index path='/account' element={
            <AccountPage getCart={cart} setCart={setCart}></AccountPage>
        }></Route>
        <Route index path='/orderConfirm' element={
            <OrderConfirmPage getCart={cart} setCart={setCart}></OrderConfirmPage>
        }></Route>
        <Route index path='/orderList' element={
            <OrderList getCart={cart} setCart={setCart}></OrderList>
        }></Route>
        <Route index path='/editBooks' element={
            <BooksEditPage getCart={cart} setCart={setCart}></BooksEditPage>
        }></Route>

      <Route index path='*' element={
            <Navigate to="/"></Navigate>
        }></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
   
  )
}

export default App
