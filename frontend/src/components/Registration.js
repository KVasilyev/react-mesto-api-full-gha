import React from "react";
import { Link } from "react-router-dom";
import auth from "../utils/Auth.js";

function Registration(props) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value)
    }

    function handleChangePassword(e) {
        setPassword(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        auth.register(password, email)
        .then((res) => {
            props.setTooltipContent({text: "Вы успешно зарегистрировались!", isSuccess: true});
            props.setIsInfoTooltipOpen(true); 
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
            <h1 className="form__headline">Регистрация</h1>
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
                autoComplete="on"
                type="password"
                required
            />
            </fieldset>
            <button type="submit" className="form__button">Зарегистрироваться</button>
            <Link 
                to="/sign-in"
                className="form__notice">
                Уже зарегистрированы? Войти
            </Link>
        </form>
        </>

    )
}

export default Registration;