class searchPlace extends HTMLElement {
    constructor(){
            super();
    }
    connectedCallback() {
        this.parentNode.innerHTML = `
        <div class="Lsearch">
        <select aria-label="huniiToo" id="huniiToo">
                <option value="">Хүний тоо</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10+</option>
                <option value="20">20+</option>
                <option value="30">30+</option>
                <option value="40">40+</option>
                <option value="50">50+</option>
            </select>
            <select aria-label="oirhonGazar" id="oirhonGazar">
                <option value="">Ойрхон газар</option>
                <option value="Address 1">Address 1</option>
                <option value="Address 2">Address 2</option>
                <option value="Address 3">Address 3</option>
                <option value="Address 4">Address 4</option>
                <option value="Address 5">Address 5</option>
                <option value="Address 6">Address 6</option>
                <option value="Address 7">Address 7</option>
            </select>
            <select aria-label="type" id="type">
                <option value="">Төрөл</option>
                <option value="HoolniiGazar">Хоолны газрууд</option>
                <option value="Cafe">Кафе</option>
                <option value="PubLounge">Паб, лоунж</option>
                <option value="Camp">Зуслан</option>
                <option value="Karaoke">Караоке</option>
                <option value="Museum">Музей</option>
                <option value="Cinema">Кино театр</option>
                <option value="Club">Клаб</option>
                <option value="Garden">Хүрээлэн</option>
                <option value="Enjoy">Хөгжилдөх газар</option>
            </select>
            <button type="button" onclick="getValueForFilter()">LET'S GO</button>
            </div>
            `;
}
}
customElements.define("search-place", searchPlace);