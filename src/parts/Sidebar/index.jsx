import React from 'react';
import { connect } from 'react-redux';
import { Datastore16, DocumentBlank16, Add16 } from '@carbon/icons-react';
import { addSpace, setActiveSpace } from '../../state/ducks/spaces/actions';

const Sidebar = (props) => {
  const { spaces } = props;
  console.log(spaces);
  return (
    <aside className="bg-white px-5 pb-5 shadow-base">
      <div className="mt-11 flex items-center font-bold text-primary">
        <Datastore16 className="fill-current w-12 h-12" />
        <h1 className="ml-1.5 tracking-tighter text-2xl leading-none">
          squeely
        </h1>
      </div>
      <div className="mt-12">
        <h3 className="text-secondary tracking-tighter text-lg leading-none font-bold">
          Spaces
        </h3>
        <ul className="mt-5 flex flex-col space-y-2">
          {spaces.spaces.map((space) => (
            <li
              key={space.id}
              className={`text-sm py-2 px-3 flex items-center rounded-lg cursor-pointer font-medium ${
                spaces.activeSpace.id === space.id
                  ? 'bg-primary text-white'
                  : 'bg-white hover:bg-gray-200 text-secondary'
              }`}
              onClick={() => props.setActiveSpace(space.id)}>
              <DocumentBlank16 className="fill-current mr-2.5" />
              <span
                style={{ width: '85px' }}
                className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                {space.name}
              </span>
            </li>
          ))}

          <li
            className="text-sm py-2 px-3 flex items-center bg-white text-seconday rounded-lg cursor-pointer hover:bg-gray-200 font-medium"
            onClick={() => props.addSpace()}>
            <Add16 className="fill-current mr-2.5" />
            <span>Add Space</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default connect((state) => state, { addSpace, setActiveSpace })(Sidebar);
