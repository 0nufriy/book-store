import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import BookPage from './pages/Book/BookPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={
            <MainPage></MainPage>
        }></Route>
        <Route index path='/book/:bookid' element={
            <BookPage></BookPage>
        }></Route>

      <Route index path='*' element={
            <Navigate to="/"></Navigate>
        }></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
