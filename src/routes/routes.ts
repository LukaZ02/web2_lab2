import * as express from "express";
import { TicketController } from "../controllers/ticketController";
import {UserController} from "../controllers/userController";

export const routes = (app: express.Application) => {

    //GET methods
    app.get('/', (req, res) => {
        res.render('home', { title: 'Home' });
    });
    app.get('/sqlinjection', (req, res) => {
        res.render('sqlinjection', { title: 'SQL Injection', tickets: null });
    });
    app.get('/brokenauth', (req, res) => {
        UserController.resetAdmin();
        res.render('brokenauth', { title: 'Broken Authentication', user: null, attempt: null, lockout: null });
    });

    //POST methods
    app.post('/sqlinjection', TicketController.getInfo);
    app.post('/brokenauth', UserController.login);

}