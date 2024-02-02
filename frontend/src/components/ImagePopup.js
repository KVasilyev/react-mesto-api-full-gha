import React from "react";

function ImagePopup(props) {
  return (
    <section className={`popup popup_type_image ${props.card ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_image">
        <button type="button" className="popup__button-close" aria-label="Закрыть" onClick={props.onClose}></button>
        <figure className="popup__image-place">
          <img className="popup__image" src={props.card?.link} alt={props.card?.name} />
          <figcaption className="popup__image-caption">{props.card?.name}</figcaption>
        </figure>
      </div>      
    </section>
    )
}

export default ImagePopup;