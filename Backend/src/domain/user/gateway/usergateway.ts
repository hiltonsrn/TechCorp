import { User } from "../entity/user";

export interface UserGateway {
    save(User: User): Promise<void>;
    list(): Promise<User[]>;
}