import { useNavigate } from "react-router-dom";
import "./Genre.css"

interface GenreProps {
    name: string;
    image: string;
    id: number;
}

function Genre(props: GenreProps) {
    const navigate = useNavigate()
    return (
    <div onClick={()=> {navigate("/cataloge", { state: { id: props.id } })}} className="genre-card">
        <div className="genre-name">
            {props.name}
        </div>
        <img className="genre-image" src = {props.image}></img>
        <button className="genre-button">Дивитися більше</button>
    </div>
    )

}
export default Genre