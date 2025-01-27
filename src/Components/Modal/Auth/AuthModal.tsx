import React, { useRef, useState } from 'react';
import './AuthModal.css';
import { loginAuth } from '../../../http';
import { LoginDTO } from '../../../Models/req/LoginDTO';

interface AuthModalDTO {
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    setRegistrShow: React.Dispatch<React.SetStateAction<boolean>>,
    onLogin: () => void | null; 
}

function AuthModal(props: AuthModalDTO) {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const modalOverlayRef = useRef<HTMLDivElement>(null);
    const [loginErr, setLoginErr] = useState<boolean>(false);
    const [passwordErr, setPasswordErr] = useState<boolean>(false);
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        if(login.length == 0){
            setError("Ведіть логін")
            setLoginErr(true)
            setPasswordErr(false)
            return
        }
        if(password.length == 0){
            setError("Ведіть пароль")
            setLoginErr(false)
            setPasswordErr(true)
            return
        }
        let request: LoginDTO = {
            login: login,
            pasword: password
        }
        loginAuth(request).then(r => {
            if(r.ok){
                r.json().then( js => {
                    localStorage.setItem("TOKEN", js.token)
                    props.onLogin()
                    props.setShow(false)
                })
            }else{
                setError("Логін або пароль не вірні")
                setLoginErr(true)
                setPasswordErr(true)
            }
        })
    }
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === modalOverlayRef.current) {
            props.setShow(false);
        }
    };

    const hendleNoAccount = () => {
        props.setShow(false);
        props.setRegistrShow(true)
    }
    return (
        <div className="auth-modal-overlay" ref={modalOverlayRef} onMouseDown={handleOverlayClick}>
            <div className="auth-modal">
                <div className="auth-modal-header">
                  <h2>Авторизація</h2>
                  <button className="auth-close-button" onClick={() => {props.setShow(false)}}>
                    <span>×</span>
                  </button>
                </div>
                
                <div className="auth-modal-content">
                    {error && <p className="auth-error-message">{error}</p>}
                  <form onSubmit={handleSubmit}>
                    <div className="auth-form-group">
                      <label>Логін</label>
                      <input
                        className={loginErr? "auth-input-error" : "auth-input"}
                        type="login"
                        id="login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                      />
                    </div>
                    <div className="auth-form-group">
                      <label htmlFor="password">Пароль</label>
                      <input
                      className={passwordErr? "auth-input-error" : "auth-input"}
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <button type='submit' className="auth-button">Увійти</button>
                  </form>
                  <div className='auth-registr'> <span onClick={hendleNoAccount}> Немає акаунту? </span></div>
              </div>
            </div>
        </div>
    );
}

export default AuthModal;