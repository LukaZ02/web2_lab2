import {Repository} from "typeorm";
import {AppDataSource} from "../data-source";
import {User} from "../entities/user";


export class UserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    async addUser(username: string, password: string): Promise<User> {
        const user = new User(username, password);
        return await this.repository.save(user);
    }

    async removeUser(username: string): Promise<void> {
        await this.repository.delete({username: username});
    }

    async getUser(username: string, password: string): Promise<User | null> {
        try {
            return await this.repository.findOne({
                where: {
                    username: username,
                    password: password
                }
            });
        } catch (error) {
            return null;
        }
    }
}