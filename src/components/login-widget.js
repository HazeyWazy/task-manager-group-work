import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {getUser, storeUser, deleteUser} from '../auth.js';
import {BASE_URL} from '../config.js';

/**
 * LoginWidget <login-widget>
 * Present a login form and handle user authentication, if a user
 * is logged in, display their name and a logout button
 */
class LoginWidget extends LitElement {
  static properties = {
    _loginUrl: {type: String, state: true},
    _user: {type: String, state: true},
    _errorMessage: {type: String, state: true},
  };

  static styles = css`
    :host {
      display: flex;
    }

    p {
      margin-right: 1rem;
      font-size: 1rem;
      padding-left: 3.7rem;
    }
    
    button {
      margin: auto auto;
      padding: 0.6vw 1vw;
      border-radius: 0.4vw;
      transition-duration: 0.4s;
      background-color: #2e323d;
      color: #faf9ff;
      border: solid 1px #faf9ff;
    }

    button:hover {
      cursor: pointer;
      background-color: #faf9ff;
      color: #2e323d;
      border: solid 1px #2e323d;
      box-shadow: 0 0 0 0.15vw #717788;
    }

    button:active {
      cursor: pointer;
      background-color: #faf9ff;
      color: #2e323d;
      border: solid 1px #2e323d;
      transform: translateY(2px);
      box-shadow: none;
    }

    form input[name='username'],
    input[type='password'] {
      color: #2e323d;
      background-color: #faf9ff;
      box-shadow: 0 0 .4vw rgba(0, 0, 0, 0.5), 0 0 0 .15vw transparent;
      border-radius: 0.4vw;
      border: none;
      outline: none;
      padding: 0.4vw;
      max-width: 190px;
      transition: 0.4s;
      margin-right: 0.5rem;
    }

    form input[name='username']:hover,
    input[type='password']:hover {
      box-shadow: 0 0 0 0.15vw #717788;
    }

    form input[name='username']:focus,
    input[type='password']:focus {
      box-shadow: 0 0 0 0.15vw #5072a9;
    }

    input[type='submit'] {
      margin: auto auto;
      padding: 0.6vw 1vw;
      border-radius: 0.4vw;
      transition-duration: 0.4s;
      background-color: #2e323d;
      color: #faf9ff;
      border: solid 1px #faf9ff;
    }

    input[type='submit']:hover {
      cursor: pointer;
      background-color: #faf9ff;
      color: #2e323d;
      border: solid 1px #2e323d;
      box-shadow: 0 0 0 0.15vw #717788;
    } 

    input[type='submit']:active {
      cursor: pointer;
      background-color: #faf9ff;
      color: #2e323d;
      border: solid 1px #2e323d;
      transform: translateY(3px);
      box-shadow: none;
    }
    
    `;

  constructor() {
    super();
    this._loginUrl = `${BASE_URL}users/login`;
    const user = getUser();
    if (user) {
      this._user = user;
    }
  }

  _submitForm(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    fetch(this._loginUrl, {
      method: 'post',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type': 'application/json'},
    }).then((result) => result.json()).then((response) => {
      if (response.error) {
        this._errorMessage = response.error;
      } else {
        this._user = response;
        storeUser(response);
      }
    });
  }

  _logout() {
    deleteUser();
    this._user = null;
  }

  render() {
    if (this._user) {
      return html`<p>Logged in as ${this._user.name}</p>
              <button @click=${this._logout}>Logout</button>`;
    }
    return html`
      <p>${this._errorMessage}</p>
      <form @submit=${this._submitForm}>
          Username: <input name="username">
          Password: <input type="password" name="password">
          <input type='submit' value='Login'>
      </form>`;
  }
}

customElements.define('login-widget', LoginWidget);
