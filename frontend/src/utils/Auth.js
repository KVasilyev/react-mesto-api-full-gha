class Auth {
    constructor(options) {  
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    // Регистрация
    async register(password, email) {
        return fetch(`${this._baseUrl}/sign-up`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ password, email })
        })
        .then(this._checkResponse)
    }

    //Авторизация
    async authorize(password, email) {
        return fetch(`${this._baseUrl}/sign-in`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ password, email })
        })
        .then(this._checkResponse)
        .then((data) => {
            if (data.token) {
                localStorage.setItem('jwt', data.token);
                return data;
            }
        })
    }

    //Обращение к JWT
    async checkToken(token) {
        return  fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json", 
                "Authorization" : `Bearer ${token}`
              }
        })
        .then(this._checkResponse)
        .then((data) => {
            return data;
        })
    }
}

// Auth
const auth = new Auth({
    baseUrl: 'api.vasilyev.nomoredomainsmonster.ru',
    headers: {
      "Content-Type": "application/json" 
    }
});

export default auth;