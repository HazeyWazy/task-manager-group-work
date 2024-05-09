//for each item in task-board, count
//priority = high sort
//due today

import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {TaskModel} from '../models.js';
import {widgetDesign} from './shareStyle.js';
import './task-board.js';
class WidgetSummary extends LitElement {

    static properties = {
        category: {},
        header: {type: String},
        _tasks: {state: true},
        _due: {state: true},
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
        this._due = TaskModel.getTasksForDay(date);
        this.render();
      }

    render() {
        return html`
            <h3>${this.header}</h3>

            <div>
            <p class='doneTasks'> Scheduled Tasks: ${countToDo()} </p>
            <p class='currentTasks'> Current tasks: ${countDoing()}</p>
            <p class='toDo'> Done: ${countDone()}</p>
            <p class='prioTask'> High Priority ${priority()}</p>
            <p class='dueToday'> Due Today: ${dueDate()}</p>
            </div>



        `;
    }
}

// let scheduled = 0;
// let current =0;
// let done = 0;
// let due = 0;

function countToDo() {
    return TaskModel.getTasks('ToDo').length;
}

function countDoing() {
    return TaskModel.getTasks('Doing').length;
}

function countDone() {
    return TaskModel.getTasks('Done').length;;
}


function priority() {

    let taskList ={};
    let taskList2 ={};
    let prio = 0;

    taskList = TaskModel.getTasks('ToDo');
    taskList2 = TaskModel.getTasks('Doing');

    for (let i =0; i<taskList.length; i++) {

        if (taskList[i].priority >= 5) {
            prio++;
        }
    }

    for (let i =0; i<taskList2.length; i++) {

        if (taskList2[i].priority >= 5) {
            prio++;
        }
    }

    return prio;
}


const date = new Date(); 

function dueDate() {

    
    let due = 0;
    let doneDue ={};
    let doneDueCount = 0;
    due = TaskModel.getTasksForDay(date).length
    doneDue = TaskModel.getTasks('Done')

    for (let i =0; i< doneDue.length; i++){
        let dueDate = new Date(parseInt(doneDue[i].due));

        if (date.toDateString() === dueDate.toDateString()) {
            doneDueCount++;
        }
    }

    due = due-doneDueCount;

    if (due<0){
         due = 0;
     }

    return due;
}





customElements.define('widget-summary', WidgetSummary);
