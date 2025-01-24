import { useNavigate } from "react-router-dom";
import "./BookElement.css"
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import { CartDTO } from "../../Models/generic/CartDTO";
import { useEffect, useState } from "react";

export interface BookElementProps {
    name: string;
    image: string;
    price: number;
    stock: number;
    id: number;
    cart: CartDTO;
}


function BookElement(props: BookElementProps) {

    const [disable, setDisablle] = useState<boolean>(false)

    const navigate = useNavigate()

    useEffect(() => {
        const existingItemIndex = props.cart.getCart.findIndex(item => item.id === props.id);
        if (existingItemIndex === -1){
            setDisablle(props.stock <= 0)
        }else{
            setDisablle(props.stock - props.cart.getCart[existingItemIndex].count <= 0)
        }
    },[props.cart])
    return (
    <div className="book-card">
        <img onClick={()=> {navigate("/book/" + props.id)}} className="book-image" src = {props.image}></img>
        <div className="book-info">
            <div onClick={()=> {navigate("/book/" + props.id)}} className="book-name">
                {props.name}
            </div>
            <div onClick={()=> {navigate("/book/" + props.id)}} className="book-stock" style={{color: disable ?  "#8f8f8f" : props.stock >=20 ? "#8eee7b" : "#ff9900" }}>
                { disable  ? "Немає в наявності"  : props.stock >=20 ?   "В наявності" : "Закінчується" }
            </div>
            <div>
                <div className="book-price"> {props.price + " грн."}</div>
                <AddToCartButton disable={disable} book={props} class="book-button" classDisable="book-button-disable"></AddToCartButton>
            </div>
        </div>
        
    </div>
    )

}
export default BookElement