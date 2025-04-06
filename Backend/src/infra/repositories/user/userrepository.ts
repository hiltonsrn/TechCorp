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

        await this.prismaClient.user.create({
            data,
        });
    }

    public async list(): Promise<User[]> {
        const Users = await this.prismaClient.user.findMany();

        const UserList = Users.map((p: any) => {
            const u = User.with({
                id: p.id,
                name: p.name,
                email: p.email,
                age: p.age,
            });

            return u;
        });

        return UserList;
    }
}