import Header from "../../Components/Header/Header"
import "./OrderList.css"
import { CartDTO } from "../../Models/generic/CartDTO"
import BackButton from "../../Components/BackButton/BackButton"
import { useEffect, useState } from "react"
import { getReceipts, getUser } from "../../http"
import { UserDTO } from "../../Models/res/UserDTO"
import { ReceiptDTO } from "../../Models/res/ReceiptDTO"
import ReceiptComponent from "../../Components/ReceiptElement/ReceiptElement"
import Loading from "../../Components/Loading/Loading"



function  OrderList(cart: CartDTO) {
    const [user,setUser] = useState<UserDTO | null>(null)
    const [receipts,setReceipts] = useState<ReceiptDTO[]>([])

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isError, setIsError] = useState<boolean>(false)



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
                    setIsError(true)
                }
            }).catch(()=>{
                setIsError(true)
            }).finally(()=>{
                setIsLoading(false)
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
            }
        }).catch(()=>{
            setIsError(true)
        }).finally(()=>{
            setIsLoading(false)
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
            <Loading isLoading={isLoading}></Loading>
            { isError && <div className="general-error-message"> Не вдалося завантажити замовлення. Спробуйте пізніше </div>}
            { !isLoading && !user && !localStorage.getItem("TOKEN") && <div className="order-list-auth-message">Для того, щоб переглянути замовлення необхідно увійти в аккаунт</div>}
        </>
    )

}
export default OrderList