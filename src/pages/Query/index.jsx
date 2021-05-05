import React, { useState } from 'react';

import Editor from '../../components/core/Editor';

const Query = () => {
  const [query, setQuery] = useState('');
  return (
    <div className="mt-4 max-w-2xl">
      <Editor value={query} onChange={setQuery} />
    </div>
  );
};

export default Query;
