import React from "react";
import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Initializer from "./components/Intializer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <Provider store={appStore}>
      <ToastContainer />
      <Initializer />
      <Body />
    </Provider>
  );
}

export default App;
