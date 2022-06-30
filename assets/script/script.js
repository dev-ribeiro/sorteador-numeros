const draw_panel = document.getElementById("draw_panel");
const drawValues = [];

onload = () => {
    interface.checkInitializeToken()
    interface.checkDrawValuesToken()
}

const interface = {

    checkInitializeToken() {
        if (!tokens.initializeGame) { this.createModal() }
    },

    checkDrawValuesToken() {
        if (!tokens.drawValues) { this.createContentDrawPanel() }
    },

    createContentDrawPanel() {
        let values;
        if (tokens.drawValues) {
            values = JSON.parse(tokens.drawValues);
            for (let i = 0;i < values.length;i++) {
                draw_panel.appendChild(`<div id="${values.id}" class="${values.selected == false ? "notSelected" : "selected"}">${values.num}</div>`)
            }
        }
    },

    createDrawPanel() {
        for (let num = 1; num <= 60; num++) {
            drawValues.push({ num: num, id: "pick" + num, selected: false });
        }
        app.setDrawValues(drawValues);
    },

    createModal() {
        let body = document.getElementsByTagName("body")[0];
        let modal = document.createElement("div");
        let button = document.createElement("button")
        modal.className = "modal"
        button.innerHTML = "Iniciar";
        modal.appendChild(button);
        body.appendChild(modal)
        this.hideModal(button, modal)
    },

    hideModal(btn, element) {
        btn.addEventListener("click", () => {
            element.className = "hideModal"
        });
        let moment = new Date;
        app.initializeGame(moment.getTime().toString())
        this.checkDrawValuesToken()
    }

};