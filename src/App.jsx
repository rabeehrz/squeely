import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Papa from 'papaparse';
import './index.css';
import { DataTable16, Query16 } from '@carbon/icons-react';
import Layout from './parts/Layout';
import Table from './pages/Table';
import Query from './pages/Query';
import { addData, addDataWithoutFilter } from './state/ducks/spaces/actions';
import DATA from './components/crafted/MOCK_DATA';

const App = (props) => {
  const { spaces } = props;

  const handleCSV = (event) => {
    Papa.parse(event.target.files[0], {
      complete: (results) => {
        if (results.errors.length > 0) return;
        props.addData(
          spaces.activeSpace,
          results.data[0],
          results.data.slice(1, results.data.length - 1),
        );
      },
    });
  };

  const handleJSON = (event) => {
    try {
      const fileReader = new FileReader();
      fileReader.readAsText(event.target.files[0], 'UTF-8');
      fileReader.onload = (e) => {
        const data = JSON.parse(e.target.result);
        const columns = Object.keys(data[0]);
        props.addDataWithoutFilter(spaces.activeSpace, columns, data);
      };
    } catch (err) {
      console.log(err);
    }
  };

  const handleSample = () => {
    const columns = [
      'id',
      'first_name',
      'last_name',
      'email',
      'gender',
      'ip_address',
    ];

    props.addDataWithoutFilter(spaces.activeSpace, columns, DATA);
  };

  return (
    <Layout>
      {spaces.spaces.length > 0 ? (
        <div className="bg-white h-full mt-4 shadow-base px-8 py-5 rounded-lg flex flex-col">
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
          {spaces.activeSpace.data ? (
            <Switch>
              <Route path="/" exact component={Table} />
              <Route path="/query" exact component={Query} />
            </Switch>
          ) : (
            <div className="mt-4 flex items-center justify-center w-full h-full">
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="csv"
                  className="text-center text-md text-white bg-secondary py-2 px-4 rounded-lg hover:bg-black hover:text-gray-200 cursor-pointer">
                  Upload CSV
                  <input
                    className="hidden"
                    type="file"
                    id="csv"
                    accept=".csv"
                    onChange={handleCSV}
                  />
                </label>
                <label
                  htmlFor="json"
                  className="text-center text-md text-white bg-primary py-2 px-4 rounded-lg hover:bg-primary-dark cursor-pointer">
                  Upload JSON
                  <input
                    className="hidden"
                    type="file"
                    id="json"
                    accept=".json"
                    onChange={handleJSON}
                  />
                </label>
                <button
                  type="button"
                  className="text-md text-primary bg-white py-2 px-4 rounded-lg hover:bg-gray-100 cursor-pointer"
                  onClick={handleSample}>
                  Use Sample Data
                </button>
              </div>
            </div>
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

export default connect((state) => state, { addData, addDataWithoutFilter })(
  App,
);
