import Header from "../../Components/Header/Header"
import "./AccountPage.css"
import { CartDTO } from "../../Models/generic/CartDTO"
import { useEffect, useState } from "react"
import { addAddress, getUser, removeAddress, UpdateUser } from "../../http"
import { UserDTO } from "../../Models/res/UserDTO"
import { AddressDTO } from "../../Models/res/address"
import {UpdateUserDTO} from "../../Models/req/UpdateUserDTO"
import { AddAddressDTO } from "../../Models/req/AddAddressDTO"
import BackButton from "../../Components/BackButton/BackButton"
import { useNavigate } from "react-router-dom"



function  AccountPage(cart: CartDTO) {
    const [user,setUser] = useState<UserDTO | null>(null)
    const [initialUser,setInitualUser] = useState<UserDTO | null>(null)
    const [unloginError,setUnloginError] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState(false);
    const [newAddress, setNewAddress] = useState<AddressDTO | null>(null);

    const navigate = useNavigate()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if(user){
            const newUser = {
                ...user,
                [name]: value
            }
            setUser(newUser);
        }
    };

    const [loginErr, setLoginErr] = useState<boolean>(false);
    const [emailErr, setEmailErr] = useState<boolean>(false);
    const [phoneErr, setPhoneErr] = useState<boolean>(false);
    const [nameErr, setNameErr] = useState<boolean>(false);

    const [nameAddressErr, setNameAddressErr] = useState<boolean>(false);
    const [cityErr, setcityErr] = useState<boolean>(false);
    const [streetErr, setStreetErr] = useState<boolean>(false);
    const [houseErr, setHousErr] = useState<boolean>(false);
    const [postErr, setPostErr] = useState<boolean>(false);


    const [error, setError] = useState<string>('');
    const [addressError, setAddressError] = useState<string>('');

    const handleSave = () => {
        if(user){
            if(user.name.length < 3){
                setError("Ім'я закороткий")
                setLoginErr(false)
                setEmailErr(false)
                setPhoneErr(false)
                setNameErr(true)
                return
            }
            if(user.login.length < 3){
                setError("Логін закороткий")
                setLoginErr(true)
                setEmailErr(false)
                setPhoneErr(false)
                setNameErr(false)
                return
            }
            const emailRegex: RegExp  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(user.email)){
                setError("Пошта невірна")
                setLoginErr(false)
                setEmailErr(true)
                setPhoneErr(false)
                setNameErr(false)
                return
            }
            const phoneRegexBasic: RegExp = /^\+?(\d{1,3})?[-.\s]?\(?(\d{1,4})\)?[-.\s]?(\d{1,4})[-.\s]?(\d{4,})$/;
            if(!phoneRegexBasic.test(user.phone)){
                setError("Телефон невірний")
                setLoginErr(false)
                setEmailErr(false)
                setPhoneErr(true)
                setNameErr(false)
                return
            }
            const updateUserDTO: UpdateUserDTO = {
                login: user.login,
                email: user.email,
                phone: user.phone,
                name: user.name
            }
            UpdateUser(updateUserDTO).then(r => {
                setError("")
                setLoginErr(false)
                setEmailErr(false)
                setPhoneErr(false)
                setNameErr(false)
                setUserFromRequest(r)
            })
            setInitualUser(user)
            setIsEditing(false);
        }
        
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setUser(initialUser);
        setError("")
        setLoginErr(false)
        setEmailErr(false)
        setPhoneErr(false)
        setNameErr(false)
        setIsEditing(false);
    }
    useEffect(()=>{
        fetchUser()
    },[])

    function fetchUser(){
        getUser().then(r => {
            setUserFromRequest(r)
        })
    }

    function setUserFromRequest(r: Response){
        if(r.status == 401){
            localStorage.removeItem("TOKEN")
            setUnloginError(true)
        }
        if(r.ok){
            r.json().then(js => {
                setUser(js)
                setInitualUser(js)
                setUnloginError(false)
                setNewAddress({
                    id: 0,
                    adressName: "",
                    adress: "",
                    userId: js.id,
                    city: "",
                    street: "",
                    house: "",
                    postalCode: "",

                })
                setIsEditing(false);
            })
        }else{
            //error
        }
    }

    const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if(newAddress){
            const newUser = {
                ...newAddress,
                [name]: value
              }
              setNewAddress(newUser);
            }
     };
 
     const handleAddAddress = () => {
        if(newAddress){

            if(newAddress.adressName.length < 3){
                setAddressError("Ім'я закороткий")
                setPostErr(false)
                setHousErr(false)
                setStreetErr(false)
                setcityErr(false)
                setNameAddressErr(true)
                return
            }
            if(newAddress.city.length < 3){
                setAddressError("Місто неправильне")
                setPostErr(false)
                setHousErr(false)
                setStreetErr(false)
                setcityErr(true)
                setNameAddressErr(false)
                return
            }
            if(newAddress.street.length < 3){
                setAddressError("Вулиця неправильна")
                setPostErr(false)
                setHousErr(false)
                setStreetErr(true)
                setcityErr(false)
                setNameAddressErr(false)
                return
            }
            if(newAddress.house.length == 0 || isNaN(parseInt(newAddress.house[0]))){
                setAddressError("Введіть будинок")
                setPostErr(false)
                setHousErr(true)
                setStreetErr(false)
                setcityErr(false)
                setNameAddressErr(false)
                return
            }
            const regex: RegExp = /^[0-9]{5}$/;
            if(!regex.test(newAddress.postalCode)){
                setAddressError("Введіть правильний індекс")
                setPostErr(true)
                setHousErr(false)
                setStreetErr(false)
                setcityErr(false)
                setNameAddressErr(false)
                return
            }
            setAddressError("")
            setPostErr(false)
            setHousErr(false)
            setStreetErr(false)
            setcityErr(false)
            setNameAddressErr(false)
          const addressToAdd: AddAddressDTO = {
            adressName: newAddress.adressName,
            postalCode: newAddress.postalCode,
            house: newAddress.house,
            street: newAddress.street,
            city: newAddress.city,
          }
          addAddress(addressToAdd).then(r=> {
            setNewAddress(null)
            setUserFromRequest(r)
          })
        }
     };
 
     const handleDeleteAddress = (addressId: number) => {
        removeAddress(addressId).then(r => {
            setUserFromRequest(r)
        })
     };

     function exitAccount(){
        localStorage.removeItem("TOKEN")
        navigate("/")
        
     }

    return (
        <>
            <Header onLogin={fetchUser} defaultSearchValue={null} setSeatchCataloge={null} getCart={cart.getCart} setCart={cart.setCart} ></Header>
            
            {user &&
                <>
                <div className="account-head-buttons">
                    <BackButton></BackButton>
                    <button className="account-button account-head-button" onClick={() => navigate("/orderList")}  >
                            {user.role !="user"? "Замовлення" : "Мої замовлення" }
                    </button>
                    {user.role !="user" &&
                    <button onClick={() => navigate("/editBooks")} className="account-button account-head-button" >
                            Редагувати книги
                    </button>}                
                    <button onClick={exitAccount} className="account-button account-head-button account-head-button-exit" >
                            Вийти з аккаунту
                    </button>
                </div>
                    <div className="account-page">
              <h2 className="account-title">Інформація про аккаунт</h2>
              <div className="account-content">
                  <div className="account-section">
                      <label className="account-label">Логін:</label>
                      {isEditing ? <input className={loginErr? "account-input-error" : "account-input"} type="text" name="login" value={user.login} onChange={handleInputChange} /> : <span className="account-value">{user.login}</span>}
                  </div>
                  <div className="account-section">
                      <label className="account-label">Email:</label>
                      {isEditing ? <input className={emailErr? "account-input-error" : "account-input"} type="email" name="email" value={user.email} onChange={handleInputChange} /> : <span className="account-value">{user.email}</span>}
                  </div>
                  <div className="account-section">
                      <label className="account-label">Телефон:</label>
                      {isEditing ? <input className={phoneErr? "account-input-error" : "account-input"} type="tel" name="phone" value={user.phone} onChange={handleInputChange} /> : <span className="account-value">{user.phone}</span>}
                  </div>
                  <div className="account-section">
                      <label className="account-label">Ім'я:</label>
                      {isEditing ? <input className={nameErr? "account-input-error" : "account-input"} type="text" name="name" value={user.name} onChange={handleInputChange} /> : <span className="account-value">{user.name}</span>}
                  </div>
                  {error.length >=0 && <div className="account-editing-error">{error}</div>}
                  <div className="account-actions">
                    
                       {isEditing ?
                          <>
                              <button className="account-button account-save-button" onClick={handleSave}>Зберегти</button>
                              <button className="account-button account-cancel-button" onClick={handleCancel}>Скасувати</button>
                          </>
                       :
                          <button className="account-button account-edit-button" onClick={handleEdit}>Редагувати</button>
                       }
                  </div>
                  <h3 className="account-subtitle">Адреси</h3>
  
                      {user.addresses.map((address, index) => (
                      <div key={index} className="account-address">
                          <div className="account-section">
                              <label className="account-label">{address.adressName}</label>
                              <span className="account-value">{address.adress}</span>
                              <button className="account-button account-delete-button" onClick={() => handleDeleteAddress(address.id)}>Видалити</button>
                          </div>
                              
                       </div>
                    ))}
                    {user.addresses.length == 0 && <div className="account-no-address">Немає адрес</div>}
                    <div className="account-add-address">
                    <input
                        className={nameAddressErr? "account-input-error" : "account-input"}
                        style={{width: "100%"}}
                        type="text"
                        name="adressName"
                        placeholder="Назва нової адреси"
                        value={newAddress? newAddress.adressName :""}
                        onChange={handleAddressInputChange}
                    />
                    <input
                        className={cityErr? "account-input-error" : "account-input"}
                        type="text"
                        name="city"
                        placeholder="Місто"
                        value={newAddress? newAddress.city :""}
                        onChange={handleAddressInputChange}
                    />
                    <input
                        className={streetErr? "account-input-error" : "account-input"}
                        type="text"
                        name="street"
                        placeholder="Вулиця"
                        value={newAddress? newAddress.street:""}
                        onChange={handleAddressInputChange}
                    />
                    <input
                        className={houseErr? "account-input-error" : "account-input"}
                        type="text"
                        name="house"
                        placeholder="Номер будинку"
                        value={newAddress? newAddress.house:""}
                        onChange={handleAddressInputChange}
                    />
                    <input
                        className={postErr? "account-input-error" : "account-input"}
                        type="text"
                        name="postalCode"
                        placeholder="Поштовий індекс"
                        value={newAddress? newAddress.postalCode:""}
                        onChange={handleAddressInputChange}
                    />
                    
                    {addressError.length >=0 && <div className="account-editing-error">{addressError}</div>}
                    <button className="account-button account-add-button" onClick={handleAddAddress}>
                        Додати адресу
                    </button>
                    </div>
              </div>
          </div>
        </>
              
    }
            {unloginError && <div className="account-unlogin"> Не вдалося увійти в акаунт. Спробуйте авторизуватися ще раз</div>}
        </>
    )

}
export default AccountPage