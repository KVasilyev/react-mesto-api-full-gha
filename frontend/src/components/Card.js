import React from "react";

import { currentUserContext } from '../context/CurrentUserContext.js';

function Card(props) { 

  function handleClick() {
    props.onCardClick(props.card);
  } 

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  
  //Подписываемся на контекст
  const userContext = React.useContext(currentUserContext);

  const isOwn = userContext._id === props.card.owner;
  
  //const isLiked = props.card.likes.some(i => i === userContext._id);
  
  const cardLikeButton = `elements__button-like ${props.isLiked && 'elements__button-like_active'}`;

  return (
    <li className="elements__element"> 
      <img className="elements__image" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
      <div className="elements__info">
        <h2 className="elements__name">{props.card.name}</h2>
        <button type="button" className={cardLikeButton} aria-label="Лайк" onClick={handleLikeClick}></button>
        <span className="elements__like">{props.card.likes.length}</span>
      </div>
      {isOwn && <button type="button" className="elements__button-delete" aria-label="Удалить карточку" onClick={handleDeleteClick} />}
    </li>       
  )
}

export default Card;