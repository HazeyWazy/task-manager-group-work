import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {TaskModel} from '../models.js';
import {widgetDesign} from './shareStyle.js';
import './task-board.js';

class TaskTimer extends LitElement {
    static styles = [widgetDesign];
    

    static properties = {
        count: {type: Number},
        countingDown: {type: Boolean},
        enableButton: {type: Boolean},
        headingStyle: {type: String},
    };

    constructor() {
        super();
        this.countingDown = false;
        this.enableButton = true;
        this.count = 0;
        this.headingStyle = 'normal';
        
        
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

    handleInput(event) {
        // Update inputValue property with the value of the text input
        this.count = event.target.value;
      }
     
      startCountdown() {
        if(!this.countingDown) {
            this.countingDown = true;
            this.enableButton = false;
        }
    }

    playAlarm() {
        const audio = new Audio('http://bruitages.free.fr/horloges/sonnette_reveil.wav'); // Replace 'alarm.mp3' with the path to your alarm sound file
        audio.play();
        this.headingStyle = 'flash-red';
    }
       

    render() {
        return html`
            <h3 class="${this.headingStyle}">Task Timer</h3>
            <p>      <input type="text" @input=${this.handleInput}></p>
            <button @click=${this.startCountdown} ?disabled=${!this.enableButton}>Start Countdown</button>
            <p>Time Left: ${Math.floor(this.count / 60)}:${this.count % 60}</p>
        `;
    }

}
customElements.define('task-timer-widget', TaskTimer);