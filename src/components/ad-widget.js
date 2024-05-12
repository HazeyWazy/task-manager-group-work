import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {BASE_URL} from '../config.js';

/**
 * AdWidget <ad-widget> displays an advert from the backend server
 */
class AdWidget extends LitElement {
  static properties = {
    adUrl: {type: String},
  };

  static styles = css`
    :host {
      display: block;
      width: 280px;
      height: 280px;
    }
    :host p {
      position: relative;
      top: -55px;
      text-align: right;
      padding-right: 10px;
      z-index: 0;
      color: white;
    }

    img {
      width: 100%;
      border-radius: 10px;
      border: #3E4351;
    }
  `;

  constructor() {
    super();
    this.adUrl = `${BASE_URL}adserver`;
  }

  render() {
    return html`
  <div>
        <img src=${this.adUrl} alt="Advertisment">
        <p>Advertisment</p>
  </div>
    `;
  }
}

customElements.define('ad-widget', AdWidget);
