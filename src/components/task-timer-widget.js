import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {TaskModel} from '../models.js';
import {widgetDesign} from './shareStyle.js';
import './task-board.js';

class TaskTimer extends LitElement {
    static styles = [widgetDesign, css`
    input {
        width: 40px; /* text box width */
        height: 15px; /* text box height */
        
      }
      
      
      .start-button {
        padding: 0.6vw 2vw;
        border-radius: 1.1vw;
        transition-duration: 0.4s;
        background-color: #0063D6;
        margin-bottom: 10px;
        border: none;
        color: #faf9ff;
        cursor: pointer;
        display: inline-block;
        width: auto;
    }

    `]
    
    

    static properties = {
        minutes: {type: Number},
        seconds: {type: Number},
        count: {type: Number},
        countingDown: {type: Boolean},
        enableButton: {type: Boolean},
        headingStyle: {type: String},
        bellStyle: {type: String},
    };

    constructor() {
        super();
        this.countingDown = false;
        this.enableButton = true;
        this.minutes = 0;
        this.seconds = 0;
        this.count = 0;
        this.headingStyle = 'normal';
        this.bellStyle = 'hide-bell';
        
        
        setInterval(() =>  {
            if(this.countingDown) {
                if (this.count > 0) {
                this.count = this.count - 1;
                } else {
                    this.enableButton = true;
                    this.countingDown = false;
                    // Logic here to show warning
                    this.playAlarm();
                }
            }
        }, 1000);

        window.addEventListener('tasks', () => {
            this._loadData();
        });
    }

    _loadData() {
        this.render();

       
    }

    updateMinutes(event) {
        this.minutes = Number(event.target.value)*60;
      }

      updateSeconds(event) {
        this.seconds = Number(event.target.value);
      }

      
      startCountdown() {
        this.count = this.minutes + this.seconds;

        if(!this.countingDown) {
            this.countingDown = true;
            this.enableButton = false;
        }
        this.headingStyle = 'normal';
        this.bellStyle = 'hide-bell';
    }

    playAlarm() {
        const audio = new Audio('http://bruitages.free.fr/horloges/sonnette_reveil.wav'); 
        audio.play();
        this.headingStyle = 'flash-red';
        this.bellStyle = 'show-bell';

    }
       

    render() {
        return html`
            <h3 class="${this.headingStyle}"><span class="${this.bellStyle}"><td class="chars">🔔</td></span>Task Timer<span class="${this.bellStyle}"><td class="chars">🔔</td></h3>
            <p>      <input type="number" @input=${this.updateMinutes}> mins  <input type="number" @input=${this.updateSeconds}> secs</p>
            <button class = "start-button" @click=${this.startCountdown} ?disabled=${!this.enableButton}>Start Timer</button>
            <!-- p> ${this.minutes}  ${this.seconds} ${this.count}</p -->
            <p>Time Left ${Math.floor(this.count / 60)}:${String(this.count % 60).padStart(2, '0')}</p>
        `;
    }

}
customElements.define('task-timer-widget', TaskTimer);