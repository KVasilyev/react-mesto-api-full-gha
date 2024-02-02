import React from "react";
import auth from "../utils/Auth.js";
import { useNavigate } from 'react-router-dom';

function Login(props) {

    const navigate = useNavigate();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value)
    }

    function handleChangePassword(e) {
        setPassword(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(!email || !password) {
            return;
        }
        auth.authorize(password, email)
        .then((res) => {
            if(res.token) {
                setEmail('');
                setPassword('');
                props.setLoggedIn(true);        
                navigate('/', {replace: true});
            }
        })
        .catch((err) => {
            props.setTooltipContent({text: "Что-то пошло не так! Попробуйте ещё раз.", isSuccess: false});
            props.setIsInfoTooltipOpen(true);          
            console.log(err)
        }) 
    }

    return (
        <>
        <form className="form" onSubmit={handleSubmit}>
            <h1 className="form__headline">Войти</h1>
            <fieldset className="form__fieldset">
            <input 
                className="form__input"
                placeholder="E-mail"
                value={email || ''}
                onChange={handleChangeEmail}
                type="email"
                required
            />
            <input 
                className="form__input"
                placeholder="Пароль"
                value={password || ''}
                onChange={handleChangePassword}
                type="password"
                autoComplete="on"
                required
            />
            </fieldset>
            <button type="submit" className="form__button">Войти</button>
        </form>
        </>

    )
}

export default Login;