import {  LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { TaskModel } from '../models.js';

/** EditTask <edit-task id=N>
 * Task edit for a given task id (N).  Displays as a button which when clicked
 * shows a modal dialog containing a form to update the task properties.
 * Submitting the form updates the task via the TaskModel.
 */
class EditTask extends LitElement {
  static properties = {
    id: 0,
    _task: { state: true },
  };

  static styles = css`

    dialog {
      width: 500px;
      border: 1px solid;
      border-radius: 10px;      
      box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
    }

    form {
      display: flex;
      flex-direction: column;
    }

    form div {
      margin-bottom: 10px;
    }

    label {
      font-weight: bold;
    }

    input,
    textarea {
      width: 95%;
      padding: 5px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }

    input:hover,
    textarea:hover,
    select:hover {
      box-shadow: 0 0 0 0.1vw #717788;
    }

    .edit-button {
      padding: 0.6vw 2vw;
      border-radius: 1.1vw;
      transition-duration: 0.4s;
      background-color: #387ef5;
      color: #faf9ff;
      margin-bottom: 10px;
      border: none;
      cursor: pointer;
      display: inline-block;
      width: auto;
    }

    .cancel-button {
      padding: 0.6vw 2vw;
      border-radius: 1.1vw;
      transition-duration: 0.4s;
      background-color: #757985;
      margin-bottom: 10px;
      border: none;
      color: #faf9ff;
      cursor: pointer;
      display: inline-block;
      width: auto;
  }
    
    .edit-button:hover {
      background-color: #0063D6;
    }

    .cancel-button:hover {
      background-color: #5B5E67;
    }

    div:last-child {
      display: flex;
      align-items: center;
      justify-content: end;
      gap: 5px;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this._task = TaskModel.getTask(this.id);
  }

  /**
   * _submit - private method to handle form submission. Constructs
   * a new task from the form values and then updates the task via TaskModel
   * @param {Object} event - the click event
   */
  _submit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const due = new Date(formData.get('due'));
    const newTask = {
      summary: formData.get('summary'),
      text: formData.get('text'),
      priority: formData.get('priority'),
      due: due.valueOf(),
    };
    TaskModel.updateTask(this.id, newTask);
    this._hideModal(event);
  }

  /**
   * click handler for the button to show the editor dialog
   */
  _showModal() {
    const dialog = this.renderRoot.querySelector('#edit-task-dialog');
    dialog.showModal();
  }

  /**
   * click handler to close the editor dialog
   * @param {Object} event - the click event
   */
  _hideModal(event) {
    event.preventDefault();
    const dialog = this.renderRoot.querySelector('#edit-task-dialog');
    dialog.close();
  }

  render() {
    // convert due date from milliseconds time to an ISO string
    // suitable for the datetime-local form input
    const isoString = new Date(this._task.due).toISOString();
    const due = isoString.substring(0, isoString.indexOf('T') + 6);
    return html` 
      <button class="edit-button" @click=${this._showModal}>Edit</button>
      <dialog id="edit-task-dialog">
        <form @submit="${this._submit}">
          <div>
            <label for="summary">Summary</label>
            <input name="summary" value=${this._task.summary} />
          </div>
          <div>
            <label for="text">Text</label>
            <textarea name="text">${this._task.text}</textarea>
          </div>
          <div>
            <label for="priority">Priority</label>
            <input name="priority" type="number" value=${this._task.priority} />
          </div>
          <div>
            <label for="due">Due</label>
            <input name="due" type="datetime-local" value=${due} />
          </div>
          <div>
            <button class="cancel-button" @click="${this._hideModal}">Cancel</button>
            <input class="edit-button" value="Update" type="submit" />
          </div>
        </form>
      </dialog>
    `;
  }
}

customElements.define('edit-task', EditTask);
