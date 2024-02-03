class Api {
    constructor(options) {  
        this._baseUrl = options.baseUrl;
    }
    _checkResponse(result) {
        if (result.ok) {
            return result.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${result.status}`);
    }

    // Получаем информацию обо мне
    getMyInfo(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(this._checkResponse)
    }  
    
    // Устанавливаем информацию о себе на сервер
    setMyInfo(data, token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(this._checkResponse) 
    }

    //Меняем аватар
    setMyAvatar(data, token) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
        .then(this._checkResponse)
    }


    // Получаем все карточки с сервера
    getCards(token) {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(this._checkResponse)
    }

    // Загружаем карточку на сервер
    addCard({name, link}, token) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                name,
                link
            })
        })
        .then(this._checkResponse)
    }
    
    // Удаление карточки с сервера
    deleteCard(id, token) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
        .then(this._checkResponse)
    }

    //Лайки
    likeToggle(card, isLike, token) {
        return fetch(`${this._baseUrl}/cards/${card}/likes`, {
            method: isLike ? 'DELETE' : 'PUT',
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
        .then(this._checkResponse)
    }  

}

// API 
const api = new Api({
    baseUrl: 'https://api.vasilyev.nomoredomainsmonster.ru',
});

export default api;