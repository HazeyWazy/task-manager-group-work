import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

/*
#C6C7BC
#C0B3AB
#A1989F
#545B6D
#181B29

*/



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

`