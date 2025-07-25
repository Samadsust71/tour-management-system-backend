import express from "express";

import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import { createTourTypeZodSchema, createTourZodSchema, updateTourTypeZodSchema, updateTourZodSchema } from "./tour.validation";
import { tourController } from "./tour.controller";
import { multerUpload } from "../../config/multer.config";


const router = express.Router();

/* ------------------ TOUR TYPE ROUTES -------------------- */
router.get("/tour-types", tourController.getAllTourTypes);

router.post(
    "/create-tour-type",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(createTourTypeZodSchema),
    tourController.createTourType
);

router.patch(
    "/tour-types/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(updateTourTypeZodSchema),
    tourController.updateTourType
);

router.delete("/tour-types/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), tourController.deleteTourType);

/* --------------------- TOUR ROUTES ---------------------- */
router.get("/", tourController.getAllTours);

router.post(
    "/create",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
     multerUpload.array("files"),
    validateRequest(createTourZodSchema),
    tourController.createTour
);

router.patch(
    "/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(updateTourZodSchema),
    tourController.updateTour
);

router.delete("/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), tourController.deleteTour);




export const tourRoutes = router