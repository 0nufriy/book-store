import Header from "../../Components/Header/Header"
import "./OrderList.css"
import { CartDTO } from "../../Models/generic/CartDTO"
import BackButton from "../../Components/BackButton/BackButton"
import { useEffect, useState } from "react"
import { getReceipts, getUser } from "../../http"
import { UserDTO } from "../../Models/res/UserDTO"
import { ReceiptDTO } from "../../Models/res/ReceiptDTO"
import ReceiptComponent from "../../Components/ReceiptElement/ReceiptElement"



function  OrderList(cart: CartDTO) {
    const [user,setUser] = useState<UserDTO | null>(null)
    const [receipts,setReceipts] = useState<ReceiptDTO[]>([])




    useEffect(()=> {
        fetchUser()
      },[])
      useEffect(()=> {
        if(user){
            getReceipts().then(r => {
                if(r.status == 401){
                    localStorage.removeItem("TOKEN")
                    return
                }
                if(r.ok){
                    r.json().then(js => {
                        setReceipts(js)
                        console.log(js)
                    })
                }else{
                    //error
                }
            })
        }
      },[user])
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

    return (
        <>
            <Header onLogin={fetchUser} defaultSearchValue={null} setSeatchCataloge={null} getCart={cart.getCart} setCart={cart.setCart} ></Header>
            <div>
                <BackButton></BackButton>
            </div>
            <div className="order-list-container">
                <div className="order-list">
                    {receipts?.map((item, _) => 
                        <ReceiptComponent isAdmin={user?.role != "user"} receipt={item}></ReceiptComponent>
                    )}
                </div>
            </div>
            {!user && <div className="order-list-auth-message">Для того, щоб переглянути ваші замовлення необхідно увійти в аккаунт</div>}
        </>
    )

}
export default OrderList