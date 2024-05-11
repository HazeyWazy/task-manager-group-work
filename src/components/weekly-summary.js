import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import { TaskModel } from '../models.js';
import './task-board.js';
import {widgetDesign} from './shareStyle.js';

class WeeklySummary extends LitElement {

    static properties = {
        header: { type: String },
        _tasks: { type: Array }
    };


    static styles = [widgetDesign, css`
        li {
            line-height: 22px;
            padding-bottom: 10px;
            padding-right: 10px;
            margin-left: -30px;
        }
    `]

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
        console.log(this._tasks)
        this.render();
    }

    render() {
        
        return html`
            <h3>${this.header}</h3>
            <div>
                ${this._tasks.length > 0 ? html`
                    <div class="container">
                        ${this._tasks.map(task => html`
                            <div class="date">
                                <div class="nDate">${this.getDayName(task.due)}</div>
                                <div class="date">${new Date(task.due).toLocaleDateString()}</div>
                            </div>
                            <div class="task-section">
                                <div class="due-time">${new Date(task.due).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>    
                                <div class="tasks">${task.summary}</div>
                            </div>
                        `)}
                    </div>
                ` : html`
                    <p>No tasks due this week.</p>
                `}
            </div>
        `;
    }
    getDayName(dateString) {
        const date = new Date(dateString);
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return dayNames[date.getDay()];
    }
}
    
customElements.define('weekly-summary', WeeklySummary);