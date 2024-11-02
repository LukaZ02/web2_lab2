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
class TicketController {
    static getInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { oib } = req.body;
            console.debug(oib);
            const tickets = yield TicketController.ticketRepository.getticketinfo(oib);
            res.render('sqlinjection', { title: 'SQL Injection', tickets: tickets });
        });
    }
}
exports.TicketController = TicketController;
TicketController.ticketRepository = new ticketRepository_1.TicketRepository();
