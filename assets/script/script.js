const drawPanel = document.getElementById("drawPanel");
const handleResults = document.getElementById("handleResults");
const raffle = document.getElementById("raffle");
const acessDrawValues = JSON.parse(tokens.createdDrawValues);

onload = () => {
    checkToken.checkInitializeToken();
    raffle.addEventListener("click", interface.updateStateToSelected)
};

const interface = {

    updateStateToSelected: async () => {
        let selected = await app.draw();
        selected.select = true;
        app.setDrawPanel();
        interface.updateContentDrawPanel(selected.id)
    },

    handleInitialDrawPanel: async () => {
        await app.setDrawPanel();
        try {
            let content = JSON.parse(localStorage.getItem(keys.DRAW_VALUES));
            interface.createContentDrawPanel(content)
        } catch (error) {
            console.log(error)
        }
    },

    loadPreviusState() {
        this.createContentDrawPanel(acessDrawValues);
    },

    selectRandomValue: () => {
        app.draw()
    },

    updateContentDrawPanel(selected){
        let select = document.querySelector(`.class${selected}`);
        select.className = "select_true";
    },

    createContentDrawPanel(values) {
        values.forEach(element => {
            let div = document.createElement("div");
            if(element.select == false) {
                div.className = `class${element.id} select_false`
            } else {
                div.className = `class${element.id} select_true`
            }
            div.innerHTML = element.value;
            drawPanel.appendChild(div);
        });
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
            element.className = "hideModal";
            let moment = new Date;
            app.initializeGame(moment.getTime().toString());
            checkToken.checkDrawValuesToken()
        });
    }

};

const checkToken = {

    checkInitializeToken() {
        if (!tokens.initializeGame) {
            interface.createModal()
        } else {
            drawValues = acessDrawValues;
            interface.loadPreviusState()
        }
    },

    checkDrawValuesToken() {
        if (!tokens.createdDrawValues) {
            interface.handleInitialDrawPanel()
        } else {
            console.log("Sem o token de criação dos valores")
        }
    }
};