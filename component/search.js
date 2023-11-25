class searchPlace extends HTMLElement {
    constructor(){
            super();
    }
    connectedCallback() {
        this.parentNode.innerHTML = `
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
                <option value="HanUul">Хан-Уул дүүрэг</option>
                <option value="SonginoHairhan">Сонгино хайрхан дүүрэг</option>
                <option value="Baynzurh">Баянзүрх дүүрэг</option>
                <option value="Chingeltei">Чингэлтэй дүүрэг</option>
                <option value="Sukhbaatar">Сүхбаатар дүүрэг</option>
                <option value="Nalaih">Налайх дүүрэг</option>
                <option value="Bayngol">Баянгол дүүрэг</option>
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
            `;
}
}
customElements.define("search-place", searchPlace);