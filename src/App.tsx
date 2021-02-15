import React, { Component } from "react";
import "./App.css";
import { TodoProvider } from "./contexts/todo";
import Todo from "./Todo";

import { devToolsStore } from "./contexts/withDevTools";

type Props = any;
type State = any;

class App extends Component<Props, State> {
  componentDidMount() {
    // init devTools (so that will be visible in Chrome redux devtools tab):
    devToolsStore && devToolsStore?.init();
  }

  componentDidCatch(error: any, info: any) {
    console.log("App error: ", error);
    console.log("App error info: ", info);
    //
  }

  render() {
    return (
      <TodoProvider>
        <Todo />
      </TodoProvider>
    );
  }
}

export default App;
