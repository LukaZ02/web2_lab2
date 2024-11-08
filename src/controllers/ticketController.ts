import { TicketRepository } from "../repositories/ticketRepository";
import { Request, Response } from "express";
import { Ticket } from "../entities/ticket";

export class TicketController {
    private static ticketRepository = new TicketRepository();

    public static async getInfo(req : Request, res : Response) {
        try {
            //insert records for demo
            await TicketController.addTicket('12345678901', 'John', 'Doe');
            await TicketController.addTicket('12345678902', 'Jane', 'Smith');
            await TicketController.addTicket('12345678903', 'Johan', 'Frank');
            const { oib, agreeTerms } = req.body;
            if (agreeTerms) {
                const sanitizedOib = TicketController.sanitizeInput(oib);
                const tickets : Ticket[] = await TicketController.ticketRepository.getTicketInfo(sanitizedOib);
                res.render('sqlinjection', { title: 'SQL Injection', tickets: tickets });
            } else {
                const tickets : Ticket[] = await TicketController.ticketRepository.getTicketInfo(oib);
                res.render('sqlinjection', { title: 'SQL Injection', tickets: tickets });
            }
        } catch (error) {
            res.status(500).send;
        }
    }

    private static sanitizeInput(input: string): string {
        let lowercasedInput = input.toLowerCase();
        const disallowedPatterns = [
            /\bunion\b/,
            /\bselect\b/,
            /\binsert\b/,
            /\bdelete\b/,
            /\bupdate\b/,
            /\bdrop\b/,
            /\b--\b/,
            /;/,
            /' or '/i,
            /1=1/,
            /'=\s*'/
        ];
        for (const pattern of disallowedPatterns) {
            lowercasedInput = lowercasedInput.replace(pattern, '');
        }
        return lowercasedInput.trim();
    }

    public static async addTicket(oib: string, firstname: string, lastname: string) {
        const ticket = new Ticket(oib, firstname, lastname);
        await TicketController.ticketRepository.addTicket(ticket);
    }

}
