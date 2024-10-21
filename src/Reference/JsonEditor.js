import 'jsoneditor/dist/jsoneditor.css';

import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import JSONEditor from 'jsoneditor';

const JsonEditor = (props) => {
    const {value,KEY,handlejsonvalue} = props
    const [key,setkey]=useState(KEY)
    const editorRef = useRef(null);
    const editor = useRef(null); 
    useEffect(() => {
        
        editor.current = new JSONEditor(editorRef.current, {
            mode: 'code', 
            onChange: () => {
                console.log(editor.current.get());
                handlejsonvalue(editor.current.get(),key)
            }
        });

        
        editor.current.set(value);

        return () => {
            editor.current.destroy(); 
        };
    }, []);

    return <div ref={editorRef} style={{ "height": 'calc(100vh - 195px)'}} />;
};

export default JsonEditor;