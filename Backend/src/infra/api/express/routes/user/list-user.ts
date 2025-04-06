import { Request, Response } from "express";
import {
    ListUserUsecase,
} from "../../../../../usecases/user/list-user";
import { HttpMethod, Route } from "../route";
import { ResultUserDto } from "../../../dto/resultuserdto";
import { ResponseDto } from "../../../dto/responsedto";
import { info } from "console";

export type ListUserResponseDto = {
    Users: {
        id: string;
        name: string;
        email: string;
        age: number;
    }[];
};

export class ListUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listUserService: ListUserUsecase
    ) {}

    public static create(listUserService: ListUserUsecase) {
        return new ListUserRoute(
            "/Users",
            HttpMethod.GET,
            listUserService
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const output = await this.listUserService.execute();

            const responseBody = this.present(output);

            response.status(200).json(responseBody).send();
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    private present(input: ResultUserDto[]): ResponseDto {
        let qtd = input.length;
        let msg = qtd + ( qtd > 1 ? " Usuários encontrados" : " Usuário encontrado");
        const response = {
            info: [msg],
            result : input
        };
        return response;
    }
}