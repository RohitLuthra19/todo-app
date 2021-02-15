import { useState, useContext } from "react";
import { TodoProviderState, TodoContext } from "../contexts/todo";
import "./todo.css";

function Todo() {
  const [state, setState] = useState({ id: 0, text: "", done: false });
  const todo = useContext<TodoProviderState | null>(TodoContext);

  const onChange = (e: any) => {
    setState({
      id: (todo?.todos?.length || 0) + 1,
      text: e.target.value,
      done: false,
    });
  };

  const onTodoSubmit = (e: any) => {
    e.preventDefault();
    todo?.addTodo(state);
    setState({
      id: 0,
      text: "",
      done: false,
    });
  };

  return (
    <div className="todo-container">
      <form className="todo-input-wrapper">
        <label htmlFor="todoText">Todo</label>
        <input
          name="todoText"
          type="text"
          id="todoText"
          value={state.text}
          onChange={onChange}
        />
        <button type="submit" onClick={onTodoSubmit}>
          +
        </button>
      </form>
      <ul className="todo-list">
        {todo?.todos?.map((todoItem: Todo) => {
          return (
            <li className="todo-item" key={`${todoItem?.id}`}>
              {todoItem.text}
              <button
                className="done"
                onClick={() => todo?.deleteTodo(todoItem?.id)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default Todo;
