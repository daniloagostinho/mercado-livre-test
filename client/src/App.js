import React, {Component} from 'react';
import './App.css';

import Search from "./components/Search";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductDetail from './components/ProductDetail';
const NoMatchRoute = () => <div>404 Page</div>;
class App extends Component {
  render() {
    return (
      <Router>
      <Switch>
        <Route path="/" exact component={Search} />
        <Route path="/items/:productId" exact component={ProductDetail} />
        <Route component={NoMatchRoute} />
      </Switch>
    </Router>
      // <Search />
    );
  }
}

export default App;
