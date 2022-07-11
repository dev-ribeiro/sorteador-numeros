const drawPanel = document.getElementById("drawPanel");
const handleResults = document.getElementById("handleResults");
const raffle = document.getElementById("raffle");
const acessDrawValues = JSON.parse(tokens.createdDrawValues);

onload = () => {
    checkToken.checkInitializeToken();
    raffle.addEventListener("click", interface.updateStateToSelected)
};

const interface = {

    handleGameOver(){
        app.setGameOver()
        if(gameOver = true){
            interface.clearDrawPanel();
            checkToken.checkInitializeToken();
        }
    },

    clearDrawPanel(){
        drawPanel.innerHTML = ''
    },

    updateStateToSelected: async () => {
        let selected = await app.draw();
        if (selected) {
            selected.select = true;
            app.setDrawPanel();
            interface.updateContentDrawPanel(selected.id);
        } else {
            interface.handleGameOver();
        }


    },

    handleInitialDrawPanel: async () => {
        await app.setDrawPanel();
        try {
            interface.createContentDrawPanel(drawValues)
        } catch (error) {
            console.log(error)
        }
    },

    loadPreviusState() {
        this.createContentDrawPanel(acessDrawValues);
    },

    updateContentDrawPanel(selected) {
        let select = document.querySelector(`.class${selected}`);
        select.className = "select_true";
    },

    createContentDrawPanel(values) {
        values.forEach(element => {
            let div = document.createElement("div");
            if (element.select == false) {
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
        let controller = document.createElement("div");
        let button = document.createElement("button");
        let label = document.createElement("label");
        let input = document.createElement("input");
        modal.className = "modal";
        input.setAttribute("id","defineContent");
        input.setAttribute("type","number")
        controller.className = "controller";
        label.innerHTML = "Defina a quantidade de números que deseja incluir no sorteio:";
        button.innerHTML = "Iniciar";
        controller.appendChild(label);
        controller.appendChild(input);
        modal.appendChild(controller);
        modal.appendChild(button);
        body.appendChild(modal)
        this.hideModal(button, modal, input)
    },

    hideModal(btn, element, content) {
        btn.addEventListener("click", () => {
            element.className = "hideModal";
            app.createArray(content.value);
            let moment = new Date;
            app.initializeGame(moment.getTime().toString());
            checkToken.checkDrawValuesToken()
        });
    }

};

const checkToken = {

    checkInitializeToken() {
        if (!tokens.initializeGame) {
            interface.createModal();
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