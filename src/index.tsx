import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as serviceWorker from "./serviceWorker";
import store, { history } from "./app/store";
import "./index.css";

function render() {
  const App = require("./app/App").default;
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
  );
}

render();

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./app/App", render);
}
