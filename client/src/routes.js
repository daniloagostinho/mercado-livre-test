import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Search from "./components/Search";
import ProductDetail from './components/ProductDetail';


const NoMatchRoute = () => <div>404 Page</div>;

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Search} />
      <Route path="/items/:productId" exact component={ProductDetail} />
      <Route component={NoMatchRoute} />
    </Switch>
  </Router>
)

export default Routes;
