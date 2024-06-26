import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Flags from './components/Flags';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Flags} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
