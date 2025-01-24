import { useEffect, useState } from "react"
import "./Header.css"
import AuthModal from "../Modal/Auth/AuthModal"
import RegistModal from "../Modal/Registr/RegistModal"
import { useNavigate } from "react-router-dom"
import { CartDTO } from "../../Models/generic/CartDTO"
import CartModal from "../Modal/Cart/CartModal"

function Header(cart: CartDTO) {

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

    return (
    <div className="header-container">
        <div onClick={()=> {navigate("/")}} className="header-item" style={{ fontSize: '20px', fontWeight: 'bold', textTransform: 'uppercase', cursor: "pointer" }}>
            Книжковий
        </div>
        <button className="header-button header-item">Каталог</button>
        <input className="header-input" type="text" placeholder="Знайдіть свою книжку..." />
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