import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import './components/widget-block.js';
import './components/blog-block.js';
import './components/widget-container.js';
import './components/ad-widget.js';
import './components/login-widget.js';
import './components/task-manager.js';
import './components/widget-summary.js';
import './components/weekly-summary.js';
import './components/task-timer-widget.js';
import './components/create-task.js';

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
      margin: 0 auto;
      text-align: center;
      background-color: var(--comp2110-portal-background-color);
      display: flex;
      flex-direction: column;
    }

    main {
      display: grid;
      grid-template-rows: auto 1fr;
      grid-template-columns: 1fr 300px;
      justify-items: center;
    }

    .my-tasks {
      margin: 10px;
      margin-bottom: 0;
      border-radius: 20px;
      width: 73vw;
      display: flex;
    }

    .my-tasks h2 {
      color: #2E323D;
      display: inline-block;
      margin-right: auto;
      padding-left: 5px;
    }

    create-task {
      align-content: center;
      padding-right: 8px;
      margin-bottom: -10px;
    }

    task-manager {
      grid-row: 2;
      grid-column: 1;
    }

    widget-container {
      grid-row: span 2;
      grid-column: 2;
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
      grid-column: span 2;
    }

    header h1 {
      margin-right: auto;
      font-size: 1.8rem;
    }

    .ad-widget {
      margin-top: 1rem;
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
        <div class="my-tasks">
          <h2>My Tasks</h2>
          <create-task></create-task>
        </div>
        <task-manager></task-manager>     
        <widget-container header="Widgets">
          <ad-widget class="ad-widget"></ad-widget>
          <widget-summary></widget-summary>
          <task-timer-widget></task-timer-widget>
        </widget-container>
        <weekly-summary></weekly-summary>
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
