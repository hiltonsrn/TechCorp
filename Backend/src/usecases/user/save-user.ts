import { User } from "../../domain/user/entity/user";
import { UserGateway } from "../../domain/user/gateway/usergateway";
import { Usecase } from "../usecase";

export type SaveUserInputDto = {
    id: string;
    name: string;
    email: string;
    age: number
};

export type SaveUserOutputDto = {
    id: string;
};

export class SaveUserUsecase
    implements Usecase<SaveUserInputDto, SaveUserOutputDto>
{
    private constructor(private readonly UserGateway: UserGateway) {}

    public static create(UserGateway: UserGateway) {
        return new SaveUserUsecase(UserGateway);
    }

    public async execute({
        id,
        name,
        email,
        age,
    }: SaveUserInputDto): Promise<SaveUserOutputDto> {
        const aUser = User.create(name, email,age);
        const existUser = await this.UserGateway.getByEmail(email);
        if(existUser && existUser.id != id){
            throw new Error("E-mail já cadastrado");
            await this.UserGateway.update(aUser);            
        }
        else{        
            await this.UserGateway.create(aUser);            
        }
        const output = this.presentOutput(aUser);
        return output;
    }

    private presentOutput(User: User): SaveUserOutputDto {
        const output: SaveUserOutputDto = {
            id: User.id
        }

        return output;
    }
}