import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interface";
import { divisionController } from "./division.controller";
import {
    createDivisionSchema,
    updateDivisionSchema,
} from "./division.validation";
import { multerUpload } from "../../config/multer.config";

const router = Router()

router.post(
    "/create",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    multerUpload.single("file"),
    validateRequest(createDivisionSchema),
    divisionController.createDivision
);
router.get("/", divisionController.getAllDivisions);
router.get("/:slug", divisionController.getSingleDivision)
router.patch(
    "/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(updateDivisionSchema),
    divisionController.updateDivision
);
router.delete("/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), divisionController.deleteDivision);

export const divisionRoutes = router