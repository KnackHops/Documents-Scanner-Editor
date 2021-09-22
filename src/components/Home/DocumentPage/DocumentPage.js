import "./DocumentPage-style.css"
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useEffect } from "react";
import { useCallback, useState } from "react/cjs/react.development";

const toolbarConfig = {
    toolbar: ['undo', 'redo', '|', 
    'bold', 'italic', 'link', 'strikethrough', 'underline', '|', 
    'heading', 'fontFamily', 'fontSize', 'fontColor', 'fontBackgroundColor', '|', 
    'numberedList', 'bulletedList', '|', 
    'alignment:left', 'alignment:right', 'alignment:center', 'alignment:justify', '|',
    'indent', 'outdent', '|',
    'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells'],
    fontSize: {options: [9, 10, 11, 12, 13, 14, 15, 16, 18, 20, 22, 24, 26]},
    indentBlock: {
        offset: .1,
        unit: 'in'
    },
    placeholder: "Fresh start is what we need...start typing!"
}

const DocumentPage = ({documentHandler, document, saveDocument}) => {
    let editor = null;
    
    const documentInit = newEditor => {
        editor = newEditor;

        console.log(editor);

        editor.ui.getEditableElement().parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
        );
    }

    const dataHandler = useCallback(()=>{
        const data = editor.getData();

        return data;
    })

    const [documentData, setData] = useState(null);

    useEffect(()=>{
        setData(document);
    }, [document])

    return (
        <section className="document-container fd">
            <p className="doc-btn-container">
                <button className="" onClick={()=>saveDocument(dataHandler())}>
                    Save
                </button>
                <button className="" onClick={()=>documentHandler(null)}>
                    Exit
                </button>
            </p>
            <CKEditor 
                editor={DecoupledEditor}
                data={document}
                onReady={editor=>documentInit(editor)}
                config={toolbarConfig}
            />
        </section>
    )
}

export default DocumentPage;