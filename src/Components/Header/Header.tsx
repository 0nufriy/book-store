import { useState } from "react"
import "./Header.css"
import AuthModal from "../Modal/Auth/AuthModal"
import RegistModal from "../Modal/Registr/RegistModal"
import { useNavigate } from "react-router-dom"

function Header() {

    const [showAuthModal, setAuthModal] = useState<boolean>(false)
    const [showRegistModal, setRegistModal] = useState<boolean>(false)
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
            <button className="header-button header-item">Кошик: 0 грн</button>
            <button onClick={CabinetButton} className="header-button header-item">Особистий кабінет</button>
        </div>
        {showAuthModal ? <AuthModal setShow={setAuthModal} setRegistrShow={setRegistModal}></AuthModal> : <></>}
        {showRegistModal ? <RegistModal setShow={setRegistModal} setLoginShow={setAuthModal}></RegistModal> : <></>}
    </div>
    )

}
export default Header