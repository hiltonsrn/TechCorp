export interface SaveUsecase<Dto>{
    execute(input: Dto): Promise<Dto>;
}
export interface DeleteUsecase{
    execute(id: string): void;
}
export interface ListUsecase<Dto>{
    execute(input: Dto): Promise<Dto[]>;
}