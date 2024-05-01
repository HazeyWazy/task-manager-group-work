//for each item in task-board, count
//priority = high sort
//due today

import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class WidgetSummary extends LitElement {

    static properties () {
        let DoneTasks = 0;
        let CurrentTasks =0;
        let ToDo = 0;
        let HighPrio = 0;
        let Today =0;
    }
    

    countTasks () {

        let done =0;
        let current =0;
        let todo = 0;
        let high =0;
        let now =0;

//placeholder numbers     
        for (let i = 0; i < 3; i++){ //loop task board
            for (let n =0; n< 5; n++) { //loop tasks in task board

//check priority
/* if _.priority >4 {
    high++;
}
*/
//check date
/*
if _.date == today'sdate{
    now++;
}

*/
            }
//record numbers
/*

DoneTasks = done;
CurrentTasks =current;
ToDo = todo;
HighPrio = high;
Today =now;

*/

        }
    }

}

customElements.define('widget-summary', WidgetSummary);
