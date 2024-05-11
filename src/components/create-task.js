import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { TaskModel } from '../models.js';

class CreateTask extends LitElement {

    static properties = {
        id: 0,
        _task: { state: true },
        category: { type: String },
        summary: { type: String },
        text: { type: String },
        priority: { type: Number },
        due: { type: String }
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

        .create-task-button {
            font-size: 1rem;
            padding: 0.6vw 2vw;
            border-radius: 1.1vw;
            transition-duration: 0.4s;
            background-color: #e1f1ff;
            color: #2E323D;
            margin-bottom: 10px;
            border: none;
            cursor: pointer;
            display: inline-block;
            width: auto;            
            border: 2px solid #aab6d6;
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
            
        .create-task-button:hover {
            background-color: #aab6d6;
            color: black;
            box-shadow: 0 0 0 0.1vw #838FAD;
        }

        .cancel-button:hover {
            background-color: #5B5E67;
        }

        .cancel-button:active {
            transform: translateY(2px);
        }

        .create-task-button:active {
            transform: translateY(2px);
        }

        div:last-child {
            display: flex;
            align-items: center;
            justify-content: end;
            gap: 5px;
        }
    `;

    constructor() {
        super();
        this.category = 'ToDo';
        this.summary = '';
        this.text = '';
        this.priority = '';
        this.due = '';
    }

    /**
     * _submit - private method to handle form submission. Constructs
     * a new task from the form values and then creates the task via TaskModel
     * @param {Object} event - the click event
     */
    _submit(event) {
        event.preventDefault();

        // Create a new task object with the form data
        const newTask = {
            category: this.category,
            summary: this.summary,
            text: this.text,
            priority: this.priority,
            due: new Date(this.due).valueOf() // Convert due date to milliseconds
        };

        // Call the createTask method from TaskModel to create the new task
        TaskModel.createTask(newTask);

        // Clear the form fields after submission
        this.category = 'ToDo';
        this.summary = '';
        this.text = '';
        this.priority = '';
        this.due = '';
    }

    /**
     * click handler for the button to show the create dialog
     */
    _showModal() {
        const dialog = this.renderRoot.querySelector('#create-task-dialog');
        dialog.showModal();
    }

    /**
     * click handler to close the create dialog
     * @param {Object} event - the click event
     */
    _hideModal(event) {
        event.preventDefault();
        const dialog = this.renderRoot.querySelector('#create-task-dialog');
        dialog.close();
    }

    render() {
        return html`
            <button class="create-task-button" @click=${this._showModal}>Create New Task</button>
            <dialog id="create-task-dialog">
                <form @submit="${this._submit}">
                <div>
                    <label for="category">Category</label>
                    <select name="category" .value="${this.category}" required>
                        <option value="ToDo">To Do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>                    
                </div>
                <div>
                    <label for="summary">Summary</label>
                    <input type="text" name="summary" .value="${this.summary}" required>
                </div>
                <div>
                    <label for="text">Text</label>
                    <textarea name="text" .value="${this.text}" required></textarea>
                </div>
                <div>
                    <label for="priority">Priority</label>
                    <input type="number" name="priority" .value="${this.priority}" required>
                </div>
                <div>
                    <label for="due">Due</label>
                    <input type="datetime-local" id="due" name="due" .value="${this.due}" required>
                </div>
                <div>
                    <button class="cancel-button" @click="${this._hideModal}">Cancel</button>
                    <input class="" type="submit" value="Create" />
                </div>
                </form>
            </dialog>
        `;
    }
}

customElements.define('create-task', CreateTask);