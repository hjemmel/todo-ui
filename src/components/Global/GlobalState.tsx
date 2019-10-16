import React, { Component } from "react";
import { MainState, initialData, Actions, ContextProps } from "./interfaces";
import { actions } from "./Actions";

export const GlobalContext = React.createContext<ContextProps>({} as any);

export type StateUpdater<S> = (state: Readonly<S>) => Partial<S>;

export type Action<S, T> = T extends (...args: infer U) => any
    ? (...args: U) => StateUpdater<S>
    : (...args: unknown[]) => StateUpdater<S>;

export type ActionMap<S, P> = { [K in keyof P]: Action<S, P[K]> };

const withDevTools =
    process.env.NODE_ENV === "development" &&
    typeof window !== "undefined" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__;

class GlobalState extends Component<{ initialState?: any }, MainState> {
    devTools: any;
    unsubscribe: any;

    actions: ActionMap<MainState, Actions> = Object.entries<any>(
        actions
    ).reduce(
        (p, [key, func]) => ({
            ...p,
            [key]: (...args: any[]) => {
                this.setState(func(...args)(this.state), () => {
                    if (withDevTools) {
                        this.devTools.send(key, this.state);
                    }
                });
            }
        }),
        {}
    ) as any;

    constructor(props: any) {
        super(props);

        const customInitialState = props.initialState || {};

        this.state = {
            ...initialData,
            ...customInitialState
        };

        if (withDevTools) {
            const config = {
                name: "Store",
                actionCreators: this.actions
            };
            this.devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__.connect(
                config
            );
            this.unsubscribe = this.devTools.subscribe((message: any) => {
                if (
                    message.type === "DISPATCH" &&
                    message.state &&
                    message.payload.type === "JUMP_TO_STATE"
                ) {
                    this.setState(Object.assign({}, JSON.parse(message.state)));
                }
            });
            this.devTools.init(initialData);
        }
    }

    componentWillUnmount(): void {
        if (withDevTools && this.unsubscribe) {
            this.unsubscribe(); // Use if you have other subscribers from other components.
            (window as any).__REDUX_DEVTOOLS_EXTENSION__.disconnect(); // If there aren't other subscribers.
        }
    }

    render() {
        return (
            <GlobalContext.Provider
                value={{ state: this.state, actions: this.actions }}
    >
        {this.props.children}
        </GlobalContext.Provider>
    );
    }
}

export default GlobalState;
