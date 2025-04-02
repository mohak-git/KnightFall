import { Chess } from "chess.js";

class MyChess extends Chess {
    constructor() {
        super();
    }

    validateMove(move) {
        try {
            const resMove = this.move(move);
            return resMove;
        } catch (error) {
            return false;
        }
    }
}

export default MyChess;
