import { Request, Response } from "express";
import {
    SaveUserUsecase
} from "../../../../../usecases/user/save-user";
import { HttpMethod, Route } from "../route";
import { ResponseDto } from "../../../dto/responsedto";
import { SaveUserDto } from "../../../dto/saveuserdto";


export class SaveUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly SaveUserService: SaveUserUsecase
    ) {}

    public static create(SaveUserService: SaveUserUsecase) {
        return new SaveUserRoute(
            "/Save",
            HttpMethod.POST,
            SaveUserService
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const { id, name, email,age } = request.body;

            const input: SaveUserDto = {
                id,
                name,
                email,
                age
            };
            let responseBody:any;
            try{
            const output: SaveUserDto =
                await this.SaveUserService.execute(input);
                responseBody = this.present(output);
            }catch(e){
                responseBody = this.presentErro(e);
            }
            response.status(201).json(responseBody).send();
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
            success: ["Usuário salvo com sucesso"],
            result : input

        };
        return response;
    }
    private presentErro(e:any): ResponseDto {
        const response = {
            erro: [e.toString()]

        };
        return response;
    }
}