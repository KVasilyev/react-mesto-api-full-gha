import React from "react";
import PopupWithForm from "./PopupWithForm.js";

import { currentUserContext } from '../context/CurrentUserContext.js';


function EditProfilePopup(props) {
  
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    // Подписка на контекст и установка значений с сервера
    const currentUser = React.useContext(currentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]); 

    // Управляемые элементы
    function handlerSetName(e) {
        setName(e.target.value)
    }
    function handlerSetDescription(e) {
        setDescription(e.target.value)
    }   


    // Отправка формы
    function handleSubmit(e) {
        e.preventDefault();   
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
          name,
          about: description,
        });
    } 

    return (        
    <PopupWithForm 
      name='edit' 
      isOpen={props.isOpen} 
      title="Редактировать профиль"
      buttonText="Сохранить"
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input 
        className="popup__input input input_type_name"
        placeholder="Имя"
        type="text"
        id="name"
        name="name"
        minLength="2"
        maxLength="40"
        onChange={handlerSetName}
        value={name || ''}
        required
      />
      <span className="popup__input-error name-input-error"></span>
      <input 
        className="popup__input input input_type_job"
        placeholder="Работа"
        type="text"
        id="about"
        name="about"
        minLength="2"
        maxLength="200"
        onChange={handlerSetDescription}
        value={description || ''}
        required
      />
      <span className="popup__input-error about-input-error"></span>
    </PopupWithForm>
    )
}

export default EditProfilePopup;