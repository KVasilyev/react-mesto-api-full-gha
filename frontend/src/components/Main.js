import React from "react";
import Card from "./Card.js"

import { currentUserContext } from '../context/CurrentUserContext.js';

function Main(props) {
  //Подписываемся на контекст
  const userContext = React.useContext(currentUserContext);
    return (
    <main className="content">
        <section className="profile" aria-label="Профиль пользователя">
          <div className="profile__user">
            <button type="button" className="profile__change-avatar" onClick={props.onEditAvatar}><img className="profile__avatar" src={userContext.avatar} alt="Аватар Пользователя"/></button>
            <div className="profile__info">
              <div className="profile__name">
                <h1 className="profile__names">{userContext.name}</h1>
                <button type="button" className="profile__button-edit" aria-label="Редактировать" onClick={props.onEditProfile}></button>
              </div>
              <p className="profile__job">{userContext.about}</p>
            </div>
          </div>
          <button type="button" className="profile__button-add" aria-label="Добавить контент" onClick={props.onAddPlace}></button>
        </section>
        <section className="elements" aria-label="Список картинок">
          <ul className="elements__grid">
                {props.cards.map((card) => {
                    return (                   
                      <Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
                    )
                })}
          </ul>
        </section>
    </main>
    )
}

export default Main;