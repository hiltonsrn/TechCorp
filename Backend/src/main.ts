import { ApiExpress } from "./infra/api/express/apiexpress";
import { CreateUserRoute } from "./infra/api/express/routes/user/create-user";
import { ListUserRoute } from "./infra/api/express/routes/user/list-user";
import { UserRepositoryPrisma } from "./infra/repositories/user/userrepository";
import { prisma } from "./package/prisma/prisma";
import { CreateUserUsecase } from "./usecases/user/create-user";
import { ListUserUsecase } from "./usecases/user/list-user";

function main() {

    const aRepository = UserRepositoryPrisma.create(prisma);

    const createUserUsecase = CreateUserUsecase.create(aRepository);
    const listUserUsecase = ListUserUsecase.create(aRepository);

    const createRoute = CreateUserRoute.create(createUserUsecase);
    const listRoute = ListUserRoute.create(listUserUsecase);

    const api = ApiExpress.create([createRoute, listRoute]);
    const port = 8000;
    api.start(port);
}

main();