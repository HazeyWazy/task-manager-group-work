//for each item in task-board, count
//priority = high sort
//due today

import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class WidgetSummary extends LitElement {

    static properties () {
        let DoneTasks = 0;
        let CurrectTasks =0;
        let ToDo = 0;
        let HighPrio = 0;
        let Today =0;
    }
    

    countTasks () {

//placeholder numbers     
        for (let i = 0; i < 3; i++){ //loop task board
            for (let n =0; n< 9; n++) { //loop tasks in task board

//check priority
//check date

            }



        }
    }

}

customElements.define('widget-summary', WidgetSummary);
