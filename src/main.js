import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import './components/widget-block.js';
import './components/blog-block.js';
import './components/widget-container.js';
import './components/ad-widget.js';
import './components/login-widget.js';
import './components/task-manager.js';
import './components/widget-summary.js';

/**
 * Comp2110TaskManager component constructs the main UI of the application
 */
class Comp2110TaskManager extends LitElement {
  static properties = {
    header: {type: String},
  };

  static styles = css`
    :host {
      min-height: 100vh;   
      font-size: 14pt;
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--comp2110-portal-background-color);
    }

    main {
      display: flex;
      justify-content: space-evenly;
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }

    header {
      background-color: #2e323d;
      color: #faf9ff;
      padding-top: 1px;
      padding-left: 1rem;
      padding-right: 1rem;
      display: flex;
      flex-direction: row;
      align-content: center;
      justify-content: flex-end;
      align-items: center;
      position: sticky;
    }

    header h1 {
      margin-right: auto;
      font-size: 1.8rem;
    }
    
  `;

  constructor() {
    super();
    this.header = 'COMP2110 Task Manager';
  }

  render() {
    return html`
      <header>
        <h1>${this.header}</h1>
        <login-widget></login-widget>
      </header>

      <main>      
        <task-manager></task-manager>     
        <widget-container header="Widgets">
          <ad-widget></ad-widget>
          <widget-summary></widget-summary>
          <widget-block header="Widget 2"></widget-block>
          <widget-block header="Widget 3"></widget-block>
        </widget-container>
      </main>

      <p class="app-footer">
        🚽 Made with love by
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/open-wc"
          >open-wc</a
        >.
      </p>
    `;
  }
}

customElements.define('comp2110-task-manager', Comp2110TaskManager);
