import Header from "../../Components/Header/Header"
import "./OrderConfirmPage.css"
import { CartDTO } from "../../Models/generic/CartDTO"
import BackButton from "../../Components/BackButton/BackButton"
import { useEffect, useState } from "react"
import { createReceipt, getUser } from "../../http"
import { UserDTO } from "../../Models/res/UserDTO"
import CartList from "../../Components/CartList/CartList"
import ComboBox from "../../Components/ComboBox/ComboBox"
import { Options } from "../../Models/generic/Options"
import { CreateReceiptDTO } from "../../Models/req/CreateReceiptDTO"
import { BookReceiptDTO } from "../../Models/req/BookReceiptDTO"



function  OrderConfirmPage(cart: CartDTO) {

    const [user,setUser] = useState<UserDTO | null>(null)
    const [selectedAddress,setSelectedAddress] = useState<number>(0)
    const [succses,setSeccses] = useState<boolean>(false)

    useEffect(()=> {
      fetchUser()
    },[])

    const handleSelect = (value: number) => {
        setSelectedAddress(value)
        console.log(value)
    }
    function fetchUser(){
        getUser().then(r => {
            if(r.status == 401){
                localStorage.removeItem("TOKEN")
                return
            }
            if(r.ok){
                r.json().then(js => {
                    setUser(js)
                })
            }else{
                //error
            }
        })
    }
    
    function applayOrder(){
        if(selectedAddress != 0){
            var createdRecepit: CreateReceiptDTO = {
                addressId: selectedAddress,
                books: cart.getCart.map<BookReceiptDTO>(v => {

                    return {
                        bookId: v.id,
                        count: v.count
                    }
                })
            }

            createReceipt(createdRecepit).then(r => {
                if(r.status == 401){
                    localStorage.removeItem("TOKEN")
                    return
                }
                if(r.ok){
                    cart.setCart([])
                    setSeccses(true)
                }else{
                    //error
                }
            })
        }
    }


    return (
        <>
            <Header onLogin={fetchUser} defaultSearchValue={null} setSeatchCataloge={null} getCart={cart.getCart} setCart={cart.setCart} ></Header>
            <div>
                <BackButton></BackButton>
            </div>
                <div className="order-confirm-conatainer">
                    <CartList getCart={cart.getCart} setCart={cart.setCart}></CartList>
                    {user && cart.getCart.length !== 0 &&
                        <div>
                            <div className="order-confirm-select-address">
                                Оберіть адресу доставки
                            </div>
                            <ComboBox options={user?.addresses.map<Options>( v => {
                            return {
                                key: v.id,
                                value: v.adressName + ": " + v.adress
                            }
                        })} onSelect={handleSelect}></ComboBox>
                        </div>
                    }
                     {user && cart.getCart.length !== 0 && selectedAddress != 0 && <button className="order-confirm-done-button" onClick={applayOrder}>Оформити замовлення</button>}
                     {!user && cart.getCart.length !== 0  && <div className="order-confirm-auth-message">Для того, щоб Оформити замовлення необхідно увійти в аккаунт</div>}
                     {succses  && <div className="order-confirm-success-message">Замовлення успішно створене ми зв'яжемося з вами для уточнення деталей</div>}
                </div>
        </>
    )

}
export default OrderConfirmPage