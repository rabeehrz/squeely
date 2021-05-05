import React from 'react';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/base16-light.css';
import 'codemirror/mode/sql/sql';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/sql-hint';
import 'codemirror/keymap/sublime';

import { Controlled as ControlledEditor } from 'react-codemirror2';

const Editor = ({ value, onChange }) => {
  return (
    <div>
      <ControlledEditor
        onBeforeChange={(editor, data, values) => onChange(values)}
        onKeyUp={(editor, event) => {
          if (
            !editor.state.completionActive &&
            event.keyCode !== 13 &&
            event.keyCode !== 27
          ) {
            editor.showHint({ completeSingle: false });
          }
        }}
        value={value}
        options={{
          lineWrapping: true,
          smartIndent: true,
          lint: true,
          mode: 'sql',
          keyMap: 'sublime',
          lineNumbers: true,
          theme: 'base16-light',
          extraKeys: {
            'Ctrl-Space': 'autocomplete',
          },
        }}
      />
    </div>
  );
};

export default Editor;
