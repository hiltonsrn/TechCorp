import { User } from "../../domain/user/entity/user";
import { UserGateway } from "../../domain/user/gateway/usergateway";
import { SaveUserDto } from "../../infra/api/dto/saveuserdto";
import { SaveUsecase } from "../usecase";


export class SaveUserUsecase
    implements SaveUsecase<SaveUserDto>
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
    }: SaveUserDto): Promise<SaveUserDto> {
        const aUser = User.create(id,name, email,age);
        if(id != null){        
            const existEmailUser = await this.UserGateway.getByEmail(email);
            if(existEmailUser){
                if(existEmailUser.id != id){
                    throw new Error("E-mail já cadastrado");                       
                }                
            }
            await this.UserGateway.update(aUser); 
        }
        else{        
            await this.UserGateway.create(aUser);            
        }
        const output = this.presentOutput(aUser);
        return output;
    }

    private presentOutput(User: User): SaveUserDto {
        const output: SaveUserDto = {
            id: User.id,
            name:User.name,
            email:User.email,
            age:User.age
        }

        return output;
    }
}