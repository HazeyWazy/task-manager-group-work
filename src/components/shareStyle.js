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
