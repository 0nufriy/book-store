import "./Footer.css"

function Footer() {

    return (
        <footer className="footer">
        <div className="footer-container">
        <div className="footer-section contact-info">
          <h3>Контакти</h3>
          <p>Наша адреса: вул. Книжкова, 123, м. Одеса, 0100, Україна</p>
          <p>Email: <a href="mailto:info@bookstore.com">info@bookstore.com</a></p>
            <p>Телефон: <a href="tel:+380441234567">+38 (044) 123-45-67</a></p>
        </div> 
        </div>
        <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Книжковий Магазин. Всі права захищені.</p>
        </div>
        </footer>
    )

}
export default Footer