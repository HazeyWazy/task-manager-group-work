import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { TaskModel } from '../models.js';

class CreateTask extends LitElement {

    static properties = {
        id: { type: Number },
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
        textarea,
        select {
            width: 95%;
            padding: 5px;
            border-radius: 5px;
            border: 1px solid #ccc;
        }

        select {
            width: 98%;
        }

        input:hover,
        textarea:hover,
        select:hover {
            box-shadow: 0 0 0 0.1vw #717788;
        }

        .create-task-button {
            font-size: 1rem;
            padding: 0.6vw 2vw;
            border-radius: 1.1vw;
            transition-duration: 0.4s;
            background-color: #dae0ef;
            color: #3E4351;
            margin-bottom: 10px;
            border: none;
            cursor: pointer;
            display: inline-block;
            width: auto;            
            border: 2px solid #D1D7E6;
        }

        .create-button {
            padding: 0.6vw 2vw;
            border-radius: 1.1vw;
            transition-duration: 0.4s;
            background-color: #dae0ef;
            color: #3E4351;
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
            
        .create-task-button:hover,
        .create-button:hover {
            background-color: #D1D7E6;
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

    constructor() {
        super();
        this.category = null;
        this.summary = '';
        this.text = '';
        this.priority = null;
        this.due = null;
    }

    _createTask(newTask) {
        TaskModel.createTask(newTask)
            .then(() => {
                // Fetch updated task data after creating a new task
                TaskModel.loadData();
            })
            .catch((error) => {
                console.error('Error creating task:', error);
            });
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
            priority: this.priority || 1, // Set default priority to 1 if not provided
            due: this.due 
        };

        // Call the createTask method from TaskModel to create the new task
        TaskModel.createTask(newTask);

        // Close the dialog
        this._hideModal();

        // Clear the form fields after submission
        this.category = null;
        this.summary = '';
        this.text = '';
        this.priority = null;
        this.due = null;
    }

    _categoryChanged(event) {
        this.category = event.target.value;
    }

    _summaryChanged(event) {
        this.summary = event.target.value;
    }

    _textChanged(event) {
        this.text = event.target.value;
    }

    _dueChanged(event) {
        this.due = event.target.value;
    }

    _priorityChanged(event) {
        this.priority = parseInt(event.target.value);
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
        const dialog = this.renderRoot.querySelector('#create-task-dialog');
        dialog.close();

        // Reset form fields
        this.category = '';
        this.summary = '';
        this.text = '';
        this.priority = '';
        this.due = '';
    }

    render() {
        return html`
            <button class="create-task-button" @click=${this._showModal}>Create New Task</button>
            <dialog id="create-task-dialog">
                <form @submit="${this._submit}">
                <div>
                    <label for="category">Category</label>
                    <select name="category" @change="${this._categoryChanged}" .value="${this.category || ''}" required>
                        <option value="ToDo">To Do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>                    
                </div>
                <div>
                    <label for="summary">Summary</label>
                    <input type="text" name="summary" @change="${this._summaryChanged}" .value="${this.summary}" required>
                </div>
                <div>
                    <label for="text">Text</label>
                    <textarea name="text" @change="${this._textChanged}" .value="${this.text}" required></textarea>
                </div>
                <div>
                    <label for="priority">Priority</label>
                    <input type="number" name="priority" @change="${this._priorityChanged}" .value="${this.priority}" required>
                </div>
                <div>
                    <label for="due">Due</label>
                    <input type="datetime-local" name="due" @change="${this._dueChanged}" .value="${this.due}" required>
                </div>
                <div>
                    <button class="cancel-button" @click="${this._hideModal}">Cancel</button>
                    <input class="create-button" type="submit" value="Create" />
                </div>
                </form>
            </dialog>
        `;
    }
}

customElements.define('create-task', CreateTask);