import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

export const widgetDesign = css `
:host {
    display: block;
    width: 250px;
    background-color: #dae0ef;
    border: 1px solid #3E4351;
    font-family: monospace;
}

h3 {
    color: #181B29
}

div {
    padding-left: 20px;
    text-align: left;
    color: #3E4351;
    line-height: 0.8;
   
}


.flash-red {
    animation: blinker 1.5s 3;
  }
  
  @keyframes blinker {
    from {
      background-color: inherit; /* Use the widget's original background color */
    }
    to {
      background-color: red; /* Flash the background color to red */
    }
  }

`