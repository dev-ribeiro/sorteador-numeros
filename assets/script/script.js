const drawPanel = document.getElementById("drawPanel");
const handleResults = document.getElementById("handleResults");
const raffle = document.getElementById("raffle");

onload = () => {
    checkToken.checkInitializeToken();
    raffle.addEventListener("click", interface.selectRandomValue)
};

const interface = {

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
        this.createContentDrawPanel(JSON.parse(tokens.createdDrawValues));
    },

    selectRandomValue: ()=> {
        app.draw()
    },

    createContentDrawPanel(values) {
        values.forEach(element => {
            let div = document.createElement("div");
            div.className = `${element.id} select_${element.select}`;
            div.innerHTML = element.value;
            div.addEventListener("click", (event) => { this.changeStateToSelected(div) })
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