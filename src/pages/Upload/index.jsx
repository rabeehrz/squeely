import React from 'react';
import Papa from 'papaparse';
import { connect } from 'react-redux';
import DATA from './MOCK_DATA';

import {
  addData,
  addDataWithoutFilter,
} from '../../state/ducks/spaces/actions';

const Upload = (props) => {
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
  );
};

export default connect((state) => state, { addData, addDataWithoutFilter })(
  Upload,
);
