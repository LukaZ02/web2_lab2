import { Repository } from "typeorm";
import { Ticket } from "../entities/ticket";
import { AppDataSource } from "../data-source";

export class TicketRepository {
    private repository: Repository<Ticket>;

    constructor() {
        this.repository = AppDataSource.getRepository(Ticket);
    }

    async getticketinfo(oib: string): Promise<Ticket[]> {
        const query: string = "SELECT * FROM ticket WHERE oib = '" + oib + "'";  // ' OR '1'='1
        return await this.repository.query(query);
    }

}