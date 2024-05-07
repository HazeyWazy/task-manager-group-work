//for each item in task-board, count
//priority = high sort
//due today

import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {TaskModel} from '../models.js';
import {widgetDesign} from './shareStyle.js';
import './task-card.js';
import './task-board.js';
class WidgetSummary extends LitElement {

    static properties = {
        header: {type: String},
        _tasks: {state: true},
    }
    
    static styles = [widgetDesign]

    constructor() {
        super();
        this.header = 'Task Summary';
        // set an event listener to refresh the display when the data is ready
        window.addEventListener('tasks', () => {
        this._loadData();
      });

      }

      _loadData() {
        // get the up to date summary
        this._tasks = TaskModel.getTasks(this.category);
        this.render();
      }

    render() {
        return html`
            <h3>${this.header}</h3>

            <div>
            <p class='doneTasks'> Scheduled Tasks: ${countToDo()} </p>
            <p class='currentTasks'> Current tasks: ${countDoing()}</p>
            <p class='toDo'> Done: ${countDone()}</p>
            </div>



        `;
    }
}

let scheduled = 0;
let current =0;
let done = 0;
let prio = 0;
let due =0;

function countToDo() {

    return scheduled;
}

function countDoing() {

    return current;
}

function countDone() {
    return done;
}







customElements.define('widget-summary', WidgetSummary);
