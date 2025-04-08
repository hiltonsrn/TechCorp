import { ResponseDto } from "../infra/api/dto/responsedto";

export interface SaveUsecase<Dto>{
    execute(input: Dto): Promise<Dto>;
}
export interface DeleteUsecase{
    execute(id: string): void;
}
export interface ListUsecase<Dto>{
    execute(): Promise<Dto[]>;
}
export interface ImportUsecase<Dto>{
    execute(input: Dto[]): Promise<ResponseDto>;
}