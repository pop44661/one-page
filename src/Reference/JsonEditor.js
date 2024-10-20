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
    const editor = useRef(null); // 使用 ref 保存编辑器实例
    useEffect(() => {
        // 创建编辑器实例
        editor.current = new JSONEditor(editorRef.current, {
            mode: 'code', // 或者 'text'，'view'，'form'
            onChange: () => {
                console.log(editor.current.get());
                handlejsonvalue(editor.current.get(),key)
            }
        });

        // 设置初始数据
        editor.current.set(value);

        return () => {
            editor.current.destroy(); // 清理编辑器实例
        };
    }, []);

    return <div ref={editorRef} style={{ "height": 'calc(100vh - 195px)'}} />;
};

export default JsonEditor;