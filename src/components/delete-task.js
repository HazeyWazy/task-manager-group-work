import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { TaskModel } from '../models.js';

class DeleteTask extends LitElement {
    static properties = {
            id: 0,
            _task: { state: true },
    };

    static styles = css`
        .delete-button {
            padding: 0.6vw 1.5vw;
            border-radius: 0.4vw;
            transition-duration: 0.4s;
            background-color: #f53d3d;
            color: #faf9ff;
            cursor: pointer;
            display: inline-block;
            border: none;
        }

        .cancel-button {
            padding: 0.6vw 1.5vw;
            border-radius: 0.4vw;
            transition-duration: 0.4s;
            background-color: #757985;
            color: #faf9ff;
            cursor: pointer;
            display: inline-block;
            border: none;
        }

        .delete-button:hover {
            background-color: #d50000;
        }

        .cancel-button:hover {
            background-color: #5B5E67;
        }

        /* Style for the confirmation dialog */

        dialog {        
            background-color: #fff;
            padding: 20px;
            border: 1px solid;
            border-radius: 10px;
            box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
        }

        dialog p {
            margin: 0;
            padding-top: 10px;
            padding-bottom: 20px;
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
     * _submit - private method to handle form submission. Deletes
     * the task via TaskModel
     * @param {Object} event - the click event
     */
    _submit(event) {
            event.preventDefault();
            TaskModel.deleteTask(this.id);
            this._hideModal(event);
    }

    /**
     * click handler for the button to show the delete dialog
     */
    _showModal() {
            const dialog = this.renderRoot.querySelector('#delete-task-dialog');
            dialog.showModal();
    }

    /**
     * click handler to close the delete dialog
     * @param {Object} event - the click event
     */
    _hideModal(event) {
            event.preventDefault();
            const dialog = this.renderRoot.querySelector('#delete-task-dialog');
            dialog.close();
    }

    render() {    
        return html`
        <button class="delete-button" @click=${this._showModal}>Delete</button>
        <dialog id="delete-task-dialog">
            <form @submit="${this._submit}">
            <div>
                <p>Are you sure you want to delete this task?</p>
            </div>          
            <div>
                <button class="cancel-button" @click="${this._hideModal}">Cancel</button>
                <input class="delete-button" value="Delete" type="submit" />
            </div>
            </form>
        </dialog>`;
    }
}

customElements.define('delete-task', DeleteTask);
