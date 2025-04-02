import { Router } from "express";
import {
    createNewGame,
    joinRandomGame,
    goToActiveGame,
    getLastGame,
} from "../controllers/game.controller.js";

const router = Router();

router.route("/ongoing/:gameId").get(goToActiveGame);
router.route("/create").get(createNewGame);
router.route("/joinRandom").get(joinRandomGame);
router.route("/lastGame").get(getLastGame);

export default router;
