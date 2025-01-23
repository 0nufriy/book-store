import { useNavigate } from "react-router-dom";
import "./BookElement.css"

interface BookElementProps {
    name: string;
    image: string;
    price: number;
    stock: number;
    id: number;
}

function BookElement(props: BookElementProps) {
    const navigate = useNavigate()
    return (
    <div className="book-card" onClick={()=> {navigate("/book/" + props.id)}}>
        <img className="book-image" src = {props.image}></img>
        <div className="book-info">
            <div className="book-name">
                {props.name}
            </div>
            <div className="book-stock" style={{color: props.stock >=20 ? "#8eee7b" : props.stock == 0 ? "#8f8f8f" : "#ff9900" }}>
                {props.stock >=20 ? "В наявності" : props.stock == 0 ? "Немає в наявності" : "Закінчується" }
            </div>
            <div>
                <div className="book-price"> {props.price + " грн."}</div>
                <button className="book-button">До кошика</button>
            </div>
        </div>
        
    </div>
    )

}
export default BookElement