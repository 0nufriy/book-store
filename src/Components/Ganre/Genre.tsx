import "./Genre.css"

interface GenreProps {
    name: string;
    image: string;
    key: number;
}

function Genre(props: GenreProps) {

    return (
    <div className="genre-card">
        <div className="genre-name">
            {props.name}
        </div>
        <img className="genre-image" src = {props.image}></img>
        <button className="genre-button">Дивитися більше</button>
    </div>
    )

}
export default Genre