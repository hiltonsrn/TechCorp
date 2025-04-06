import { Request, Response } from "express";
import {
    DeleteUserUsecase
} from "../../../../../usecases/user/delete-user";
import { HttpMethod, Route } from "../route";
import { ResponseDto } from "../../../dto/responsedto";
import { DeleteUserDto } from "../../../dto/deleteuserdto";


export class DeleteUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly DeleteUserService: DeleteUserUsecase
    ) {}

    public static create(DeleteUserService: DeleteUserUsecase) {
        return new DeleteUserRoute(
            "/Delete",
            HttpMethod.GET,
            DeleteUserService
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const { id } = request.query;

            const output: DeleteUserDto =
                await this.DeleteUserService.execute(id.toString());

            const responseBody = this.present(output);

            response.status(201).json(responseBody).send();
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    private present(input: DeleteUserDto): ResponseDto {
        const response = {
            success: ["Usuário excluido com sucesso"],
            result : input

        };
        return response;
    }
}