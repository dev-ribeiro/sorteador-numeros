var drawValues = [];

for (let num = 1; num <= 60; num++) {
    drawValues.push({ id: num, value: num, select: false })
}

const keys = {
    INITIALIZE_GAME: "INIT",
    DRAW_VALUES: "DRAW",
};

const tokens = {
    initializeGame: localStorage.getItem(keys.INITIALIZE_GAME),
    createdDrawValues: localStorage.getItem(keys.DRAW_VALUES),
};

const app = {

    initializeGame(moment) {
        localStorage.setItem(keys.INITIALIZE_GAME, JSON.stringify(moment));
    },

    setDrawPanel: async function () {
        localStorage.setItem(keys.DRAW_VALUES, JSON.stringify(drawValues))
    },

    draw: async () => {
        let index = await Math.floor(Math.random() * (60 - 0) + 1);
        let found = drawValues.find((value) => { return value.id == index && value.select == false });
        return found
    },

    // updateStateToSelected: async (element) => {
    //     let index = await app.draw();
    //     let found = drawValues.find((value) => value.id == index)

    // },

    controlValuesStates() {
        localStorage.setItem(keys.DRAW_VALUES, this.drawValues)
    },


};