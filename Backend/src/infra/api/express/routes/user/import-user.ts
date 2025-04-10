import { Request, Response } from "express";
import {
    ImportUserUsecase
} from "../../../../../usecases/user/import-user";
import { HttpMethod, Route } from "../route";
import { ResponseDto } from "../../../dto/responsedto";
import { SaveUserDto } from "../../../dto/saveuserdto";


export class ImportUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly ImportUserService: ImportUserUsecase
    ) {}

    public static create(ImportUserService: ImportUserUsecase) {
        return new ImportUserRoute(
            "/Import",
            HttpMethod.POST,
            ImportUserService
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const data = request.body;
            let users: SaveUserDto[] = [];
            data.map((u:any) =>{
                users.push({
                    id:null,
                    name:u[0],
                    email:u[1],
                    age:parseInt(u[2])
                });
            });
            const output: ResponseDto =
                await this.ImportUserService.execute(users);
            response.status(201).json(output).send();
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    private present(input: SaveUserDto): ResponseDto {
        const response = {
            success: ["Usuários importados com sucesso"],
            result : input

        };
        return response;
    }
}