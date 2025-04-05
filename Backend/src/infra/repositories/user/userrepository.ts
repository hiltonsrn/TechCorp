import { PrismaClient } from "@prisma/client";
import { User } from "../../../domain/user/entity/user";
import { UserGateway } from "../../../domain/user/gateway/usergateway";

export class UserRepositoryPrisma implements UserGateway {
    private constructor(private readonly prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient) {
        return new UserRepositoryPrisma(prismaClient);
    }

    public async save(User: User): Promise<void> {
        const data = {
            id: User.id,
            name: User.name,
            email: User.email,
            age: User.age,
        };

        await this.prismaClient.User.create({
            data,
        });
    }

    public async list(): Promise<User[]> {
        const Users = await this.prismaClient.User.findMany();

        const UserList = Users.map((p) => {
            const User = User.with({
                id: p.id,
                name: p.name,
                email: p.email,
                age: p.age,
            });

            return User;
        });

        return UserList;
    }
}