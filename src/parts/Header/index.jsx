import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Share16, TrashCan16 } from '@carbon/icons-react';
import { updateSpace, deleteSpace } from '../../state/ducks/spaces/actions';

const Header = (props) => {
  const { spaces } = props;
  const [spaceName, setSpaceName] = useState(spaces.activeSpace.name);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Update the state only every 250ms
      props.updateSpace({
        ...spaces.activeSpace,
        name: spaceName === '' ? 'Untitled' : spaceName,
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [spaceName]);

  useEffect(() => {
    setSpaceName(spaces.activeSpace.name);
  }, [spaces.activeSpace]);

  return (
    <header className="flex items-center justify-between">
      <div>
        {spaces.spaces.length > 0 && (
          <>
            <span className="font-bold text-sm leading-none text-secondary-250">
              bruce / {spaces.activeSpace.id}
            </span>
            <div className="flex items-center mt-0.5">
              {!editing ? (
                <h2
                  className="font-semibold text-xl text-secondary leading-none"
                  onDoubleClick={() => {
                    setEditing(true);
                  }}>
                  {spaceName}
                </h2>
              ) : (
                <input
                  type="text"
                  className="font-semibold text-xl text-secondary leading-none bg-gray-fb"
                  value={spaceName}
                  onChange={(e) => setSpaceName(e.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === 'Escape') {
                      setEditing(false);
                      event.preventDefault();
                      event.stopPropagation();
                    }
                  }}
                />
              )}

              <div className="ml-2.5 text-white bg-secondary cursor-pointer rounded-full p-1">
                <Share16
                  className="w-5 h-5"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `https://squeely.vercel.app/spaces/${spaces.activeSpace.id}`,
                    );
                    alert('Copied to Clipboard');
                  }}
                />
              </div>
              <div className="ml-2.5 text-white bg-red-500 cursor-pointer rounded-full p-1">
                <TrashCan16
                  className="w-5 h-5"
                  onClick={() => props.deleteSpace()}
                />
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex items-center self-end">
        <div className="leading-none font-bold flex flex-col items-center">
          <p className="text-sm text-secondary">Bruce Wayne</p>
          <p className="text-xs text-primary">Data Anaylst</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-gray-200 ml-2" />
      </div>
    </header>
  );
};

export default connect((state) => state, { updateSpace, deleteSpace })(Header);
