const keys = {
    INITIALIZE_GAME: "INIT",
    DRAW_VALUES: "DRAW"
};

const tokens = {
    initializeGame: localStorage.getItem(keys.INITIALIZE_GAME),
    drawValues:localStorage.getItem(keys.DRAW_VALUES)
};

const app = {
    initializeGame(moment) {
        localStorage.setItem(keys.INITIALIZE_GAME, JSON.stringify(moment));
    },
    
    setDrawValues(values){
        localStorage.setItem(keys.DRAW_VALUES,JSON.stringify(values))
    }
}