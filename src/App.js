import {BrowserRouter, Switch, Route} from "react-router-dom"
// import Create from './components/Create'
import ShowOne from "./components/ShowOne";
import Main from "./views/Main"
import Edit from "./components/Edit";

function App() {
  return (
    <BrowserRouter>
    <h1>Products_DB</h1>
      <Switch>

        <Route exact path="/">
          <Main />
        </Route>

      <Route exact path="/product/:id">
        <ShowOne />
      </Route>

      <Route exact path="/product/:id/edit">
        <Edit />
      </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
