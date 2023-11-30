import { Router } from "express";
import cardController from "./controller/card-controller";

const router = Router();

router.post("/card/:creatorId", cardController.createCard);
router.post("/card-update/:cardId", cardController.updateCard);
router.get("/card/:cardId", cardController.getCard);
router.get("/cards/:userId", cardController.fetchUserCards);

export default router;