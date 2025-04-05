import { User } from "../../domain/user/entity/user";
import { UserGateway } from "../../domain/user/gateway/usergateway";
import { Usecase } from "../usecase";

export type ListUserInputDto = void;

export type ListUserOutputDto = {
    Users: {
        id: string;
        name: string;
        email: string;
        age: number;
    }[];
};

export class ListUserUsecase
    implements Usecase<ListUserInputDto, ListUserOutputDto>
{
    private constructor(private readonly UserGateway: UserGateway) {}

    public static create(UserGateway: UserGateway) {
        return new ListUserUsecase(UserGateway);
    }

    public async execute(): Promise<ListUserOutputDto> {
        const aUsers = await this.UserGateway.list();

        const output = this.presentOutput(aUsers);

        return output;
    }

    private presentOutput(Users: User[]): ListUserOutputDto {
        return {
            Users: Users.map((p) => {
                return {
                    id: p.id,
                    name: p.name,
                    email: p.email,
                    age: p.age,
                };
            }),
        };
    }
}