import React from "react";
import { useRef } from 'react';
import PopupWithForm from "./PopupWithForm.js";


function EditAvatarPopup(props) {

    const inputRef = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();  
        props.onUpdateAvatar({
          avatar: inputRef.current.value,
        });
      } 

    return (        
        <PopupWithForm 
          name='change-avatar' 
          isOpen={props.isOpen} 
          title="Обновить аватар"
          buttonText="Сохранить"
          onClose={props.onClose}
          onSubmit={handleSubmit}
        >
        <input 
          className="popup__input input input_type_link"
          placeholder="Ссылка на картинку аватара"
          type="url"
          name="avatar"
          id="avatar"
          ref={inputRef}
          required
        />
        <span className="popup__input-error avatar-input-error"></span>

        </PopupWithForm>
    )
}

export default EditAvatarPopup;