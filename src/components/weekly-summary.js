import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import {TaskModel} from '../models.js';
import './task-board.js';

class WeeklySummary extends LitElement {

    static properties = {
        header: {type: String},
    };

    constructor()   {
        super();
        this.header = 'Weekly Summary';
        window.addEventListener('tasks', () => {
            this._loadData();
        });
    }

    _loadData() {
        const today = new Date();
        const endOfThisWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (7 - today.getDay()));
        endOfThisWeek.setHours(23,59,59);

        // Get all tasks due within the current week that are not on the Done board
        const allTasks = TaskModel.getTasks();
        this._tasks = allTasks.filter(task => {
            const dueDate = new Date(task.due);
            return (dueDate >= today && dueDate <= endOfThisWeek) && task.category !== 'Done';
        });
        console.log(endOfThisWeek);
        // Sort tasks by due date in ascending order
        this._tasks.sort((a, b) => new Date(a.due) - new Date(b.due));
    
        this.render();
    }

    render()    {
        return html`
        <h3>${this.header}</h3>
    `;
    }
}

customElements.define('weekly-summary', WeeklySummary);