import { User } from "../../domain/user/entity/user";
import { UserGateway } from "../../domain/user/gateway/usergateway";
import { ResponseDto } from "../../infra/api/dto/responsedto";
import { SaveUserDto } from "../../infra/api/dto/saveuserdto";
import { ImportUsecase } from "../usecase";
import { SaveUserUsecase } from "./save-user";


export class ImportUserUsecase
    implements ImportUsecase<SaveUserDto>
{
    private constructor(private readonly UserGateway: UserGateway, private readonly saveUserUsecase: SaveUserUsecase) {}

    public static create(UserGateway: UserGateway,SaveUserUsecase: SaveUserUsecase) {
        return new ImportUserUsecase(UserGateway,SaveUserUsecase);
    }

    public async execute(users: SaveUserDto[]) : Promise<ResponseDto> {
        let output:ResponseDto = {
            erro:[],
            success:[]
        };
        let qtdImported = 0;
        for(let u of users){
            try{        
                await this.saveUserUsecase.execute(u);
                qtdImported++;
            }catch(e){
                await output.erro.push("Erro ao tentar importar o usuário " + u.name + ": " + e);
            }            
        }
        if(qtdImported > 0){
            await output.success.push(qtdImported + (qtdImported > 1 ? " usuários importados" : " usuário importado"));
        }
        return output;
    }
}