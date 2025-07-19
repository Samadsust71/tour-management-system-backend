import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { divisionRoutes } from "../modules/division/division.route";

export const router = Router();

const modulesRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/division",
    route: divisionRoutes,
  },
];

modulesRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
