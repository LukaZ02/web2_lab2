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
exports.TicketRepository = void 0;
const ticket_1 = require("../entities/ticket");
const data_source_1 = require("../data-source");
class TicketRepository {
    constructor() {
        this.repository = data_source_1.AppDataSource.getRepository(ticket_1.Ticket);
    }
    // Custom query using raw SQL
    getticketinfo(oib) {
        return __awaiter(this, void 0, void 0, function* () {
            console.debug(oib);
            const query = `SELECT * FROM ticket WHERE oib = '${oib}'`;
            console.debug(query);
            return yield this.repository.query("SELECT * FROM ticket WHERE oib = $1", [oib]);
        });
    }
}
exports.TicketRepository = TicketRepository;
