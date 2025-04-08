import { ApiExpress } from "./infra/api/express/apiexpress";
import { SaveUserRoute } from "./infra/api/express/routes/user/save-user";
import { ListUserRoute } from "./infra/api/express/routes/user/list-user";
import { UserRepositoryPrisma } from "./infra/repositories/user/userrepository";
import { prisma } from "./package/prisma/prisma";
import { SaveUserUsecase } from "./usecases/user/save-user";
import { ListUserUsecase } from "./usecases/user/list-user";
import { DeleteUserRoute } from "./infra/api/express/routes/user/delete-user";
import { DeleteUserUsecase } from "./usecases/user/delete-user";
import { ImportUserUsecase } from "./usecases/user/import-user";
import { ImportUserRoute } from "./infra/api/express/routes/user/import-user";

function main() {

    const aRepository = UserRepositoryPrisma.create(prisma);

    const saveUserUsecase = SaveUserUsecase.create(aRepository);
    const listUserUsecase = ListUserUsecase.create(aRepository);
    const deleteUserUsecase = DeleteUserUsecase.create(aRepository);
    const importUserUsecase = ImportUserUsecase.create(aRepository,saveUserUsecase);

    const saveRoute = SaveUserRoute.create(saveUserUsecase);
    const listRoute = ListUserRoute.create(listUserUsecase);
    const deleteRoute = DeleteUserRoute.create(deleteUserUsecase);
    const importRoute = ImportUserRoute.create(importUserUsecase);

    const api = ApiExpress.create([saveRoute, listRoute,deleteRoute,importRoute]);
    const port = 8000;
    api.start(port);
}

main();