import React from "react";
import logo from "../images/mesto-logo.svg";
import { Routes, Route, Link } from "react-router-dom";

function Header(props) {
    return (
      <header className="header">
        <img className="header__logo" src={logo} alt="Места России"/>
        <Routes>
          <Route path="/sign-in" element={
            <Link 
              to="/sign-up"
              className="header__button"
            >
              Регистрация
            </Link>
          }/>
          <Route path="/sign-up" element={
            <Link 
              to="/sign-in"
              className="header__button"
            >
              Войти
            </Link>
          }/>
          <Route path="/" element={
            <>
            <div className="header__with-email">
              <span className="header__user-email">
                {props.email}
              </span>
              <Link 
                to="/sign-in"
                className="header__button header__button_sign-out"
                onClick={props.signOut}
              >
                Выйти
              </Link>
            </div>
            </>
          }/>
        </Routes>
      </header>

    )
}

export default Header;
