import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";

export const router = Router()

const modulesRoutes = [
    {
    path:"/user",
    route: userRoutes
},
    {
    path:"/auth",
    route: authRoutes
},
]

modulesRoutes.forEach(route => {
    router.use(route.path, route.route)
})