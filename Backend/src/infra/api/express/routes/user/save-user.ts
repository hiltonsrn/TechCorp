import { Request, Response } from "express";
import {
    SaveUserInputDto,
    SaveUserUsecase,
} from "../../../../../usecases/user/save-user";
import { HttpMethod, Route } from "../route";

export type SaveUserResponseDto = {
    id: string;
};

export class SaveUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly SaveUserService: SaveUserUsecase
    ) {}

    public static create(SaveUserService: SaveUserUsecase) {
        return new SaveUserRoute(
            "/Users",
            HttpMethod.POST,
            SaveUserService
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const { id, name, email,age } = request.body;

            const input: SaveUserInputDto = {
                id,
                name,
                email,
                age
            };

            const output: SaveUserResponseDto =
                await this.SaveUserService.execute(input);

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

    private present(input: SaveUserResponseDto): SaveUserResponseDto {
        const response = { id: input.id };
        return response;
    }
}