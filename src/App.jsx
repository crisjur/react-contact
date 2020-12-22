import React from 'react';
import './App.scss';
import { useLocation, Route, Switch } from 'react-router-dom';
import Home from './container/Home';
import ModalView from "./container/ModalView";
import NoFound from "./container/NoFound";

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <div className="w-100 px-4 relative">
      <Switch location={background || location}>
        <Route exact path="/" component={Home}  />
        <Route component={NoFound}  />
      </Switch>
      {background && <Route path="/contacts/:option" children={ <ModalView />} />}
    </div>
  );
}

export default App;
