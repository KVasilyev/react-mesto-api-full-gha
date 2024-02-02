import React from "react";
import done from "../images/done.svg";
import error from "../images/error.svg";

function PopupWithInfo(props) {
    return (
      <section className={`popup popup__tooltip ${props.isOpen ? 'popup_opened' : ''}`}>        
        <div className="popup__container">
        <button type="button" className="popup__button-close" aria-label="Закрыть" onClick={props.onClose}></button>
            <img src={`${!props.tooltipContent.isSuccess ? error : done}`} />
            <h2 className="popup__title">{props.tooltipContent.text}</h2>
        </div>      
      </section>
    )
}

export default PopupWithInfo;