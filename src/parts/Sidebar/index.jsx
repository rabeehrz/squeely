import React from 'react';
import { Datastore16, DocumentBlank16, Add16 } from '@carbon/icons-react';

const Header = () => {
  return (
    <aside className="bg-white px-5 shadow-base">
      <div className="mt-11 flex items-center font-bold text-primary">
        <Datastore16 className="fill-current w-12 h-12" />
        <h1 className="ml-1.5 tracking-tighter text-2xl leading-none">
          squeely
        </h1>
      </div>
      <div className="mt-12">
        <h2 className="text-secondary tracking-tighter text-lg leading-none font-bold">
          Spaces
        </h2>
        <ul className="mt-5 flex flex-col space-y-2">
          <li className="text-sm py-2 px-3 flex items-center bg-primary text-white rounded-lg cursor-pointer hover:bg-primary-dark font-medium">
            <DocumentBlank16 className="fill-current mr-2.5" />
            <span
              style={{ width: '85px' }}
              className="whitespace-nowrap overflow-hidden overflow-ellipsis">
              Space Name
            </span>
          </li>
          <li className="text-sm py-2 px-3 flex items-center bg-white text-seconday rounded-lg cursor-pointer hover:bg-gray-200 font-medium">
            <Add16 className="fill-current mr-2.5" />
            <span>Add Space</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Header;
