import { User } from "../../domain/user/entity/user";
import { UserGateway } from "../../domain/user/gateway/usergateway";
import { ResultUserDto } from "../../infra/api/dto/resultuserdto";
import { ListUsecase } from "../usecase";


export class ListUserUsecase
    implements ListUsecase<ResultUserDto>
{
    private constructor(private readonly UserGateway: UserGateway) {}

    public static create(UserGateway: UserGateway) {
        return new ListUserUsecase(UserGateway);
    }

    public async execute(): Promise<ResultUserDto[]> {
        const aUsers = await this.UserGateway.list();

        const output = this.presentOutput(aUsers);

        return output;
    }

    private presentOutput(Users: User[]): ResultUserDto[] {
        return  Users.map((p) => {
                return {
                    id: p.id,
                    name: p.name,
                    email: p.email,
                    age: p.age,
                };
            });
    }
}