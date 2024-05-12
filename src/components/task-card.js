import {
  LitElement,
  html,
  css,
} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { TaskModel } from '../models.js';
import './edit-task.js';  // Import the EditTask component
import './delete-task.js'; // Import the DeleteTask component

class TaskCard extends LitElement {
  static properties = {
    id: { type: Number },
    _task: { state: true },
    expanded: { type: Boolean },
    contentThreshold: { type: Number },
    showPopup: { type: Boolean },
  };

  static styles = css`
    :host {
      display: block;
      width: 20vw;
      background-color: #dae0ef;
      border-radius: 20px;
      color: black;
    } 

    h2 {
      padding-top:10px;
      font-size: large;
      border-radius: 50px 50px;
    }

    div p {
      color: #3E4351;
    }

    // to prevent overflow for long text
    .task-card {
      hyphens: auto;
      overflow-wrap: break-word;
      word-wrap: break-word;
    }

    .task-due {
      color: #f53d3d;
    }

    .task-priority {
      font-size: larger;
      height: 35px;
      width: 40px;
      text-align: center;
      padding-top: 5px;
      margin-top: 15px;
      margin-left: auto;
      margin-right: auto;
      border-radius: 50%;
      background: rgba(255, 255, 255, .05);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
      backdrop-filter: blur(10px);
    }

    .collapsed {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .expanded {
      white-space: normal;
      overflow: visible;
    }

    .expand-button {
      padding: 0.3vw 1.2vw;
      border-radius: 0.4vw;
      transition-duration: 0.4s;
      background-color: #387ef5;
      color: #faf9ff;
      margin-bottom: 10px;
      border: none;
      font-size: 15px;
    }

    .expand-button:hover {
      background-color: #0063D6;
    }

    .popup-container {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      color: black;
      z-index: 2;
      display: none;
    }

    .popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1;
      display: none;
    }

    .popup-container.visible,
    .popup-overlay.visible {
      display: block;
    }
  `;

  constructor() {
    super();
    this.expanded = false;
    this.showPopup = false;
    this.contentThreshold = 30; // Change this threshold as needed
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadData();
    window.addEventListener('tasks', () => {
      this._loadData();
    });
  }

  _loadData() {
    this._task = TaskModel.getTask(this.id);
  }

  toggleContent() {
    this.expanded = !this.expanded;
  }

  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  /**
   * Handle task deletion
   * @param {CustomEvent} event - The task-deleted event
   */
  _handleTaskDeleted(event) {
    const { taskId } = event.detail;
    if (taskId === this.id) {
      // Task with this ID was deleted, update UI accordingly
      // For example, you can reset the task data or remove the task card from the UI
      // Here, we'll just reload the data
      this._loadData();
    }
  }

  render() {
    // Check if _task is available
    if (this._task) {
      // Convert timestamp and due date strings to Date objects
      const ts = new Date(parseInt(this._task.timestamp));
      const due = new Date(parseInt(this._task.due));

      // Return HTML template
      return html`
        <div class="task-card">        
          <!-- Display task summary -->
          <h2>${this._task.summary}</h2>

          <!-- Display task timestamp -->
          <p class="task-timestamp">${ts.toDateString()}</p>

          <!-- Display task due date -->
          <p class="task-due">${due.toDateString()}</p>

          <!-- Check if task text length is greater than contentThreshold -->
          ${this._task.text.length > this.contentThreshold
            ? html`
                <!-- Display task text with option to expand/collapse -->
                <p class=${this.expanded ? 'expanded' : 'collapsed'}>

                  <!-- Show full text if expanded, otherwise show truncated text -->
                  ${this.expanded
                    ? this._task.text
                    : html`${this._task.text.substring(
                        0,
                        this.contentThreshold
                      )}...`}
                </p>

                <!-- Button to expand/collapse task text -->
                <span class="expand-button" @click=${this.togglePopup}>
                  ${this.expanded ? 'Collapse' : 'Expand'}
                </span>
              `
            : html`
                <!-- Display full task text if it's shorter than contentThreshold -->
                <p>${this._task.text}</p>
              `}

          <!-- Display task priority -->
          <p class="task-priority">${this._task.priority}</p>

          <!-- Display edit-task component -->
          <edit-task id=${this.id}></edit-task>

          <!-- Display DeleteTask component -->
          <delete-task id=${this.id} @task-deleted="${this._handleTaskDeleted}"></delete-task>

          <!-- Display popup overlay if showPopup is true -->
          <div
            class="popup-overlay ${this.showPopup ? 'visible' : ''}"
            @click=${this.togglePopup}
          ></div>

          <!-- Display popup container if showPopup is true -->
          <div class="popup-container ${this.showPopup ? 'visible' : ''}">

            <!-- Display full task text in popup -->
            <p>${this._task.text}</p>

            <!-- Button to close popup -->
            <button @click=${this.togglePopup}>Close</button>

          </div>          
        </div>
      `;
    } else {
      // Display "Loading..." message if _task is not available
      return html`<div>Loading...</div>`;
    }
  }
}

customElements.define('task-card', TaskCard);
