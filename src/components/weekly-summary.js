import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import { TaskModel } from '../models.js';
import './task-board.js';
import {widgetDesign} from './shareStyle.js';


class WeeklySummary extends LitElement {

    static properties = {
        header: { type: String },
        _tasks: { type: Array }
    };

    static styles = [widgetDesign];

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
                    <table>
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Due Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this._tasks.map(task => html`
                                <tr>
                                    <td>${task.summary}</td>
                                    <td>${new Date(task.due).toLocaleDateString()}</td>
                                </tr>
                            `)}
                        </tbody>
                    </table>
                ` : html`
                    <p>No tasks due this week.</p>
                `}
            </div>
        `;
    }
}

customElements.define('weekly-summary', WeeklySummary);