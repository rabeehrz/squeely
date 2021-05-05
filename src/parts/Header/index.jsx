import React from 'react';
import { Share16 } from '@carbon/icons-react';

const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <div>
        <span className="font-bold text-sm leading-none text-secondary-250">
          bruce / space-name
        </span>
        <div className="flex items-center mt-0.5">
          <h2 className="font-semibold text-xl text-secondary leading-none">
            Space Name
          </h2>
          <div className="ml-2.5 text-white bg-secondary cursor-pointer rounded-full p-1">
            <Share16 className="w-5 h-5" />
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="leading-none font-bold flex flex-col items-center">
          <p className="text-sm text-secondary">Bruce Wayne</p>
          <p className="text-xs text-primary">Data Anaylst</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-gray-200 ml-2" />
      </div>
    </header>
  );
};

export default Header;
