import { IGeneratorAction } from "./generator";
export * from "./generator";

export type Action = IGeneratorAction;

export type ExtractActionByType<T extends Action["type"], A extends Action = Action> = A extends { type: T } ? A : never;
export type PayloadOfAction<T extends Action["type"]> = {
    [P in Action["type"]]: ExtractActionByType<P>;
}[T]["payload"];
