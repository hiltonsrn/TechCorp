export interface SaveUsecase<Dto>{
    execute(input: Dto): Promise<Dto>;
}
export interface DeleteUsecase<Dto>{
    execute(input: Dto): void;
}
export interface ListUsecase<Dto>{
    execute(input: Dto): Promise<Dto[]>;
}