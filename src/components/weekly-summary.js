import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import { TaskModel } from '../models.js';
import './task-board.js';

class WeeklySummary extends LitElement {

    static properties = {
        header: { type: String },
        _tasks: { type: Array }
    };

    constructor() {
        super();
        this.header = 'Weekly Summary';
        this._tasks = [];

        window.addEventListener('tasks', () => {
            this._loadData();
        });
    }

    _loadData() {
        const today = new Date(); 

        const endOfThisWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (7 - today.getDay()));
        endOfThisWeek.setHours(23, 59, 59);
        console.log(endOfThisWeek);

        // Get all tasks due within the current week that are not on the Done board
        const allTasks = TaskModel.getTasks();
        this._tasks = allTasks.filter(task => {
            const dueDate = new Date(task.due);
            return (dueDate <= endOfThisWeek) && task.category !== 'Done';
        });

        // Sort tasks by due date in ascending order
        this._tasks.sort((a, b) => new Date(a.due) - new Date(b.due));

        this.render();
    }

    render() {
        return html`
            <h3>${this.header}</h3>
            <div>
                ${this._tasks.length > 0 ? html`
                    <ul>
                        ${this._tasks.map(task => html`
                            <li>${task.summary} is due on ${new Date(task.due).toLocaleDateString()}</li>
                        `)}
                    </ul>
                ` : html`
                    <p>No tasks due this week.</p>
                `}
            </div>
        `;
    }
}

customElements.define('weekly-summary', WeeklySummary);