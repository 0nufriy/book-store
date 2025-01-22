import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route index path='/' element={
            <MainPage></MainPage>
        }></Route>


      <Route index path='*' element={
            <Navigate to="/"></Navigate>
        }></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
