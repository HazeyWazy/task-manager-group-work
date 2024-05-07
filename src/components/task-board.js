import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {TaskModel} from '../models.js';
import './task-card.js';
import {taskPanels} from './shareStyle.js';

/**
 * TaskBoard <task-board category="XXX">
 * Display tasks in the given category
 */
class TaskBoard extends LitElement {
  static properties = {
    category: {},
    _tasks: {state: true},
    _message: {state: true},
  };

  static styles = css`
  :host {    
    background-color: purple;
    color: white;
    border: 10px solid #03045e;
    border-radius: 20px;
    padding: 10px;
    margin: 10px;
    width: 22vw;
    height: 120dvh;
    background-color: #0077b6;
    display: flex;
    justify-content: center;
    overflow: auto;
  }

  :host input {
      width: 5em;
  }
  .task-actions {
    display: block;
  }
  .task-actions li {
    display: inline-block;
  }

  h3 {
    color: #181B29
  }
  `;


  constructor() {
    super();
    // set an event listener to refresh the display when the data is ready
    window.addEventListener('tasks', () => {
      this._loadData();
    });
  }

  _loadData() {
    // get the up to date task list
    this._tasks = TaskModel.getTasks(this.category);
    this.render();
  }

  render() {
    if (this._message) {
      return html`<h3>${this.category}</h3> <p>${this._message}</p>`;
    } else if (this._tasks) {
      return html`
          <div>
            <h3>${this.category}</h3>

            <div class="card-list">
              ${this._tasks.map((task) => {
                  return html`<task-card id=${task.id}></task-card>`;
                })}
            </div>
          </div>
        `;
    } else {
      return html`<h3>${this.category}</h3><p>Loading....</p>`;
    }
  }
}

customElements.define('task-board', TaskBoard);
