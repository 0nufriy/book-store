import React, { useRef, useState } from 'react';
import './RegistModal.css';
import { Registration } from '../../../http';
import { RegistDTO } from '../../../Models/req/RegistDTO';

interface RegistModalDTO {
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    setLoginShow: React.Dispatch<React.SetStateAction<boolean>>,
    
}


function RegistModal(props: RegistModalDTO) {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [name, setName] = useState<string>('');

    const [loginErr, setLoginErr] = useState<boolean>(false);
    const [passwordErr, setPasswordErr] = useState<boolean>(false);
    const [emailErr, setEmailErr] = useState<boolean>(false);
    const [phoneErr, setPhoneErr] = useState<boolean>(false);
    const [nameErr, setNameErr] = useState<boolean>(false);


    const [error, setError] = useState<string>('');

    const modalOverlayRef = useRef<HTMLDivElement>(null);

    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        if(name.length < 3){
            setError("Ім'я закороткий")
            setLoginErr(false)
            setPasswordErr(false)
            setEmailErr(false)
            setPhoneErr(false)
            setNameErr(true)
            return
        }
        if(login.length < 3){
            setError("Логін закороткий")
            setLoginErr(true)
            setPasswordErr(false)
            setEmailErr(false)
            setPhoneErr(false)
            setNameErr(false)
            return
        }
        if(password.length < 8){
            setError("Пароль має містити 8 символів")
            setLoginErr(false)
            setPasswordErr(true)
            setEmailErr(false)
            setPhoneErr(false)
            setNameErr(false)
            return
        }
        const emailRegex: RegExp  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            setError("Пошта невірна")
            setLoginErr(false)
            setPasswordErr(false)
            setEmailErr(true)
            setPhoneErr(false)
            setNameErr(false)
            return
        }
        const phoneRegexBasic: RegExp = /^\+?(\d{1,3})?[-.\s]?\(?(\d{1,4})\)?[-.\s]?(\d{1,4})[-.\s]?(\d{4,})$/;
        if(!phoneRegexBasic.test(phone)){
            setError("Телефон невірний")
            setLoginErr(false)
            setPasswordErr(false)
            setEmailErr(false)
            setPhoneErr(true)
            setNameErr(false)
            return
        }
        const registData: RegistDTO = {
            login: login,
            password: password,
            phone: phone,
            email: email,
            name: name
        }
        Registration(registData).then(r => {
            if(r.ok){
                r.json().then(js => {
                    localStorage.setItem("TOKEN", js.token)
                    props.setShow(false)
                })
            }else{
                if(r.status == 404){
                    setError("Такий користувач вже зареєстрований")
                    setLoginErr(true)
                    setPasswordErr(false)
                    setEmailErr(true)
                    setPhoneErr(true)
                    setNameErr(false)
                }
            }
        })
    }
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === modalOverlayRef.current) {
            props.setShow(false);
        }
    };

    const hendleAccount = () => {
        props.setShow(false);
        props.setLoginShow(true);
    }

    return (
        <div className="reigst-modal-overlay" ref={modalOverlayRef} onMouseDown={handleOverlayClick}>
            <div className="reigst-modal">
                <div className="reigst-modal-header">
                  <h2>Реєстрація</h2>
                  <button className="reigst-close-button" onClick={() => {props.setShow(false)}}>
                    <span>×</span>
                  </button>
                </div>
                
                <div className="reigst-modal-content">
                    {error && <p className="reigst-error-message">{error}</p>}
                  <form onSubmit={handleSubmit}>
                    
                    <div className="reigst-form-group">
                      <label htmlFor="password">Ім'я</label>
                      <input
                      className={nameErr? "reigst-input-error" : "reigst-input"}
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="reigst-form-group">
                      <label>Логін</label>
                      <input
                        className={loginErr? "reigst-input-error" : "reigst-input"}
                        type="login"
                        id="login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                      />
                    </div>
                    <div className="reigst-form-group">
                      <label htmlFor="password">Пароль</label>
                      <input
                      className={passwordErr? "reigst-input-error" : "reigst-input"}
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="reigst-form-group">
                      <label htmlFor="password">Email</label>
                      <input
                      className={emailErr? "reigst-input-error" : "reigst-input"}
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="reigst-form-group">
                      <label htmlFor="password">Номер телефону</label>
                      <input
                      className={phoneErr? "reigst-input-error" : "reigst-input"}
                        type="phone"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <button type='submit' className="reigst-button">Стаорити акаунт</button>
                  </form>
                  <div className='reigst-login'> <span onClick={hendleAccount}> Вже маєте акаунт? </span></div>
              </div>
            </div>
        </div>
    );
}

export default RegistModal;