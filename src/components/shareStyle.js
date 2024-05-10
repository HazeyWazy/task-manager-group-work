import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

/*
#C6C7BC
#C0B3AB
#A1989F
#545B6D
#181B29

*/

export const taskPanels = css`
    :host {
        display: block;
        background-color: #545B6D;
        color: #ffcc33;
        border-radius: 50px 50px;
        padding: 10px;
        margin: 10px;
        width: 250px;
    }
    
    :host input {
        width: 5em;
    }
    .task-actions {
    display: block;

    }
    .task-actions li {
    display: inline-block;
    }

    h3 {
        color: #181B29
    }
`;


export const font = css`

`

export const taskCard = css `
:host {
    display: block;
    background-color: #A1989F;
    color: #181B29;
    border-radius: 50px 50px;
}
:host input {
    width: 5em;
}
h2 {
    padding-top:10px;
    font-size: large;
    font-variant: small-caps;
    border-radius: 50px 50px;
}

edit-task {
    
}
`
export const widgetDesign = css `
:host {
    display: block;
    width: 250px;
    height: 250px;
    background-color: #dae0ef;
    border: 1px solid #545B6D;
    font-family: monospace;
}

h3 {
    color: #181B29
}

div {
    padding-left: 20px;
    text-align: left;
    color: #545B6D;
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