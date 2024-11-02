import { TicketRepository } from "../repositories/ticketRepository";
import { Request, Response } from "express";
import { Ticket } from "../entities/ticket";


export class TicketController {
    private static ticketRepository = new TicketRepository();

    public static async getInfo(req : Request, res : Response) {
        const { oib } = req.body;
        const tickets : Ticket[] = await TicketController.ticketRepository.getticketinfo(oib);
        res.render('sqlinjection', { title: 'SQL Injection', tickets: tickets });
    }
}
