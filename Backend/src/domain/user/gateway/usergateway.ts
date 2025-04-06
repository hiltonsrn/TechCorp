import { User } from "../entity/user";

export interface UserGateway {
    create(User: User): Promise<void>;
    update(User: User): Promise<void>;
    list(): Promise<User[]>;
    getByEmail(email: string): Promise<User>;
}