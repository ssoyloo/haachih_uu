const template = document.createElement("template");
    template.innerHTML = `
    <link rel="stylesheet" href="/let'sGo.css" />
        <style>
        .description {
            padding-left:1rem;
        }
        </style>

         <p><input type="checkbox" />
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