// #region types
export type DevToolsMessageType = "DISPATCH" | string;

export type DevToolsMessagePayload = {
  type?: string;
  state?: any;
};

export type DevToolsMessage = {
  type?: DevToolsMessageType;
  payload?: DevToolsMessagePayload;
};

export type DevTools = {
  init: () => void;
  connect: () => any;
  subscribe: (message: DevToolsMessage) => any;
  send: (action: { type: string; state?: any }, newState: any) => any;
  unsubscribe: () => any;
  dispatch: (action: { type: string }) => any;
  disconnect: () => any;
};
// #endregion

// #region constants
// @ts-ignore
const isDEV = process.env.NODE_ENV === "development";

export const withDevTools =
  isDEV &&
  typeof window !== "undefined" &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__;

const devTools: DevTools = !withDevTools
  ? null
  : (window as any).__REDUX_DEVTOOLS_EXTENSION__.connect();
// #endregion

// #region devtools reducer
type State = {
  todoApp: any;
};
type Action = {
  type: string;
  state?: any;
};

const initialState: State = {
  todoApp: {},
};

export const reducer = (state: State = initialState, action: Action) => {
  /* eslint-disable no-unused-vars */
  switch (action.type) {
    // #region todos context
    case "ADD_TODO":
    case "DELETE_TODO": {
      const { type, state: context, ...rest } = action;
      return { todoApp: { context, ...rest } };
    }
    // #endregion

    default:
      return state;
  }
  /* eslint-enable no-unused-vars */
};
// #endregion

// #region singleton devtools local state
let state: State;
// #endregion

// #region devToolsStore (redux like)

export const devToolsStore = !withDevTools
  ? null
  : {
      ...devTools,
      dispatch: (action: Action) => {
        // #region action validation
        if (!action) {
          throw new Error("devTools dispatched action should be defined");
        }
        if (typeof action === "function") {
          throw new Error("devTools dispatched action should be an object");
        }
        if (typeof action !== "object") {
          throw new Error("devTools dispatched action should be an object");
        }
        if (Array.isArray(action)) {
          throw new Error("devTools dispatched action should be an object");
        }
        // #endregion

        const newState = reducer(state, action);
        state = newState;

        devTools && devTools.send({ ...action }, newState);
      },
    };
// #endregion
