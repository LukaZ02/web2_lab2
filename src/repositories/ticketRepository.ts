import { Repository } from "typeorm";
import { Ticket } from "../entities/ticket";
import { AppDataSource } from "../data-source";

export class TicketRepository {
    private repository: Repository<Ticket>;

    constructor() {
        this.repository = AppDataSource.getRepository(Ticket);
    }

    async addTicket(ticket: Ticket): Promise<Ticket> {
        if (!await this.repository.findOneBy(ticket)) {
            return await this.repository.save(ticket);
        }
        return ticket;
    }

    async getTicketInfo(oib: string): Promise<Ticket[]> {
        const query: string = "SELECT * FROM ticket WHERE oib = '" + oib + "'";  // ' OR '1'='1
        try {
            return await this.repository.query(query);
        } catch (error) {
            return [];
        }
    }

}