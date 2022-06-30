const keys = {
    INITIALIZE_GAME: "INIT",
    DRAW_VALUES: "DRAW"
};

const tokens = {
    initializeGame: localStorage.getItem(keys.INITIALIZE_GAME),
    createdDrawValues: localStorage.getItem(keys.DRAW_VALUES)
};

const app = {

    drawValues: [],

    initializeGame(moment) {
        localStorage.setItem(keys.INITIALIZE_GAME, JSON.stringify(moment));
    },

    createDrawPanel() {
        for (let num = 1; num <= 60; num++) {
            this.drawValues.push({ id: num, value: num, select: false })
        }
        return this.drawValues
    },

    setDrawPanel: async function () {
        await this.createDrawPanel();
        localStorage.setItem(keys.DRAW_VALUES, JSON.stringify(this.drawValues))
    },

    draw() {
        let index = Math.floor(Math.random() * (60 - 1) + 1);
        let test = this.drawValues[index]
        console.log(test)
    },

    controlValuesStates() {
        localStorage.setItem(keys.DRAW_VALUES, this.drawValues)
    },
}