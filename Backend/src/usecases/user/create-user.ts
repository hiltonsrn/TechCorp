import { User } from "../../domain/user/entity/user";
import { UserGateway } from "../../domain/user/gateway/usergateway";
import { Usecase } from "../usecase";

export type CreateUserInputDto = {
    name: string;
    email: string;
    age: number
};

export type CreateUserOutputDto = {
    id: string;
};

export class CreateUserUsecase
    implements Usecase<CreateUserInputDto, CreateUserOutputDto>
{
    private constructor(private readonly UserGateway: UserGateway) {}

    public static create(UserGateway: UserGateway) {
        return new CreateUserUsecase(UserGateway);
    }

    public async execute({
        name,
        email,
        age,
    }: CreateUserInputDto): Promise<CreateUserOutputDto> {
        const aUser = User.create(name, email,age);

        await this.UserGateway.save(aUser);

        const output = this.presentOutput(aUser);

        return output;
    }

    private presentOutput(User: User): CreateUserOutputDto {
        const output: CreateUserOutputDto = {
            id: User.id
        }

        return output;
    }
}