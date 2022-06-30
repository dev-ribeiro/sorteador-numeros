const drawPanel = document.getElementById("drawPanel");
const handleResults = document.getElementById("handleResults");
const raffle = document.getElementById("raffle");
const drawValues = [];

onload = () => {
    checkToken.checkInitializeToken();
};

const interface = {

    async handleInitialDrawPanel() {
        await app.setDrawPanel();
        this.createContentDrawPanel(app.drawValues);
    },

    loadPreviusState(){
        this.createContentDrawPanel(JSON.parse(tokens.createdDrawValues));
        this.handleStates()
    },

    handleStates(){
        raffle.addEventListener("click",console.log("1"))
    },

    createContentDrawPanel(values) {
        values.forEach(element => {
            let div = document.createElement("div");
            div.className = element.id;
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
            interface.loadPreviusState()
        }
    },

    checkDrawValuesToken() {
        if (!tokens.createdDrawValues) { interface.handleInitialDrawPanel() } else { console.log("Sem o token de criação dos valores") }
    }
};