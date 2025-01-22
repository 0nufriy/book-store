import "./Header.css"

function Header() {

    return (
    <div className="header-container">
        <div className="header-item" style={{ fontSize: '20px', fontWeight: 'bold', textTransform: 'uppercase' }}>
            Книжковий
        </div>
        <button className="header-button header-item">Каталог</button>
        <input className="header-input" type="text" placeholder="Знайдіть свою книжку..." />
        <div className="header-button-group">
            <button className="header-button header-item">Кошик: 0 грн</button>
            <button className="header-button header-item">Особистий кабінет</button>
        </div>
    </div>
    )

}
export default Header