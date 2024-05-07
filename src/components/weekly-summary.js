import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class WeeklySummary extends LitElement {

    static properties = {
        header: {type: String},
    };

    constructor()   {
        super();
        this.header = 'Weekly Summary';
    }

    render()    {
        return html`
        <h3>${this.header}</h3>
    `;
    }
}

customElements.define('weekly-summary', WeeklySummary);