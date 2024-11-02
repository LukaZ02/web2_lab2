import * as express from "express";
import { TicketController } from "../controllers/ticketController";

export const ticketRoutes = (app: express.Application) => {

    //GET methods
    app.get('/', (req, res) => {
        res.render('home', { title: 'Home' });
    });
    app.get('/sqlinjection', (req, res) => {
        res.render('sqlinjection', { title: 'SQL Injection', tickets: null });
    });

    //POST methods
    app.post('/sqlinjection', TicketController.getInfo);

}