var drawValues = [];
var gameOver = false;

for (let num = 1; num <= 10; num++) {
    if (num < 10) {
        drawValues.push({ id: num, value: "0" + num, select: false })
    } else {
        drawValues.push({ id: num, value: num, select: false })
    }

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

    createArray: () => {
        for (let num = 1; num <= 10; num++) {
            if (num < 10) {
                drawValues.push({ id: num, value: "0" + num, select: false })
            } else {
                drawValues.push({ id: num, value: num, select: false })
            }
        }
    },

    initializeGame(moment) {
        localStorage.setItem(keys.INITIALIZE_GAME, JSON.stringify(moment));
    },

    createArrayValues() {
        for (let num = 1; num <= 10; num++) {
            if (num < 10) {
                drawValues.push({ id: num, value: "0" + num, select: false })
            } else {
                drawValues.push({ id: num, value: num, select: false })
            }

        }
    },

    setDrawPanel: async function () {
        localStorage.setItem(keys.DRAW_VALUES, JSON.stringify(drawValues))
    },

    validateDrawValue: async () => {
        let validate = drawValues.filter(value => { return value.select == false });
        let index = await Math.floor(Math.random() * validate.length);
        return validate[index]
    },

    draw: async () => {
        let validate = await app.validateDrawValue()
        let result = drawValues.find(element => element == validate);
        return result
    },

    gameOver: false,

    setGameOver: async () => {
        await localStorage.clear();
        drawValues = [];
        gameOver = true;
    }

};