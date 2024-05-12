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

        div {
            padding : 0;
        }

        .container {
            display: flex;
            flex-direction: column;
            line-height: 1.5px;
            border-top: 1px solid black;
            background-color: #ffffed;
        }

        .one-task   {
            border-bottom: 1px solid black;
            border-radius:10px;
        }

        .one-task:hover {
            box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.4);; 
            transform: translateY(-5px); /* Lift the one-task */
            transition: all 0.3s ease; /*smooth animation */
        }
        
        .date {
            font-weight: bold;  
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            background-color: #e1e1e1;
            height:40px;
        }
        
        .nDate {
            
            margin-right:auto;
            padding-left:15px;
        }

        .fDate  {
            margin-left:auto;
            padding-right: 15px;
        }
        
        .task-section {
            display: flex;
            margin-bottom: 15px;
            padding-right: 15px;
            
        }
        
        .due-time {
            padding-left:15px;
            width: 30%;
            font-style: italic;
        }
        
        .tasks {
            text-align: left;
            width : 60%;
            font-weight: bold;

            /*To prevent overflow for long text*/
            hyphens: auto;
            overflow-wrap: break-word; /* For newer browsers */
            word-wrap: break-word; /* For older browsers */
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
            <div class="Wsummary">
                ${this._tasks.length > 0 ? html`
                    <div class="container">
                        ${this._tasks.map(task => html`
                            <div class="one-task">
                                <div class="date">
                                    <div class="nDate">${this.getDayName(task.due)}</div>
                                    <div class="fDate">${new Date(task.due).toLocaleDateString()}</div>
                                </div>
                                <div class="task-section">
                                    <div class="due-time">${new Date(task.due).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>    
                                    <div class="tasks">${task.summary}</div>
                                </div>
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