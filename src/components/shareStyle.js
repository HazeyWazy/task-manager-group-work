import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';


export const taskPanels = css`
:host {
    display: block;
    background-color: #A1989F;
    color: #ffcc33;
    border: 1px solid black;
    padding: 10px;
    margin: 10px;
    width: 250px;
    height: 80dvh;
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
`;


export const font = css`

`
