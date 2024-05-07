//for each item in task-board, count
//priority = high sort
//due today

import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import './task-card.js';
import './task-board.js';
import './task-manager.js';
import {widgetDesign} from './shareStyle.js';
class WidgetSummary extends LitElement {

    static properties () {
        header: {type: String};
        let DoneTasks = 0;
        let CurrentTasks =0;
        let ToDo = 0;
        let HighPrio = 0;
        let Today =0;
    }
    
    static styles = [widgetDesign]

    constructor() {
        super();
        this.header = 'Task Summary';
      }



    render() {
        return html`
            <h3>${this.header}</h3>
        `;
      }

}





customElements.define('widget-summary', WidgetSummary);
