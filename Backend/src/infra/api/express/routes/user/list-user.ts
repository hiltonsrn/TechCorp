import { Request, Response } from "express";
import {
    ListUserOutputDto,
    ListUserUsecase,
} from "../../../../../usecases/user/list-user";
import { HttpMethod, Route } from "../route";

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

    private present(input: ListUserOutputDto): ListUserResponseDto {
        const response: ListUserResponseDto = {
            Users: input.Users.map((User) => ({
                id: User.id,
                name: User.name,
                email: User.email,
                age: User.age
            })),
        };

        return response;
    }
}