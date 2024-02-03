import React, { useEffect } from "react";
import { Navigate ,Route, Routes } from 'react-router-dom';
import Footer from "./Footer.js";
import Main from "./Main.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";

import Login from "./Login.js"
import Registration from "./Registration.js";
import ProtectedRouteElement from "./ProtectedRouteElement.js";
import { useNavigate } from 'react-router-dom';
import InfoTooltip from "./InfoTooltip.js";

import api from "../utils/Api.js"
import auth from "../utils/Auth.js"

import { currentUserContext } from '../context/CurrentUserContext.js';
import Header from "./Header.js";


function App() {

  // Константы
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  
  const [ email, setEmail ] = React.useState('');

  //Юзер-стейт
  const [currentUser, setCurrentUser] = React.useState({});

  //Стейт Логина
  const [loggedIn, setLoggedIn] = React.useState(false);


  // Попап Tooltip
  const [tooltipContent, setTooltipContent] = React.useState({text: '', isSuccess: true})

  // Card
  const [cards, setCards] = React.useState([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    if(loggedIn) {
      api.getCards(localStorage.jwt)
        .then((cardsInfo) => {
          setCards(cardsInfo);
        })
        .catch((err) => {
          console.log(err);
        })
    }
    }, [loggedIn])
  
  React.useEffect(() => {
    if(loggedIn) {
      api.getMyInfo(localStorage.jwt)
      .then((res) => {  
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, [loggedIn])

  //Лайки
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.likeToggle(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    }) 
  }

  //Удаление
  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards((cards) => cards.filter((item) => item._id !== card._id));
    })
    .catch(err => {
      console.log(err);
    })
  }

  // Редактирование профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  // Смена аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  // Редактирование профиля
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  // Открытие попапа с картинкой
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // Закрытие всех попапаов
  function closeAllPopups() {
      setIsEditProfilePopupOpen(false);
      setIsEditAvatarPopupOpen(false);
      setIsAddPlacePopupOpen(false); 
      setIsInfoTooltipOpen(false);
      setSelectedCard(null);
  }

  // Меняем Имя и Обо мне
  function handleUpdateUser(data) {
    api.setMyInfo(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  // Меняем Аватар
  function handleUpdateAvatar(data) {
    api.setMyAvatar(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  // Добавляем карточки
    function handleAddPlaceSubmit(data) {
      api.addCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
    }


  //JWT токен-чек
  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      auth.checkToken(jwt)
      .then((res) => {
        if(res) {
          setEmail(res.email)
          setLoggedIn(true);
          navigate("/", {replace: true});
        }
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, [loggedIn])

  //Выход
  function signOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setEmail('');
    navigate('/sign-in', {replace: true});
  }


  return (
    <currentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header email={email} loggedIn={loggedIn} signOut={signOut}/>
      <Routes>
        <Route path="/"
          element={<ProtectedRouteElement 
            element={Main} 
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            loggedIn={loggedIn}
            cards={cards}
            />}
        />
        <Route path="/sign-in" 
          element={<Login 
          setLoggedIn={setLoggedIn}
          setIsInfoTooltipOpen={setIsInfoTooltipOpen} 
          setTooltipContent={setTooltipContent}
          />}
        />
        <Route path="/sign-up" 
          element={<Registration
          setIsInfoTooltipOpen={setIsInfoTooltipOpen} 
          setTooltipContent={setTooltipContent}
          />}
        />
        <Route path="*"
          element={<Navigate to={loggedIn ? "/" : "/sign-in"} />}
        />
      </Routes> 
    <Footer />

    <InfoTooltip 
      isOpen={isInfoTooltipOpen} 
      onClose={closeAllPopups}
      tooltipContent={tooltipContent}
      
    />

    <EditProfilePopup 
      isOpen={isEditProfilePopupOpen} 
      onClose={closeAllPopups} 
      onUpdateUser={handleUpdateUser}
    />

    <EditAvatarPopup 
      isOpen={isEditAvatarPopupOpen} 
      onClose={closeAllPopups} 
      onUpdateAvatar={handleUpdateAvatar} 
    />

    <AddPlacePopup 
      isOpen={isAddPlacePopupOpen} 
      onClose={closeAllPopups} 
      onUpdateCardList={handleAddPlaceSubmit}
    /> 
    
    <ImagePopup 
      card={selectedCard} 
      onClose={closeAllPopups}
    />
    
  </div>
  </currentUserContext.Provider>
  );
}

export default App;
