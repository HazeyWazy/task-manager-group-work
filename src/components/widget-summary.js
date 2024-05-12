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
        --slice1: 0%;
        --slice2: 0%;
    }

    section {
        margin-left: auto;
        margin-right: auto;
        width: 100px;
        height: 100px;
        background-image: conic-gradient(
            #545B6D 0 var(--slice1), 
            #AAB6D6 var(--slice1) var(--slice2), 
            #A1989F var(--slice2) 100%);
            border-radius: 50%;
    }


    ul {
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
        vertical-align: -5%;
    }

    .currentTasks::before {
        content: '';
        display: inline-block;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: #AAB6D6;
        vertical-align: -5%;
    }

    .doneTasks::before {
        content: '';
        display: inline-block;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: #A1989F;
        vertical-align: -5%;
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
        this.sliceColor(sliceVal1, sliceVal1+sliceVal2);
        
    }

    //method to change the piechart values
    sliceColor(firstSlice, secondSlice) {
        this.style.setProperty('--slice1',firstSlice + '%');
        this.style.setProperty('--slice2',secondSlice + '%');

    } 

    render() {
        return html`
            <h3>${this.header}</h3>

            <section id="pie"> </section>

            <div> 
                <p class="total">Task Total: ${pieValues()}</p>
            </div>

            <ul>
               <li> <p class='toDo'> To Do: ${countToDo()} </p> </li>
               <li> <p class='currentTasks'> Doing: ${countDoing()}</p> </li>
               <li> <p class='doneTasks'> Done: ${countDone()}</p> </li>
            </ul>

            <div>
            <p class='prioTask'> High Priority: ${priority()}</p>
            <p class='dueToday'> Due Today: ${dueDate()}</p>
            </div>

        `;
    }
}

//variables to hold count of items
let scheduled = 0;
let current =0;
let done = 0;
let sliceVal1 =0;
let sliceVal2 = 0;
let pieVal = 0;

//function to update the pie values, shows total task count
function pieValues() {

    pieVal = scheduled +current +done;

    sliceVal1 = (scheduled/pieVal)*100;
    sliceVal2 = (current/pieVal)*100;

    return pieVal;
}

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

//return count of tasks with priority >=5
function priority() {

    let taskList ={};
    let prio = 0;

    taskList = TaskModel.getTasks();

    for (let i =0; i<taskList.length; i++) {

        if (taskList[i].priority >= 5) {
            prio++;
        }
    }

    return prio;
}

//get today's date
const date = new Date(); 

//count tasks due today
function dueDate() {

    let due = 0;
    due = TaskModel.getTasksForDay(date).length

    return due;
}


customElements.define('widget-summary', WidgetSummary);
