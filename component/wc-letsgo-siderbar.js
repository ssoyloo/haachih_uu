const template = document.createElement("template");
    template.innerHTML = `
    <link rel="stylesheet" href="/let'sGo.css" />
        <style>
        p {
            display: grid;
            grid-template-columns: auto 1fr auto;
            align-items: center;
        }

        .description {
            justify-self: end; 
            padding-left: 2rem;
        }
       
        </style>

        <p>
        <input type="checkbox" value="freewifi" aria-label="freewifi" />
        <slot></slot>
         <span class="description">
         <slot name="description"></slot>    
         </span>
        </p>
    `;

    class TodoItem extends HTMLElement {
        constructor() {
            super();
            const shadow = this.attachShadow({ mode: "open" });
            shadow.appendChild(template.content.cloneNode(true));
        }
    }

    customElements.define("todo-item", TodoItem);