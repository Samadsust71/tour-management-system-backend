"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_routes_1 = require("../modules/user/user.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const division_route_1 = require("../modules/division/division.route");
const tour_route_1 = require("../modules/tour/tour.route");
const booking_route_1 = require("../modules/booking/booking.route");
const payment_route_1 = require("../modules/payment/payment.route");
const otp_route_1 = require("../modules/otp/otp.route");
const stats_route_1 = require("../modules/stats/stats.route");
exports.router = (0, express_1.Router)();
const modulesRoutes = [
    {
        path: "/user",
        route: user_routes_1.userRoutes,
    },
    {
        path: "/auth",
        route: auth_routes_1.authRoutes,
    },
    {
        path: "/division",
        route: division_route_1.divisionRoutes,
    },
    {
        path: "/tour",
        route: tour_route_1.tourRoutes,
    },
    {
        path: "/booking",
        route: booking_route_1.bookingRoutes,
    },
    {
        path: "/payment",
        route: payment_route_1.paymentRoutes,
    },
    {
        path: "/otp",
        route: otp_route_1.otpRoutes,
    },
    {
        path: "/stats",
        route: stats_route_1.statsRoutes
    }
];
modulesRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
