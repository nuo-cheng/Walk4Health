import React, { Fragment } from "react";
import "./App.css";

//components

import CreateList from "./components/CreateList";
import CreateItem from "./components/CreateItem";
import Lists from "./components/Lists"

function App() {
  return (
    <Fragment>
      <div className="container">
        <CreateList />
        <CreateItem/>
        <Lists/>
      </div>
    </Fragment>
  );
}

export default App;