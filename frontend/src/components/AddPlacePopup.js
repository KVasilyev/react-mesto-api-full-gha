import React from "react";
import { useRef } from 'react';
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {

    const cardName = useRef(null);
    const cardLink = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();  
        props.onUpdateCardList({
          name: cardName.current.value,
          link: cardLink.current.value
        });
      } 

    React.useEffect(() => {
      cardName.current.value = '';
      cardLink.current.value = '';
    }, [props.isOpen]);

    return (
    <PopupWithForm 
      name='add' 
      isOpen={props.isOpen} 
      title="Новое место"
      buttonText="Создать"
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
    <input 
      className="popup__input input input_type_description"
      placeholder="Название"
      type="text"
      name="name"
      id="description"
      minLength="2"
      maxLength="30"
      ref={cardName}
      required
    />
    <span className="popup__input-error description-input-error"></span>
    <input 
      className="popup__input input input_type_link"
      placeholder="Ссылка на картинку"
      type="url"
      name="link"
      id="url"
      ref={cardLink}
      required
    />
    <span className="popup__input-error url-input-error"></span>
    </PopupWithForm>
    )
}

export default AddPlacePopup;