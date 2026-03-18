import { Router } from "express";
import * as appsController from "../controllers/appsController";
import { validateUrl, validateId } from "../middleware/validation";

const router = Router();

router.get("/", appsController.list);
router.post("/", validateUrl, appsController.create);
router.get("/:id", validateId, appsController.getById);
router.put("/:id", validateId, validateUrl, appsController.update);
router.delete("/:id", validateId, appsController.remove);

export default router;
