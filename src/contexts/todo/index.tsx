import React, { Component, createContext } from "react";
import { devToolsStore } from "../withDevTools";

// #region types
export type TodoData = {
  todos: Array<Todo>;
};

export type TodoProviderState = {
  addTodo: (todo: Todo) => any;
  deleteTodo: (id: number | string) => boolean;
} & TodoData;

export type TodoProviderProps = {
  initialState: {} & TodoData;
};
// #endregion

// #region context
export const TodoContext = createContext<TodoProviderState | null>(null);
// #endregion

// #region constants
const initialState: TodoData = {
  todos: [],
};
// #endregion

// #region PROVIDER component
export class TodoProvider extends Component<
  TodoProviderProps,
  TodoProviderState
> {
  static defaultProps = {
    initialState: {
      ...initialState,
    },
  };

  // #region lifecyle
  constructor(props: TodoProviderProps) {
    super(props);

    // initialize state in constructor (otherwise function won't be passed)
    this.state = {
      ...this.props.initialState,
      deleteTodo: this.deleteTodo,
      addTodo: this.addTodo,
    };
  }

  render() {
    const { children } = this.props;

    return (
      <TodoContext.Provider
        value={{
          ...this.state,
        }}
      >
        {children}
      </TodoContext.Provider>
    );
  }
  // #endregion

  addTodo = (todo: Todo) => {
    if (typeof todo === "object") {
      const updateTodos = this.state.todos.concat(todo);
      this.setState({ todos: updateTodos });

      devToolsStore &&
        devToolsStore.dispatch({
          type: "ADD_TODO",
          state: { todos: [...updateTodos], todo },
        });
    }
  };

  deleteTodo = (id: number | string): boolean => {
    const { todos } = this.state;
    todos.splice(
      todos.findIndex((todoItem) => {
        return todoItem.id === id;
      }),
      1
    );
    this.setState({ todos: [...todos] });

    devToolsStore &&
      devToolsStore.dispatch({
        type: "DELETE_TODO",
        state: { ...initialState, todos: [...todos], todo: { id } },
      });
    return true;
  };
}

export default TodoProvider;
// #endregion
