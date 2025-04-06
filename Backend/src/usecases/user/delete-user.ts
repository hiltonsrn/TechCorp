import { User } from "../../domain/user/entity/user";
import { UserGateway } from "../../domain/user/gateway/usergateway";
import { DeleteUserDto } from "../../infra/api/dto/deleteuserdto";
import { DeleteUsecase } from "../usecase";

export class DeleteUserUsecase
    implements DeleteUsecase
{
    private constructor(private readonly UserGateway: UserGateway) {}

    public static create(UserGateway: UserGateway) {
        return new DeleteUserUsecase(UserGateway);
    }

    public async execute(id:string) {
        const existUser = await this.UserGateway.getById(id);
        if(!existUser){
            throw new Error("Usuário não encontrado");
        }
        await this.UserGateway.delete(id);
        const output = this.presentOutput(existUser);
        return output;
    }

    private presentOutput(User: User): DeleteUserDto {
        const output: DeleteUserDto = {
            id: User.id,
            name:User.name,
            email:User.email,
            age:User.age
        }

        return output;
    }
}