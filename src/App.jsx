import React from "react";
import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Initializer from "./components/Intializer";

function App() {
  return (
    <Provider store={appStore}>
      <Initializer />
      <Body />
    </Provider>
  );
}

export default App;
