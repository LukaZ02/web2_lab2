"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketController = void 0;
const ticketRepository_1 = require("../repositories/ticketRepository");
const ticket_1 = require("../entities/ticket");
class TicketController {
    static getInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { oib, agreeTerms } = req.body;
                if (agreeTerms) {
                    const sanitizedOib = TicketController.sanitizeInput(oib);
                    const tickets = yield TicketController.ticketRepository.getTicketInfo(sanitizedOib);
                    res.render('sqlinjection', { title: 'SQL Injection', tickets: tickets });
                }
                else {
                    const tickets = yield TicketController.ticketRepository.getTicketInfo(oib);
                    res.render('sqlinjection', { title: 'SQL Injection', tickets: tickets });
                }
            }
            catch (error) {
                res.status(500).send;
            }
        });
    }
    static sanitizeInput(input) {
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
    static addTicket(oib, firstname, lastname) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticket = new ticket_1.Ticket(oib, firstname, lastname);
            yield TicketController.ticketRepository.addTicket(ticket);
        });
    }
}
exports.TicketController = TicketController;
TicketController.ticketRepository = new ticketRepository_1.TicketRepository();
