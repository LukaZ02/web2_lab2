import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity('user')
export class User {
    @PrimaryColumn({ type: "text" })
    username: string;

    @Column({ type: "text" })
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}