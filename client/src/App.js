// Libraries
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Page Imports
import JoinRoom from "./pages/JoinRoom";
import Chat from "./pages/Chat";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={JoinRoom} />
        <Route exact path="/chat" component={Chat} />

        <Route component={() => <h1>404</h1>} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
