"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const ticketController_1 = require("../controllers/ticketController");
const userController_1 = require("../controllers/userController");
const routes = (app) => {
    //GET methods
    app.get('/', (req, res) => {
        res.render('home', { title: 'Home' });
    });
    app.get('/sqlinjection', (req, res) => {
        res.render('sqlinjection', { title: 'SQL Injection', tickets: null });
    });
    app.get('/brokenauth', (req, res) => {
        userController_1.UserController.resetAdmin();
        res.render('brokenauth', { title: 'Broken Authentication', user: null, attempt: null, lockout: null });
    });
    //POST methods
    app.post('/sqlinjection', ticketController_1.TicketController.getInfo);
    app.post('/brokenauth', userController_1.UserController.login);
};
exports.routes = routes;
