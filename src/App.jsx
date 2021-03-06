import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import './index.css';
import { DataTable16, Query16 } from '@carbon/icons-react';

import TabNav from './components/crafted/Nav';

import Layout from './parts/Layout';

// Import Pages
const Table = React.lazy(() => import('./pages/Table'));
const Query = React.lazy(() => import('./pages/Query'));
const Upload = React.lazy(() => import('./pages/Upload'));

// Navigation Links
const links = [
  {
    label: 'Table',
    to: '/',
    icon: DataTable16,
  },
  {
    label: 'Query',
    to: '/query',
    icon: Query16,
  },
];

const App = (props) => {
  const { spaces } = props;

  return (
    <Layout>
      {spaces.spaces.length > 0 ? (
        <div className="bg-white h-full w-full mt-4 shadow-base px-8 py-5 rounded-lg flex flex-col">
          <TabNav links={links} />

          {spaces.activeSpace.data ? (
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route path="/" exact component={Table} />
                <Route path="/query" exact component={Query} />
              </Switch>
            </Suspense>
          ) : (
            <Suspense fallback={<div>Loading...</div>}>
              <Upload />
            </Suspense>
          )}
        </div>
      ) : (
        <h2 className="mt-16 text-lg font-semibold text-secondary-250">
          You dont have any spaces yet! Begin by creating a space
        </h2>
      )}
    </Layout>
  );
};

export default connect((state) => state, {})(App);
