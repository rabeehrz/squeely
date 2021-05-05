import React from 'react';
import './index.css';
import { DataTable16, Query16 } from '@carbon/icons-react';
import Layout from './parts/Layout';
import DataTable from './components/crafted/DataTable';

const App = () => {
  return (
    <Layout>
      <div className="bg-white h-full mt-4 shadow-base px-8 py-5 rounded-lg">
        <ul className="flex space-x-5">
          <li className="text-primary pb-2.5">
            <DataTable16 className="inline-block w-6 h-6" />
            <span className="text-base font-semibold ml-1">Table</span>
          </li>
          <li className="text-secondary-250">
            <Query16 className="inline-block w-6 h-6" />
            <span className="text-base font-semibold ml-1">Query</span>
          </li>
        </ul>
        <div
          className="mt-4 overflow-x-scroll overflow-y-scroll "
          style={{ width: '724px', height: '500px' }}>
          <DataTable />
        </div>
      </div>
    </Layout>
  );
};

export default App;
