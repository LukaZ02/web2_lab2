"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketRoutes = void 0;
const ticketController_1 = require("../controllers/ticketController");
const ticketRoutes = (app) => {
    //GET methods
    app.get('/', (req, res) => {
        res.render('home', { title: 'Home' });
    });
    app.get('/sqlinjection', (req, res) => {
        res.render('sqlinjection', { title: 'SQL Injection', tickets: null });
    });
    //POST methods
    app.post('/sqlinjection', ticketController_1.TicketController.getInfo);
};
exports.ticketRoutes = ticketRoutes;
