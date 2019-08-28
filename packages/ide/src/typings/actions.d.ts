declare module "react-redux" {
    import { CoreStore } from "src/redux/store";

    export const Provider: React.ComponentClass<{ store: any }>;

    export function connect<P extends MappedProps, MappedProps>(mapStateToProps: (state: CoreStore) => MappedProps): (Component: any) => any;

    export function connect<P extends MappedProps, MappedProps>(
        mapStateToProps: null | undefined | ((state: CoreStore) => MappedProps),
        mapDispatchToProps?: any,
        mergeProps?: any,
        options?: { pure: boolean }
    ): (Component: any) => any;

    import { Action, AnyAction, Store } from "redux";
    export interface ReactReduxContextValue<SS = any, A extends Action = AnyAction> {
        store: Store<SS, A>;
        storeState: SS;
    }
}

declare type Actions<A> = {
    [P in keyof A]: A[P] extends () => any
        ? () => void
        : A[P] extends (a1: infer A1) => any
        ? (a1: A1) => void
        : A[P] extends (a1: infer A1, a2: infer A2) => any
        ? (a1: A1, a2: A2) => void
        : A[P] extends (a1: infer A1, a2: infer A2, a3: infer A3) => any
        ? (a1: A1, a2: A2, a3: A3) => void
        : A[P] extends (a1: infer A1, a2: infer A2, a3: infer A3, a4: infer A4) => any
        ? (a1: A1, a2: A2, a3: A3, a4: A4) => void
        : never;
};

declare type ActionOf<T> = T extends (...args: any[]) => infer R ? (R extends { type: string; payload: any } ? R : R & { payload: undefined }) : never;
