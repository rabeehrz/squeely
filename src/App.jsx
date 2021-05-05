import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import './index.css';
import { DataTable16, Query16 } from '@carbon/icons-react';
import Layout from './parts/Layout';
import Table from './pages/Table';
import Query from './pages/Query';

const App = () => {
  return (
    <Layout>
      <div className="bg-white h-full mt-4 shadow-base px-8 py-5 rounded-lg">
        <ul className="flex space-x-5 text-secondary-250">
          <NavLink to="/" exact activeClassName="text-primary">
            <li className="cursor-pointer">
              <DataTable16 className="inline-block w-6 h-6" />
              <span className="text-base font-semibold ml-1">Table</span>
            </li>
          </NavLink>
          <NavLink to="/query" exact activeClassName="text-primary">
            <li className="cursor-pointer">
              <Query16 className="inline-block w-6 h-6" />
              <span className="text-base font-semibold ml-1">Query</span>
            </li>
          </NavLink>
        </ul>
        <Switch>
          <Route path="/" exact component={Table} />
          <Route path="/query" exact component={Query} />
        </Switch>
      </div>
    </Layout>
  );
};

export default App;
