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
    
    static styles = [widgetDesign, css`

    :host {
        --slice1: 20%;
        --slice2: 50%;
    }

    section {
        margin-left: 75px;
        width: 100px;
        height: 100px;
        background-image: conic-gradient(
            #545B6D 0 var(--slice1), 
            #AAB6D6 var(--slice1) var(--slice2), 
            #A1989F var(--slice2) 100%);
            border-radius: 50%;
    }

    ul {
        // padding-top: 100px;
        padding-left:20px; 
    }
    
    li{
        background-color: #e1f1ff;
        border-radius: 20px;
        margin-right: 20px;
        text-align: left;
        padding-left: 20px;
        list-style-type: none;
    }

    .toDo::before {
        content: '';
        display: inline-block;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: #545B6D;
    }

    .currentTasks::before {
        content: '';
        display: inline-block;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: #AAB6D6;
    }

    .doneTasks::before {
        content: '';
        display: inline-block;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: #A1989F;
    }

    
    ` ]
    

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

    sliceColor(firstSlice, secondSlice) {
        this.style.setProperty('--slice1',firstSlice + '%');
        this.style.setProperty('--slice2',secondSlice + '%');
    } 

    render() {
        return html`
            <h3>${this.header}</h3>

            <section id="pie"> </section>

            <div> 
                <button @click="${() => this.sliceColor('10', '40')}">
                Refresh Chart
                </button>
            </div>

            <ul>
               <li> <p class='toDo'> To Do: ${countToDo()} </p> </li>
               <li> <p class='currentTasks'> Doing: ${pieValues()}</p> </li>
               <li> <p class='doneTasks'> Done: ${countDone()}</p> </li>
            </ul>

            <div>
            <p class='prioTask'> High Priority: ${priority()}</p>
            <p class='dueToday'> Due Today: ${dueDate()}</p>
            </div>

        `;
    }
}

let scheduled = 0;
let current =0;
let done = 0;


//return toDo task board count
function countToDo() {

    scheduled= TaskModel.getTasks('ToDo').length;

    return scheduled;
}

//return Doing task board count
function countDoing() {

    current= TaskModel.getTasks('Doing').length;

    return current;
}

//return Done task board count
function countDone() {

    done= TaskModel.getTasks('Done').length;
    
    return done;
}


//return count of tasks in todo/doing with priority >=5
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

//get today's date
const date = new Date(); 


//count tasks due today
function dueDate() {

    //get count of tasks due that are already done
    let doneDue ={};
    let due = 0;
    let doneDueCount = 0;
    //gets all tasks due today
    due = TaskModel.getTasksForDay(date).length
    doneDue = TaskModel.getTasks('Done')

    for (let i =0; i< doneDue.length; i++){
        let dueDate = new Date(parseInt(doneDue[i].due));

        if (date.toDateString() === dueDate.toDateString()) {
            doneDueCount++;
        }
    }

    //subtracts the count of due items with the dues in "done"
    due = due-doneDueCount;
    
    //return 0 if it is negative
    if (due<0){
         due = 0;
     }

    return due;
}
    let sliceVal1 =0;
    let sliceVal2 = 0;


function pieValues() {

    let pieVal = scheduled +current +done;

    sliceVal1 = (scheduled/pieVal)*100;
    sliceVal2 = (current/pieVal)*100;
}



customElements.define('widget-summary', WidgetSummary);
